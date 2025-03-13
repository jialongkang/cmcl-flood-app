import { useState, useEffect } from "react";
import { StationData } from "./Types";
import "bootstrap/dist/css/bootstrap.min.css";

interface CountiesListProps {
  stations: StationData[];
  onSelectCounty: (county: string) => void; 
}

const CountiesList = ({ stations, onSelectCounty }: CountiesListProps) => {
  const [counties, setCounties] = useState<string[]>([]);

  useEffect(() => {
    const uniqueCounties = new Set<string>();
    stations.forEach((station) => {
      const { County: county } = station;
      if (county !== "No county available") {
        uniqueCounties.add(county);
      }
    });

    setCounties(Array.from(uniqueCounties).sort());
  }, [stations]);

  return (
    <div>
      <h4 className="text-left">England</h4> 
      <div className="mt-3"></div>
      <div
        style={{
          display: "grid",
          gridGap: "5px",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        }}
      >
        {counties.map((county) => (
          <button
            key={county}
            className="btn w-100 mb-2"
            style={{
              fontSize: "0.8rem",
              backgroundColor: "#f8f9fa",
              borderColor: "#f8f9fa",
              color: "#495057",
            }}
            onClick={() => onSelectCounty(county)}
          >
            {county}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CountiesList;
