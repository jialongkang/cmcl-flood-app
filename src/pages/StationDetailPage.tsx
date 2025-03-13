import { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StationMeasures from "../components/FetchData";
import Chart from "../components/Chart";
import SmallMap from "../components/SmallMap"; 
import { ReadingsResponse, DetailsResponse } from "../components/Types";

function StationDetailPage() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [readings, setReadings] = useState<ReadingsResponse | null>(null);
  const [details, setDetails] = useState<DetailsResponse | null>(null);
  const [loadingReadings, setLoadingReadings] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(true);

  const { stationId, stationName, county } = location.state as {
    stationId: string;
    stationName: string;
    county: string;
  };

  const handleReadingsSuccess = useCallback((data: ReadingsResponse) => {
    setReadings(data);
    setLoadingReadings(false);
    //console.log("Measurements fetched:", data);
  }, []);

  const handleDetailsSuccess = useCallback((data: DetailsResponse) => {
    setDetails(data);
    setLoadingDetails(false);
    //console.log("Details fetched:", data);
  }, []);

  const handleBackClick = () => {
    const previousLocation = location.state?.from;

    if (
      previousLocation &&
      previousLocation.pathname === "/CountyStationsPage"
    ) {
      navigate(previousLocation.pathname, {
        state: { county },
      });
    } else {
      navigate(-1); 
    }
  };

  return (
    <div>
      <button
        className="btn btn-link text-primary fw-bold"
        style={{ fontSize: "1.1rem", textDecoration: "none" }}
        onClick={handleBackClick}
      >
        ← Back
      </button>

      <h1 className="mt-4">{stationName} Station</h1>

      <h4 className="mt-4">Station Information:</h4>
      {loadingDetails ? (
        <div className="text-muted">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading station details...</p>
        </div>
      ) : (
        details && (
          <div>
            <p>
              <i>Catchment:</i>{" "}
              {details.items.catchmentName || "No river catchment available"}
            </p>
            <p>
              <i>River:</i>{" "}
              {details.items.riverName || "No river info available"}
            </p>
            <p>
              <i>Town:</i> {details.items.town || "No river town available"}
            </p>
          </div>
        )
      )}

      {details && details.items.lat && details.items.long ? (
        <SmallMap lat={details.items.lat || 0} lng={details.items.long || 0} />
      ) : (
        <p>Location data is unavailable.</p>
      )}

      <StationMeasures
        stationId={stationId}
        onReadingsFetchSuccess={handleReadingsSuccess}
        onDetailsFetchSuccess={handleDetailsSuccess}
      />

      <h4 className="mt-4">Recent Measurements (past 24h):</h4>
      {loadingReadings ? (
        <div className="text-muted">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading measurements...</p>
        </div>
      ) : (
        readings && details && <Chart data={readings} details={details} />
      )}
      <div className="mt-5"></div>
    </div>
  );
}

export default StationDetailPage;
