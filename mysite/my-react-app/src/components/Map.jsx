import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = ({ latitude, longitude }) => {
  const mapStyles = {
    height: "100%",
    width: "100%"
  };

  const defaultCenter = {
    lat: latitude,
    lng: longitude
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCFIgPo6v-OIHmxvjFFQexTvGe0f7VBrxo">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
