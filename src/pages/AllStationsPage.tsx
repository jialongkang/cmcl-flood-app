import { useNavigate } from "react-router-dom";
import TextBlock from "../components/TextBlock";
import CountiesList from "../components/CountiesList";
import stations from "../data/final-stations.json";

const AllStationsPage = () => {
  const navigate = useNavigate();

  const handleSelectCounty = (county: string) => {
    navigate(`/CountyStationsPage`, { state: { county } });
  };

  return (
    <div>
      <div className="mt-4"></div>
      <TextBlock
        title="Measurement stations"
        content="Select a county name to view measurement stations within that county."
      />
      <div className="mt-4"></div>
      <CountiesList stations={stations} onSelectCounty={handleSelectCounty} />
      <div className="mt-5"></div>
    </div>
  );
};

export default AllStationsPage;
