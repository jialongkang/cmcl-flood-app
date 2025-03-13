import { useState, useRef } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { Wrapper } from "@googlemaps/react-wrapper";
import { StationData } from "./Types";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface MapProps {
  stations: StationData[];
}

function Map({ stations }: MapProps) {
  const [selectedStation, setSelectedStation] = useState<StationData | null>(
    null
  );
  const [center, setCenter] = useState({ lat: 54.0, lng: -3.0 });
  const [zoom, setZoom] = useState(6);
  const mapRef = useRef<google.maps.Map | null>(null); 
  const navigate = useNavigate();

  const handleMarkerClick = (station: StationData) => {
    setSelectedStation(station);
    if (mapRef.current) {
      mapRef.current.setCenter({
        lat: parseFloat(station.Lat),
        lng: parseFloat(station.Long),
      });
      mapRef.current.setZoom(13);
    }
  };

  const handleCloseInfoWindow = () => {
    setSelectedStation(null);
  };

  const handleNavigateToDetail = (stationId: string, stationName: string) => {
    navigate(`/StationDetailPage`, {
      state: { stationId, stationName },
    });
  };

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  return (
    <Wrapper apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      <GoogleMap
        center={center}
        zoom={zoom}
        mapContainerStyle={{
          width: "100%",
          height: `calc(100vh - 140px)`,
        }}
        onLoad={onMapLoad}
        options={{
          restriction: {
            latLngBounds: {
              north: 61.0,
              south: 47.0,
              east: 9.9,
              west: -15.0,
            },
            strictBounds: false,
          },
          disableDefaultUI: true,
          minZoom: 6,
        }}
      >
        {stations.map((station) => {
          if (
            station.Lat !== "No lat available" &&
            station.Long !== "No long available"
          ) {
            return (
              <Marker
                key={station.StationID}
                position={{
                  lat: parseFloat(station.Lat),
                  lng: parseFloat(station.Long),
                }}
                title={station.Label}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                }}
                onClick={() => handleMarkerClick(station)}
              />
            );
          }
          return null;
        })}

        {selectedStation && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedStation.Lat),
              lng: parseFloat(selectedStation.Long),
            }}
            onCloseClick={handleCloseInfoWindow}
          >
            <div className="p-3">
              <h5 className="mb-3">{selectedStation.Label} Station</h5>
              <p>
                <strong>River:</strong> {selectedStation.River}
              </p>
              <p>
                <strong>Measure(s):</strong> {selectedStation.Measure}
              </p>

              <button
                className="btn btn-primary btn-sml"
                onClick={() =>
                  handleNavigateToDetail(
                    selectedStation.StationID,
                    selectedStation.Label
                  )
                }
              >
                See recent readings
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </Wrapper>
  );
}

export default Map;
