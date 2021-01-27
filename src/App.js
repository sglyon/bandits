import React from 'react';
import { useDispatch } from "react-redux";
import "./App.css";
import Bandits from "./features/bandit/Bandits";
import { changeN, setAllPlaying } from "./features/bandit/banditSlice";
import Button from './features/bandit/Button';

function App() {
  const dispatch = useDispatch();
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
          defaultValue={2}
          onChange={(e) => dispatch(changeN(e.target.value))}
        />
      </label>
      <Button onClick={() => dispatch(setAllPlaying())} color="yellow">Play/Pause all</Button>
      <Bandits />
    </div>
  );
}

export default App;
