import { useState } from 'react';

const useAddToCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  return {
    cartItems,
    addToCart,
  };
};

export default useAddToCart;
