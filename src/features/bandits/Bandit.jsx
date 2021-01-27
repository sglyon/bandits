import React, { useState } from "react";
import Indicator from "./Indicator";
import SparklineBar from "./SparklineBar";
import Histogram from "./Histogram";
import { randomNormal } from "d3";
import useInterval from "../../useInterval";
import Button from "./Button";

function Bandit(props) {
  const { width = 160, mu = 4, sigma = 1 } = props;
  const [numbers, setNumbers] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [avg, setAvg] = useState(0);
  const draw = randomNormal(mu, sigma);
  const N = numbers.length;
  const number = N > 0 ? numbers[N - 1] : null;

  const newDraw = () => {
    const newNumber = draw();
    setNumbers([...numbers, newNumber]);
    const newN = numbers.length + 1
    setAvg(avg + (newNumber-avg)/newN)
  };

  const onReset = () => {
      setNumbers([])
      setAvg(0)
  }

  useInterval(newDraw, playing ? 0.1 : null);

  return (
    <div
      className="flex flex-col items-center border-2 border-dashed border-red-200 m-1"
      style={{ width: 200 }}
    >
      <Indicator number={number} />
      <Button onClick={newDraw}>Pull</Button>
      <Button onClick={() => setPlaying(!playing)} color="green">
        {playing ? "Pause" : "Play"}
      </Button>
      <Button onClick={onReset} color="red">Reset</Button>
      <SparklineBar width={width} data={numbers.slice(-10)} />
      <Histogram data={numbers} width={width} height={150} />
      <p>{N} Draws</p>
      <p>Average of {Math.round(avg*1000)/1000} </p>
    </div>
  );
}

export default Bandit;
