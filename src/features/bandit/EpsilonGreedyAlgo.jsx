import React from "react";
import Button from "../../Button";
import { argMax } from "../../util";
import useInterval from "../../useInterval";

/**
 * @typedef EpsilonGreedyProps
 * @prop {number[]} values
 * @prop {(ix: number)=>void} onAct
 * @prop {boolean} stepping
 * @prop {()=>void} onSetStepping
 */

/**
 * @param {EpsilonGreedyProps} props
 */
function EpsilonGreedyAlgo(props) {
  const { epsilon, values, onAct, stepping, onSetStepping } = props;

  const choose = () => {
    if (Math.random() > epsilon) {
      // random choice
      return Math.floor(Math.random() * (values.length + 1));
    }
    return argMax(values);
  };

  const act = () => {
    onAct(choose());
  };

  useInterval(act, stepping ? 0.1 : null);

  return (
    <div>
      <Button onClick={onSetStepping} color="green">
        {stepping ? "Pause" : "Run"}
      </Button>
      <Button onClick={act} color="blue">
        Step
      </Button>
    </div>
  );
}

export default EpsilonGreedyAlgo;
