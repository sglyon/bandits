import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  pullOne,
  resetOne,
  selectBandits,
  setOneMu,
  setOnePlaying,
  selectStepping,
  setStepping,
  selectEpsilon,
  setEpsilon,
} from "./banditSlice";
import Bandit from "./OneBandit";
import EpsilonGreedyAlgo from "./EpsilonGreedyAlgo";
import EpsilonSelector from "./EpsilonSelector";
import H1 from "../../H1";

function Bandits() {
  const banditData = useSelector(selectBandits);

  // prep for epsilon greedy
  const values = banditData.map((x) => x.average);
  const onAct = (choice) => {
    dispatch(pullOne(choice));
  };
  const stepping = useSelector(selectStepping);
  const epsilon = useSelector(selectEpsilon);
  const onSetEpsilon = (val) => dispatch(setEpsilon(val));

  // prep for bandit display
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
  return (
    <div>
      <div className="flex flex-wrap">{bandits}</div>
      <H1>Epsilon Greedy Algorithm</H1>
      <EpsilonSelector epsilon={epsilon} onSetEpsilon={onSetEpsilon} />
      <EpsilonGreedyAlgo
        values={values}
        onAct={onAct}
        stepping={stepping}
        epsilon={epsilon}
        onSetStepping={() => dispatch(setStepping())}
      />
    </div>
  );
}

export default Bandits;
