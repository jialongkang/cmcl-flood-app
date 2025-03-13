import { StationData } from "./Types";

interface StationsTableProps {
  county: string;
  stations: StationData[];
  onSelectStation: (stationId: string, stationName: string) => void;
}

const CountyStationsTable = ({ county, stations, onSelectStation }: StationsTableProps) => {
  const filteredStations = stations
    .filter((station) => station.County === county)
    .sort((a, b) => a.Label.localeCompare(b.Label));

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="text-start">Label</th>
          <th>River</th>
          <th>Town</th>
          <th>Measure</th>
        </tr>
      </thead>
      <tbody>
        {filteredStations.map((station) => (
          <tr key={station.StationID}>
            <td className="text-start">
              <button
                className="btn btn-link p-0"
                style={{
                  textDecoration: "none",
                  color: "#007bff",
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onClick={() => onSelectStation(station.StationID, station.Label)}
              >
                {station.Label}
              </button>
            </td>
            <td>{station.River}</td>
            <td>{station.Town}</td>
            <td>{station.Measure}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CountyStationsTable;
