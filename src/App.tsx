import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import AllStationsPage from "./pages/AllStationsPage";
import StationDetailPage from "./pages/StationDetailPage";
import CountyStationsPage from "./pages/CountyStationsPage";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/StationDetailPage" element={<StationDetailPage />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/AllStationsPage" element={<AllStationsPage />} />
          <Route path="/CountyStationsPage" element={<CountyStationsPage />} />
          <Route path="/MapPage" element={<MapPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
