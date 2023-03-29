import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Content } from "./components/Content/Content";
import { useEffect, useState } from "react";

function App() {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [positionError, setPositionError] = useState<GeolocationPositionError | null>(null);

  useEffect(() => {
    const onSuccess: PositionCallback = (position) => {
      console.log("success", position);
      setPosition(position);
    };

    const onError: PositionErrorCallback = (positionError) => {
      console.log("err", positionError);
      setPositionError(positionError);
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return (
    <div className="App">
      <div className="logos">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="global-heading">Geolocation PWA</h1>
      <div className="card">
        <Content position={position} positionError={positionError} />
      </div>
    </div>
  );
}

export default App;
