import React, { useEffect, useRef } from "react";
import { bin, scaleLinear, max, axisBottom, select } from "d3";

function Histogram(props) {
  const { data, width, height } = props;
  const axisContainer = useRef(null);

  // d3 computations
  const bins = bin().thresholds(30)(data);
  const x = scaleLinear()
    .domain([bins[0].x0, bins[bins.length - 1].x1])
    .range([0, width]);

  const y = scaleLinear()
    .domain([0, max(bins, (d) => d.length)])
    .nice()
    .range([height, 0]);

  const color = "#374151";

  // apply axis in effect
  useEffect(() => {
    if (!axisContainer.current || data.length === 0) {
      return;
    }
    select(axisContainer.current)
      .attr("transform", `translate(0,${height})`)
      .call(axisBottom(x).ticks(6));
  }, [data, width, height, x]);

  if (data.length === 0) {
    return <svg width={width} height={height + 20}></svg>;
  }

  return (
    <div>
      <svg width={width} height={height + 20}>
        <g>
          {bins.map((d, i) => {
            return (
              <rect
                key={i}
                className="bar"
                x={x(d.x0) + 1}
                width={Math.max(0, x(d.x1) - x(d.x0) - 1)}
                y={y(d.length)}
                height={y(0) - y(d.length)}
                fill={color}
              />
            );
          })}
        </g>
        <g ref={axisContainer} />
      </svg>
    </div>
  );
}

export default Histogram;
