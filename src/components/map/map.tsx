"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { useFormContext } from "react-hook-form";

type MapProps = {
  initialPosition?: LatLngExpression;
};

const ANGOLA_LAT_LNG = { lat: -11.2027, lng: 17.8739 };

export function Map({ initialPosition = ANGOLA_LAT_LNG }: MapProps) {
  const formContext = useFormContext();

  function LocationMarker() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        formContext.setValue("lat", lat);
        formContext.setValue("lng", lng);
      },
    });

    return formContext.watch("lat") && formContext.watch("lng") ? (
      <Marker
        position={{
          lat: formContext.watch("lat"),
          lng: formContext.watch("lng"),
        }}
      />
    ) : null;
  }

  return (
    <MapContainer
      center={initialPosition}
      zoom={5}
      scrollWheelZoom
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}
