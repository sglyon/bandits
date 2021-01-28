import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  pullOne,
  resetOne,
  selectBandits,
  setOneMu,
  setOnePlaying,
} from "./banditSlice";
import Bandit from "./OneBandit";

function Bandits() {
  const banditData = useSelector(selectBandits);
  const dispatch = useDispatch();
  const bandits = banditData.map((data, id) => {
    return (
      <Bandit
        key={id}
        width={160}
        mu={data.mu}
        number={data.number}
        numbers={data.numbers}
        playing={data.playing}
        average={data.average}
        onReset={() => dispatch(resetOne(id))}
        onPlay={() => dispatch(setOnePlaying(id))}
        onPull={() => dispatch(pullOne(id))}
        onSetMu={(mu) => dispatch(setOneMu({ id, mu }))}
      />
    );
  });
  return <div className="flex flex-wrap">{bandits}</div>;
}

export default Bandits;
