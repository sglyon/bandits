import React from "react";
import Bandit from "./features/bandits/Bandit";

function NBandits(props) {
  const { N = 2 } = props;
  const bandits = []
  for (let _ix = 0; _ix < N; _ix++) {
      bandits.push(<Bandit key={_ix} />)
  }
  console.log("N:", N)
  console.log("bandits:", bandits)
  return <div className="flex flex-wrap">{bandits}</div>;
}

export default NBandits;
