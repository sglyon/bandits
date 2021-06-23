import React from "react";
import Indicator from "./Indicator";
import SparklineBar from "./SparklineBar";
import Histogram from "./Histogram";
import useInterval from "../../useInterval";
import Button from "../../Button";

/**
 * @typedef BanditProps
 * @prop {number} width
 * @prop {number} number
 * @prop {number} mu
 * @prop {number[]} numbers
 * @prop {boolean} playing
 * @prop {number} average
 * @prop {()=>void} onPlay
 * @prop {()=>void} onReset
 * @prop {()=>void} onPull
 * @prop {(number)=>void} onSetMu
 */

/**
 * @param {BanditProps} props
 */
function Bandit(props) {
  const {
    width,
    number,
    mu,
    numbers,
    playing,
    average,
    onReset,
    onPlay,
    onPull,
    onSetMu,
  } = props;
  const N = numbers.length;
  useInterval(onPull, playing ? 0.1 : null);
  return (
    <div
      className="flex flex-col items-center border-2 border-dashed border-red-200 m-1"
      style={{ width: 200 }}
    >
      <div className="flex items-center justify-around">
        <div className="flex w-1/2 justify-around">
          <span className="w-1/3 text-purple-700 font-medium">mu</span>
          <input
            type="number"
            className="w-2/3 border border-purple-500 p-0.5"
            name="mu"
            id="mu"
            defaultValue={mu}
            step={0.1}
            min={-4}
            max={4}
            onChange={(e) => onSetMu(e.target.value)}
          />
        </div>
        <Indicator number={number} />
      </div>
      <Button onClick={onPull}>Pull</Button>
      <Button onClick={onPlay} color="green">
        {playing ? "Pause" : "Play"}
      </Button>
      <Button onClick={onReset} color="red">
        Reset
      </Button>
      <SparklineBar width={width} data={numbers.slice(-10)} />
      <Histogram data={numbers} width={width} height={150} />
      <p>{N} Draws</p>
      <p>Average of {Math.round(average * 1000) / 1000} </p>
    </div>
  );
}

export default Bandit;
