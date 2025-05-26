"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLngExpression, LatLngBounds, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

type MapProps = {
  initialPosition?: LatLngExpression;
  multiplePoints?: Array<{
    lat: number;
    lng: number;
    label?: string;
  }>;
};

const ANGOLA_LAT_LNG = { lat: -11.2027, lng: 17.8739 };

export function Map({ initialPosition = ANGOLA_LAT_LNG, multiplePoints }: MapProps) {
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

  function FitBounds() {
    const map = useMapEvents({});

    useEffect(() => {
      if (multiplePoints && multiplePoints.length > 0) {
        const bounds = new LatLngBounds(multiplePoints.map((p) => [p.lat, p.lng] as LatLngTuple));
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }, [multiplePoints, map]);

    return null;
  }

  return (
    <MapContainer center={initialPosition} zoom={5} scrollWheelZoom style={{ height: "400px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Quando múltiplos pontos são passados, renderiza os marcadores fixos */}
      {multiplePoints && multiplePoints.map((point, index) => <Marker key={index} position={[point.lat, point.lng]} />)}

      {multiplePoints && <FitBounds />}
      {!multiplePoints && <LocationMarker />}
    </MapContainer>
  );
}
