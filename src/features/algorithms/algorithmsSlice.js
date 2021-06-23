import { createSlice } from "@reduxjs/toolkit";

export const algorithmSlice = createSlice({
  name: "algorithm",
  initialState: {
    value: 0,
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { incrementByAmount } = algorithmSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.algorithm.value)`
export const selectCount = (state) => state.algorithm.value;

export default algorithmSlice.reducer;
