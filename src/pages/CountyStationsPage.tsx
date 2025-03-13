import { useLocation, useNavigate, Link } from "react-router-dom";
import CountyStationsTable from "../components/CountyStationsTable";
import stations from "../data/final-stations.json";

const CountyStationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { county } = location.state as { county: string };

  const handleSelectStation = (stationId: string, stationName: string) => {
    navigate(`/StationDetailPage`, {
      state: { stationId, stationName, county },
    });
  };

  return (
    <div>
      <Link
        to="/AllStationsPage"
        className="text-primary fw-bold"
        style={{ fontSize: "1.1rem", textDecoration: "none" }}
      >
        ← Back
      </Link>
      <h2 className="mt-4">Stations in {county}</h2>
      <div className="mt-3"></div>
      <CountyStationsTable
        county={county}
        stations={stations}
        onSelectStation={handleSelectStation}
      />
      <div className="mt-5"></div>
    </div>
  );
};

export default CountyStationsPage;
