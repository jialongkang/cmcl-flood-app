import { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Wrapper } from "@googlemaps/react-wrapper";

interface SmallMapProps {
  lat: number;
  lng: number;
}

const SmallMap = ({ lat, lng }: SmallMapProps) => {
  const [center, setCenter] = useState({ lat, lng });

  const mapContainerStyle = {
    width: "100%",
    height: "200px",
  };

  useEffect(() => {
    setCenter({ lat, lng });
  }, [lat, lng]);

  return (
    <Wrapper apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      <GoogleMap
        center={center}
        zoom={10}
        mapContainerStyle={mapContainerStyle}
        options={{
          disableDefaultUI: true,
        }}
      >
        <Marker
          position={center}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />
      </GoogleMap>
    </Wrapper>
  );
};

export default SmallMap;
