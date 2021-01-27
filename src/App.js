import { useState } from "react";
import "./App.css";
import NBandits from "./NBandits"

function App() {
  const [nBandits, setnBandits] = useState(2);
  return (
    <div className="container mx-auto px-8">
      <h1 className="text-xl font-semibold">Learning with Bandits!</h1>
      <label htmlFor="nBandits">
        <input
          type="range"
          name="nBandits"
          id="nBandits"
          min={2}
          max={10}
          step={1}
          defaultValue={nBandits}
          onChange={(e) => setnBandits(e.target.value)}
        />
      </label>
      <NBandits N={nBandits} />
    </div>
  );
}

export default App;
