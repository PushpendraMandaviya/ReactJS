import React, { useContext, useState } from 'react';
import '../../App.css';
import { Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import BlackShadeCar from '../../Assets/Images/HomePage/BlackShadeCar.jpg';
import Black_car from '../../Assets/Images/HomePage/Black_car.jpg';
import WhiteShadeCar from '../../Assets/Images/HomePage/whitecar.jpg';
import white_porsche from '../../Assets/Images/HomePage/white_porsche.jpg';
import FeaturesBox from './FeaturesBox';
import ShowCaseVideo from './ShowCaseVideo';
import App from '../../App';
import { DarkModeContext } from '../../Context/DarkModeContext';

function HomePage() {
  // const [isDarkMode, setIsDarkMode] = useState(true);

  // const toggleDarkMode = () => {
  //   setIsDarkMode(!isDarkMode);
  // };
  const {isDarkMode, toggleDarkMode} = useContext(DarkModeContext)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className={isDarkMode ? 'App' : 'App-light'}
      style={{ backgroundColor: isDarkMode ? 'black' : 'white', color: isDarkMode ? 'white' : '#7F27FF' }}
    >
      <center>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Typography sx={{ marginTop: '2rem', fontSize: '6rem', fontWeight: 'bold', color: isDarkMode ? 'white' : '#7F27FF' }}>
            Automotive Excellence
          </Typography>
          <Typography sx={{ fontSize: '1rem', color: isDarkMode ? 'lightgrey' : 'black', fontWeight: 'light' }}>
            Explore our diverse selection of top-tier vehicles and experience automotive excellence firsthand.
          </Typography>
          <img src={isDarkMode ? Black_car : white_porsche} alt="Black Shade Car" style={{ height: '80vh', width: isDarkMode ? 'auto' : 'auto' }} />
        </motion.div>
      </center>
        
      <center>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Typography sx={{ fontSize: '3rem', fontWeight: 'light', color: isDarkMode ? 'white' : '#7F27FF' }}>
            We Have Best Features
          </Typography>
          <br />
          <Typography sx={{ fontSize: '1rem', fontWeight: 'light', color: isDarkMode ? 'lightgrey' : 'black' }}>
            Explore our diverse selection of top-tier vehicles and experience automotive <br /> excellence firsthand. Explore our diverse selection of
          </Typography>
          <FeaturesBox isDarkMode={isDarkMode} />
        </motion.div>
      </center>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <ShowCaseVideo isDarkMode={isDarkMode} />
      </motion.div>

      
    </motion.div>
  );
}

export default HomePage;
