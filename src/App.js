import React from 'react';
import { useDispatch } from "react-redux";
import "./App.css";
import Bandits from "./features/bandit/Bandits";
import { changeN, resetAll, setAllPlaying } from "./features/bandit/banditSlice";
import Button from './Button';
import Algorithms from "./features/algorithms/Algorithms"
import H1 from "./H1"

function App() {
  const dispatch = useDispatch();
  return (
    <div className="container mx-auto px-8">
      <H1>Learning with Bandits!</H1>
      <label htmlFor="nBandits">
        <input
          type="range"
          name="nBandits"
          id="nBandits"
          min={2}
          max={10}
          step={1}
          defaultValue={5}
          onChange={(e) => dispatch(changeN(e.target.value))}
        />
      </label>
      <Button onClick={() => dispatch(setAllPlaying())} color="yellow">Play/Pause all</Button>
      <Button onClick={() => dispatch(resetAll())} color="pink">Reset all</Button>
      <Bandits />
      <Algorithms />
    </div>
  );
}

export default App;
