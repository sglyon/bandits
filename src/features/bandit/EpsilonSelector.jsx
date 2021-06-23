import React from "react";
import Slider from "../../Slider";

/**
 * @typedef EpsilonSelectorProps
 * @prop {number} epsilon
 * @prop {(val: number)=>void} onSetEpsilon
 */

/**
 * @param {EpsilonSelectorProps} props
 */
function EpsilonSelector(props) {
  const { epsilon, onSetEpsilon } = props;

  return (
    <Slider
      value={epsilon}
      name={"epsilon"}
      onChange={onSetEpsilon}
      min={0}
      max={1}
      step={0.01}
      defaultValue={0.9}
    />
  );
}

export default EpsilonSelector;
