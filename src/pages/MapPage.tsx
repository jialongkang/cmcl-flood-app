import Map from "../components/Map";
import stations from "../data/final-stations.json";

const MapPage = () => {
  return (
    <div>
      <Map stations={stations} />
    </div>
  );
};

export default MapPage;
