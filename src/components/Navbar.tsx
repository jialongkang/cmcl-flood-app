import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          CMCL River Gauge Tracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggle}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${
            isOpen
              ? "collapse navbar-collapse show"
              : "collapse navbar-collapse"
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/AboutPage"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/AllStationsPage"
                onClick={() => setIsOpen(false)}
              >
                Stations
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/MapPage"
                onClick={() => setIsOpen(false)}
              >
                Map View
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;