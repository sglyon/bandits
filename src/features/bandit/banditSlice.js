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

/**
 *
 * @param {NewBanditSettings} settings
 * @returns {BanditData}
 */
const createNewBandit = (settings) => {
  const { id, mu = 2, hidden = true } = settings;
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
  };
  for (let i = 0; i < nBandits; i++) {
    out.bandits[i].hidden = false;
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

export const banditSlice = createSlice({
  name: "bandit",
  initialState: initialState(2),
  reducers: {
    changeN: (state, action) => {
      const N = +action.payload;
      for (let id = 0; id < 10; id++) {
        state.bandits[id].hidden = id >= N;
      }
      state.N = N
    },
    setOneMu: (state, action) => {
      const {id, mu} = action.payload;
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
      const newBandit = createNewBandit({ id });
      newBandit.hidden = state.bandits[id].hidden
      state.bandits[id] = newBandit

    },
    resetAll: (state, action) => {
      state.bandits = initialState(action.payload).bandits;
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
} = banditSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

/**
 *
 * @param {*} state
 * @returns {BanditData[]}
 */
export const selectBandits = (state) =>
  state.bandit.bandits.filter((x) => !x.hidden);

export default banditSlice.reducer;
