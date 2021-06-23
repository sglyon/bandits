import { configureStore } from "@reduxjs/toolkit";
import banditReducer from "../features/bandit/banditSlice";
import counterReducer from "../features/counter/counterSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    bandit: banditReducer,
  },
});
