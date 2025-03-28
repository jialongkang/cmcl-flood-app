import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { ReadingsResponse, DetailsResponse } from "../components/Types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

interface ChartProps {
  readings: ReadingsResponse;
  details: DetailsResponse;
}

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  return `${day}/${month} ${hour}:${minute}`; 
};

const parseMeasureId = (measureId: string) => {
  const parts = measureId.split("/");
  const measureDetails = parts[parts.length - 1].split("-");

  if (measureDetails.length < 3)
    return { qualifier: "", parameter: "Unknown", unit: "" };

  const unit = measureDetails[measureDetails.length - 1];
  const qualifier = measureDetails[measureDetails.length - 4];

  const parameter = measureDetails.includes("level")
    ? "Water Level"
    : measureDetails.includes("flow")
    ? "Flow"
    : "Unknown";

  const unitMapping: { [key: string]: string } = {
    mASD: "m",
    mAOD: "m",
    m: "m",
    "m3_s": "m³/s",
    "Ml_d": "Ml/d",
  };

  return {
    qualifier: qualifier.charAt(0).toUpperCase() + qualifier.slice(1),
    parameter,
    unit: unitMapping[unit] || unit,
  };
};

const formatDateRange = (startDate: Date, endDate: Date) =>
  `${startDate.getDate()} ${startDate.toLocaleString("default", {
    month: "long",
  })} ${startDate.getFullYear()} 
   to ${endDate.getDate()} ${endDate.toLocaleString("default", {
    month: "long",
  })} ${endDate.getFullYear()}`;

const Chart = ({ readings, details }: ChartProps) => {
  if (!readings?.items?.length) return <p>No readings available. Station is currently inactive.</p>;

  const [showTypicalRange, setShowTypicalRange] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleTypicalRange = (measureId: string) => {
    setShowTypicalRange((prev) => ({ ...prev, [measureId]: !prev[measureId] }));
  };

  const groupedReadings = readings.items.reduce<{ [key: string]: any[] }>(
    (acc, reading) => {
      acc[reading.measure] = acc[reading.measure] || [];
      acc[reading.measure].push(reading);
      return acc;
    },
    {}
  );

  Object.keys(groupedReadings).forEach((measureId) => {
    groupedReadings[measureId].sort(
      (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
    );
  });

  return (
    <div
      className="container-fluid px-0 text-start"
      style={{ marginLeft: 0, marginRight: "auto", maxWidth: "800px" }}
    >
      {Object.entries(groupedReadings).map(([measureId, readings]) => {
        const { qualifier, parameter, unit } = parseMeasureId(measureId);
        const formattedDateRange = formatDateRange(
          new Date(readings[0].dateTime),
          new Date(readings[readings.length - 1].dateTime)
        );

        const isWaterLevel = parameter === "Water Level";
        const isDownstage = measureId.includes("downstage");

        const typicalRangeHigh = isDownstage
          ? details.items.downstageScale?.typicalRangeHigh
          : details.items.stageScale?.typicalRangeHigh;

        const typicalRangeLow = isDownstage
          ? details.items.downstageScale?.typicalRangeLow
          : details.items.stageScale?.typicalRangeLow;

        const hasTypicalRange =
          isWaterLevel && typicalRangeHigh !== undefined && typicalRangeLow !== undefined;

        const lineColor = isWaterLevel
          ? "#007bff"
          : parameter === "Flow"
          ? "#ffc107"
          : `hsl(220, 70%, 50%)`;

        const timestamps = readings.map((item) => item.dateTime);
        const values = readings.map((item) => parseFloat(item.value));

        const data = {
          labels: timestamps.map((timestamp) => formatTimestamp(timestamp)), 
          datasets: [
            {
              label: `${qualifier} ${parameter}`,
              borderColor: lineColor,
              backgroundColor: lineColor,
              data: values,
              pointRadius: 3,
            },
          ],
        };

        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);

        let yMin = minValue < 0 ? minValue * 1.01 : minValue * 0.99;
        let yMax = maxValue < 0 ? maxValue * 0.99 : maxValue * 1.01;

        if (showTypicalRange[measureId] && hasTypicalRange) {
          yMin =
            minValue < 0 || typicalRangeLow < 0
              ? Math.min(minValue * 1.1, typicalRangeLow * 1.1)
              : Math.min(minValue * 0.9, typicalRangeLow * 0.9);

          yMax =
            maxValue < 0 || typicalRangeHigh < 0
              ? Math.max(maxValue * 0.9, typicalRangeHigh * 0.9)
              : Math.max(maxValue * 1.1, typicalRangeHigh * 1.1);
        }

        const annotation =
          hasTypicalRange && showTypicalRange[measureId]
            ? {
                rangeBox: {
                  type: "box",
                  yMin: typicalRangeLow,
                  yMax: typicalRangeHigh,
                  backgroundColor: "rgba(247, 169, 25, 0.2)",
                  borderWidth: 0,
                },
              }
            : undefined;

        const options: ChartOptions<"line"> = {
          responsive: true,
          animation: { duration: 0 },
          scales: {
            x: {
              title: {
                display: true,
                text: "Time", 
                font: { size: 18 },
              },
              grid: {
                color: "rgba(0, 0, 0, 0.2)",
              },
              border: {
                display: true,
                color: "#000",
              },
              ticks: {
                color: "#000",
                autoSkip: true,
                maxTicksLimit: 5, 
              },
            },
            y: {
              title: {
                display: true,
                text: `${parameter} (${unit})`,
                font: { size: 19 },
              },
              min: yMin,
              max: yMax,
              grid: {
                color: "rgba(0, 0, 0, 0.2)",
              },
              border: {
                display: true,
                color: "#000",
              },
              ticks: {
                color: "#000",
                stepSize: (yMax - yMin) / 8,
              },
            },
          },
          plugins: {
            legend: { display: true },
            tooltip: {
              enabled: true,
              mode: "index",
              intersect: false,
            },
            annotation: {
              annotations: annotation || {},
            } as any,
          },
        };

        return (
          <div key={measureId} className="container-fluid px-0 text-start">
            <h5 className="text-left text-base font-semibold mt-3 mb-1">
              {qualifier} {parameter}
            </h5>
            <p className="text-left text-xs text-gray-600 mb-0">
              Data from {formattedDateRange}
            </p>
            {isWaterLevel &&
              (hasTypicalRange ? (
                <button
                  onClick={() => toggleTypicalRange(measureId)}
                  className="btn btn-link text-primary text-sm fw-semibold p-0 mt-0"
                  style={{ textDecoration: "none" }}
                >
                  {showTypicalRange[measureId]
                    ? "Hide typical range"
                    : "Show typical range"}
                </button>
              ) : (
                <span className="text-muted text-sm">
                  *Typical range not available
                </span>
              ))}
            <Line data={data} options={options} />
          </div>
        );
      })}
    </div>
  );
};

export default Chart;
