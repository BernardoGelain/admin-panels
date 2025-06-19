"use client";

import { MapContainer, TileLayer, Marker, useMapEvents, Tooltip } from "react-leaflet";
import { LatLngExpression, LatLngBounds, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import L from "leaflet";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

type MapProps = {
  initialPosition?: LatLngExpression;
  multiplePoints?: Array<{
    lat: number;
    lng: number;
    label?: string;
    online: boolean;
  }>;
};

const ANGOLA_LAT_LNG = { lat: -11.2027, lng: 17.8739 };

export function Map({ initialPosition = ANGOLA_LAT_LNG, multiplePoints }: MapProps) {
  const formContext = useFormContext();
  const blueIcon = new L.Icon({
    iconUrl: "/blue-marker.png", // ícone azul (2F80ED)
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [1, -12],
  });
  const grayIcon = new L.Icon({
    iconUrl: "/gray-marker.png", // Cinza (hex: #A0A0A0)
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
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
    <MapContainer center={initialPosition} zoom={5} scrollWheelZoom style={{ height: "400px", width: "100%", zIndex: "0" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Quando múltiplos pontos são passados, renderiza os marcadores fixos */}
      {multiplePoints &&
        multiplePoints.map((point, index) => (
          <Marker position={[point.lat, point.lng]} icon={point.online ? blueIcon : grayIcon} key={index}>
            <Tooltip>{point.label}</Tooltip>
          </Marker>
        ))}

      {multiplePoints && <FitBounds />}
      {!multiplePoints && <LocationMarker />}
    </MapContainer>
  );
}
