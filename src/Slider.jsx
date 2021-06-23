import React from "react";

/**
 * @typedef SliderProps
 * @prop {number} value
 * @prop {String} name
 * @prop {(val: number)=>void} onChange
 * @prop {number} min
 * @prop {number} max
 * @prop {number} step
 * @prop {number} defaultValue
 */

/**
 * @param {SliderProps} props
 */
function Slider(props) {
  const { value, name, onChange, min, max, step, defaultValue } = props;

  return (
    <div>
      <span className="pr-4">
        {name} = {value}
      </span>
      <label htmlFor="value">
        <input
          type="range"
          name="value"
          id="value"
          min={min}
          max={max}
          step={step}
          defaultValue={defaultValue}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}

export default Slider;
