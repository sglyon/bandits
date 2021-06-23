import { createSlice } from "@reduxjs/toolkit";
import { randomNormal } from "d3";

/**
 * @typedef BanditData
 * @prop {number} id
 * @prop {number} mu
 * @prop {boolean} hidden
 * @prop {number|null} number
 * @prop {number[]} numbers
 * @prop {boolean} playing
 * @prop {number} average
 */

/**
 * @typedef NewBanditSettings
 * @prop {number} id
 * @prop {number} [mu]
 * @prop {boolean} hidden
 */

const randomMu = () => Math.round(10 * (5 * (Math.random() - 0.5))) / 10;

/**
 *
 * @param {NewBanditSettings} settings
 * @returns {BanditData}
 */
const createNewBandit = (settings) => {
  const { id, mu = randomMu(), hidden = true } = settings;
  return {
    id,
    mu,
    hidden,
    number: null,
    numbers: [],
    playing: false,
    average: 0,
  };
};

const standardNormalDraw = randomNormal(0, 1);

/**
 * @typedef BanditState
 * @prop {number} N
 * @prop {BanditData[]} bandits
 * @prop {number} lastPlayed
 * @prop {number} epsilon
 * @prop {boolean} algorithmStepping
 */

/**
 *
 * @param {number} nBandits
 * @returns {BanditState}
 */
const initialState = (nBandits) => {
  const out = {
    N: nBandits,
    bandits: [...Array(10)].map((_, id) => createNewBandit({ id })),
    activeAlgorithm: 0,
    epsilon: 0.98,
    lastPlayed: undefined,
    algorithmStepping: false,
  };
  for (let i = 0; i < nBandits; i++) {
    out.bandits[i].hidden = false;
    out.bandits[i].numbers = [];
  }
  return out;
};

const playBandit = (bandit) => {
  const number = standardNormalDraw() + bandit.mu;
  const N = bandit.numbers.length + 1;
  return {
    ...bandit,
    number,
    numbers: [...bandit.numbers, number],
    average: bandit.average + (number - bandit.average) / N,
  };
};

/**
 *
 * @param {BanditData} bandit
 * @param {number} id
 * @returns {BanditData}
 */
const resetBandit = (bandit, id) => {
  const newBandit = createNewBandit({ id });
  newBandit.hidden = bandit.hidden;
  newBandit.mu = bandit.mu;
  return newBandit;
};

export const banditSlice = createSlice({
  name: "bandit",
  initialState: initialState(5),
  reducers: {
    changeN: (state, action) => {
      const N = +action.payload;
      for (let id = 0; id < 10; id++) {
        state.bandits[id].hidden = id >= N;
      }
      state.N = N;
    },
    setOneMu: (state, action) => {
      const { id, mu } = action.payload;
      state.bandits[id].mu = +mu;
    },
    pullOne: (state, action) => {
      const ix = action.payload;
      state.bandits[ix] = playBandit(state.bandits[ix]);
    },
    pullAll: (state) => {
      // TODO: make async
      state.bandits = state.bandits.map(playBandit);
    },
    resetOne: (state, action) => {
      const id = action.payload;
      state.bandits[id] = resetBandit(state.bandits[id], id);
    },
    resetAll: (state) => {
      state.bandits.forEach((d, id) => {
        state.bandits[id] = resetBandit(d, id);
      });
    },
    setOnePlaying: (state, action) => {
      console.log("Here!");
      const id = action.payload;
      state.bandits[id].playing = !state.bandits[id].playing;
    },
    setAllPlaying: (state) => {
      for (let id = 0; id < state.N; id++) {
        state.bandits[id].playing = !state.bandits[id].playing;
      }
    },
    setStepping: (state) => {
      state.algorithmStepping = !state.algorithmStepping;
    },
    setEpsilon: (state, action) => {
      state.epsilon = action.payload;
    },
  },
});

export const {
  changeN,
  setOneMu,
  pullOne,
  pullAll,
  resetOne,
  resetAll,
  setOnePlaying,
  setAllPlaying,
  setStepping,
  setEpsilon,
} = banditSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

/**
 *
 * @param {BanditState} state
 * @returns {BanditData[]}
 */
export const selectBandits = (state) =>
  state.bandit.bandits.filter((x) => !x.hidden);

/**
 * Selects from store whether the algorithm is currently stepping or not
 *
 * @param {BanditState} state
 * @returns {boolean}
 */
export const selectStepping = (state) => state.bandit.algorithmStepping;

/**
 * Selects epsilon for epsilon greedy algorithm
 *
 * @param {BanditState} state
 * @returns {number}
 */
export const selectEpsilon = (state) => state.bandit.epsilon;

/**
 * Selects number of active Bandits
 *
 * @param {BanditState} state
 * @returns {number}
 */
export const selectNBandits = (state) => state.bandit.N;

export default banditSlice.reducer;
