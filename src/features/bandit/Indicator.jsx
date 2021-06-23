import React from "react";

function Indicator(props) {
  const { number } = props;
  const color = +number > 0 ? "green" : "red";
  return (
    <div className={`mb-3 text-${color}-700 text-lg`}>
      {Math.round(number * 1000) / 1000}
    </div>
  );
}

export default Indicator;
