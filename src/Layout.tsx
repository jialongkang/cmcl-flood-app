import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

function Layout() {
  const location = useLocation();
  const isMapPage = location.pathname === "/MapPage";

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div
        className={`${isMapPage ? "p-0 m-0" : "container mt-4"}`}
        style={isMapPage ? { flex: "1 1 auto" } : {}}
      >
        <div
          className={`row justify-content-center ${isMapPage ? "m-0" : ""}`}
          style={isMapPage ? { height: "100%" } : {}}
        >
          <div
            className={`col-12 ${isMapPage ? "p-0" : "col-lg-10 col-md-12"}`}
            style={isMapPage ? { height: "100%" } : {}}
          >
            <main className={isMapPage ? "h-100" : ""}>
              <Outlet />
            </main>
          </div>
        </div>
      </div>

      <footer className="bg-light text-center text-muted py-3 mt-auto">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Made by Jialong A. Kang
        </p>
        <p>
          This uses Environment Agency flood and river level data from the
          real-time data API (Beta).
        </p>
      </footer>
    </div>
  );
}

export default Layout;
