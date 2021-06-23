import { argMax } from "../../util";

/**
 * @typedef EpsilonGreedyState
 * @prop {number} epsilon
 * @prop {number[]} values
 * @prop {number[]} n_chosen
 */

/**
 * @typedef EpsilonGreedyProps
 * @prop {number} epsilon
 * @prop {number} startingValue
 */

/**
 * @param  {number} k
 * @param  {EpsilonGreedyProps} props
 * @returns {EpsilonGreedyState}
 */
const newState = (k, props) => {
  return {
    epsilon: props.epsilon,
    values: [...Array(k)].map((_) => props.startingValue || 0),
    n_chosen: [...Array(k)].map((_) => 0),
  };
};

/**
 * @param  {EpsilonGreedyState} state
 * @returns {number}
 */
const choose = (state) => {
  if (Math.random() > state.epsilon) {
    // random choice
    return Math.floor(Math.random() * (state.values.length + 1));
  }
  return argMax(state.values);
};

/**
 * @param  {EpsilonGreedyState} state
 * @param  {number} action
 * @param  {number} reward
 */
const update = (state, action, reward) => {
  const N = state.n_chosen[action];
  const Q = state.values[action];
  state.n_chosen[action] = N + 1;
  state.values[action] += Q + (1 / N) * (reward - Q);
};

export { newState, choose, update };
