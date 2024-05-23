// Action types
const UPDATE_CART = 'UPDATE_CART';

// Action creators
const updateCart = (cartItems) => ({
  type: UPDATE_CART,
  payload: cartItems,
});

// Reducer
const cartReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CART:
      return action.payload;
    default:
      return state;
  }
};

export default cartReducer;
