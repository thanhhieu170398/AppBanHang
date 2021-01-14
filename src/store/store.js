import cartReducer from './cartReducer';
import notifyReducer from './notifyReducer';
import { combineReducers, createStore } from 'redux';

const store = createStore(
  combineReducers({
    cart: cartReducer,
    notify: notifyReducer,
  }),
);

export default store;