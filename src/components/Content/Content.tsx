import "./Content.css";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import { FC } from "react";

type Props = {
  position: GeolocationPosition | null;
  positionError: GeolocationPositionError | null;
};

const avg = (a: number, b: number) => (a + b) / 2;

export const Content: FC<Props> = ({ position, positionError }) => {
  console.log("Inside content", { position, positionError });
  const requestingPermission = position == null && positionError == null;
  const errorOccurred = positionError != null;
  const canShowMap = !errorOccurred && !requestingPermission;
  return (
    <div className="map-wrapper">
      {requestingPermission && (
        <div className="requesting-permission">
          <h2>Requesting permission to access your location...</h2>
        </div>
      )}
      {positionError != null && (
        <div className="requesting-permission-error">
          <h2>There was an error</h2>
          <p>
            <code>{positionError.message}</code>
          </p>
        </div>
      )}
      {canShowMap && position && (
        <MapContainer
          id="map"
          center={[avg(position.coords.latitude, 49.8271940163607), avg(position.coords.longitude, 19.049433455195103)]}
          zoom={15}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker title="You're here" position={[position.coords.latitude, position.coords.longitude]}>
            <Tooltip permanent>You're Here</Tooltip>
          </Marker>
          <Marker title="Galeria Sfera" position={[49.8271940163607, 19.049433455195103]}>
            <Tooltip permanent>Galeria Sfera</Tooltip>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};
