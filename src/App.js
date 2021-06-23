import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Bandits from "./features/bandit/Bandits";
import {
  changeN,
  resetAll,
  setAllPlaying,
  selectNBandits,
} from "./features/bandit/banditSlice";
import Button from "./Button";
import H1 from "./H1";
import Slider from "./Slider";

function App() {
  const dispatch = useDispatch();
  const NBandits = useSelector(selectNBandits);
  return (
    <div className="container mx-auto px-8">
      <H1>Learning with Bandits!</H1>
      <Slider
        value={NBandits}
        name={"Number of Bandits"}
        onChange={(newN) => dispatch(changeN(newN))}
        min={2}
        max={10}
        step={1}
        defaultValue={5}
      />

      <Button onClick={() => dispatch(setAllPlaying())} color="yellow">
        Play/Pause all
      </Button>
      <Button onClick={() => dispatch(resetAll())} color="pink">
        Reset all
      </Button>
      <Bandits />
    </div>
  );
}

export default App;
