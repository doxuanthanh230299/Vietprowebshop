import { combineReducers } from 'redux';
import cartReducer from './cart';

const reducer = combineReducers({
  Cart: cartReducer,
});

export default reducer;
