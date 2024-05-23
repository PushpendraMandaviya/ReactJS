import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const useRandomCars = (cardWidth) => {
  const [randomCars, setRandomCars] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchRandomCars = async () => {
      try {
        // Fetch random cars data
        const response = await axios.get('http://localhost:8080/cars');
        const carsData = response.data;
        setRandomCars(carsData);

        // Retrieve cart items from localStorage
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
      } catch (error) {
        console.error('Error fetching random cars:', error);
      }
    };

    fetchRandomCars();
  }, []);

  // Function to handle adding a car to the cart
  const handleAddToCart = (car) => {
    // Update cart items state
    setCartItems([...cartItems, car]);
    // Store updated cart items in localStorage
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, car]));
  };

  // Function to handle removing a car from the cart
  const handleRemoveFromCart = (carId) => {
    // Filter out the car to be removed from the cart items
    const updatedCartItems = cartItems.filter((item) => item.id !== carId);
    // Update cart items state
    setCartItems(updatedCartItems);
    // Store updated cart items in localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  return { randomCars, cartItems, handleAddToCart, handleRemoveFromCart, scrollRef };
};

export default useRandomCars;
