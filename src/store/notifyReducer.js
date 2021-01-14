import { createReducer } from '@reduxjs/toolkit';
import { error, remove, success } from './notifyAction';

const initNotifyState = [];

const notifyReducer = createReducer(initNotifyState, (builder) => {
  builder
    .addCase(success, (state, action) => {
      state.push(action.payload);
    })
    .addCase(error, (state, action) => {
      state.push(action.payload);
    })
    .addCase(remove, (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    });
});

export default notifyReducer;