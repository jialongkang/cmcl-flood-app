import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <div className="mt-4"></div>
      <h1>River Gauge Tracker</h1>
      <div className="mt-4"></div>
      <p>
        This site allows you to view recent readings for river level and flow measurement stations 
        across England, as provided by the 
        <a 
          href="https://environment.data.gov.uk/flood-monitoring/doc/reference#introduction"
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary fw-bold"
          style={{ textDecoration: "none", marginLeft: "5px" }}
        >
          Environment Agency Real Time flood-monitoring API.
        </a>
      </p>
      <div className="mt-5"></div>
      <Link
        to="/AllStationsPage"
        className="text-primary fw-bold"
        style={{ fontSize: "1.3rem", textDecoration: "none" }}
      >
        View all stations list →
      </Link>
      <div className="mt-2"></div>
      <Link
        to="/MapPage"
        className="text-primary fw-bold"
        style={{ fontSize: "1.3rem", textDecoration: "none" }}
      >
        View stations on map →
      </Link>
    </div>
  );
}

export default HomePage;
