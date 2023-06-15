import {
  ADD_TO_CART,
  DELETE_ITEM_CART,
  EMPTY_CART,
  UPDATE_CART,
} from '../../constants/action-type';

const initState = {
  items: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return addItem(state, action.payload);
    case UPDATE_CART:
      return updateCart(state, action.payload);
    case DELETE_ITEM_CART:
      return deleteCart(state, action.payload);
    case EMPTY_CART:
      return emptyCart(state);
    default:
      return state;
  }
};

const addItem = (state, payload) => {
  const items = state.items;
  let isProductExists = false;
  items.map((item, index) => {
    if (item._id === payload._id) {
      isProductExists = true;
      item.qty += payload.qty;
    }
    return item;
  });
  const newItems = isProductExists ? items : [...items, payload];
  return { ...state, items: newItems };
};

const updateCart = (state, payload) => {
  const items = state.items;
  const newItems = items.map((item) => {
    if (item._id === payload._id) {
      item.qty = payload.qty;
    }
    return item;
  });
  return { ...state, items: newItems };
};

const deleteCart = (state, payload) => {
  const items = state.items;
  const newItems = items.filter((item) => item._id !== payload._id);
  return { ...state, items: newItems };
};

const emptyCart = (state) => {
  const newItems = [];
  return {...state, items:newItems};
}