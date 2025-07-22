import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CounterState } from '../../types';

const initialState: CounterState = {
  value: 0,
  history: [0],
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      state.history.push(state.value);
    },
    decrement: (state) => {
      state.value -= 1;
      state.history.push(state.value);
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
      state.history.push(state.value);
    },
    reset: (state) => {
      state.value = 0;
      state.history = [0];
    },
    clearHistory: (state) => {
      state.history = [state.value];
    },
  },
});

export const { 
  increment, 
  decrement, 
  incrementByAmount, 
  reset, 
  clearHistory 
} = counterSlice.actions;

export default counterSlice.reducer;
