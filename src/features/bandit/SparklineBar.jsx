import React from "react";
import { scaleLinear } from "d3";

function SparklineBar(props) {
  const { data, width = 160, height = 30 } = props;
  const N = data.length;
  const bar_width = N === 0 ? 0 : (width - N) / N;
  const xScale = scaleLinear().domain([0, N]).range([0, width]);
  const yScale = scaleLinear().domain([-5, 5]).range([height, 0]);


  return (
    <div className="sparkline">
      <svg width={width} height={height}>
        <g>
          {data.map((d, i) => {
            return (
              <rect
                key={i}
                className="bar"
                x={xScale(i)}
                height={yScale(d)}
                y={height - yScale(d)}
                width={bar_width}
                fill={d > 0 ? "green" : "red"}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export default SparklineBar;
