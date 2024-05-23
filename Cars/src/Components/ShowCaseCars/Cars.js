import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Grid, Button, IconButton, Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import SpeedVideo from '../../Assets/Images/ShowCaseCars/Speedometer.mp4';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../Context/DarkModeContext';
import { FavoriteBorderOutlined as FavoriteBorderIcon, Favorite as FavoriteIcon } from '@mui/icons-material';
import CustomButton from '../../CommonComponents/CustomButton';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const apiUrl = 'http://localhost:8080/cars';
  const { isDarkMode } = React.useContext(DarkModeContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to toggle favorite status
  const handleFavoriteToggle = (carId) => {
    if (favorites.includes(carId)) {
      // Remove from favorites
      setFavorites(favorites.filter((id) => id !== carId));
      setSnackbarMessage(`Removed ${cars.find((car) => car.id === carId).brand} from favorites`);
    } else {
      // Add to favorites
      setFavorites([...favorites, carId]);
      setSnackbarMessage(`Added ${cars.find((car) => car.id === carId).brand} to favorites`);
    }
    setSnackbarOpen(true);
    setTimeout(() => setSnackbarOpen(false), 5000);
  };

  return (
    <Box sx={{}}>
      {isDarkMode ? (
        <video
          src={SpeedVideo}
          alt="Black Shade Car"
          style={{
            position: 'fixed',
            zIndex: 1,
            height: '100%',
            width: '100%',
            borderRadius: '10px',
            boxShadow: '0 10px 18px rgba(0, 0, 1, 1)',
            filter: 'blur(5px)'
          }}
          autoPlay
          loop
          playsInline
        />
      ) : null}
      <Box
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: '-1rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '80%',
          gap: 10,
        }}
      >
        <center>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}>
            <Typography sx={{ color: isDarkMode ? 'white' : '#7F27FF', marginTop: '2rem', fontSize: '5rem', fontWeight: 'bold' }}>
              Top Class Cars
            </Typography>
            <Typography sx={{ fontSize: '1rem', color: isDarkMode ? 'lightgrey' : 'black', fontWeight: 'light' }}>
              Explore our diverse selection of top-tier vehicles and experience automotive excellence firsthand.
            </Typography>
          </motion.div>
        </center>
        <Grid container spacing={3} justifyContent="center">
          {cars.map((car) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={car.id}>
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <Card
                  sx={{
                    backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(245, 238, 230,0.5)',
                    color: isDarkMode ? '#FFFFFF' : 'black',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    marginTop: '5rem',
                    border: '0.1px dotted grey',
                    height: '75vh',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                  }}
                >
                  <CardContent style={{ flex: '1 0 auto' }}>
                    <motion.img
                      src={car.image ? car.image : `https://source.unsplash.com/featured/?{${car.brand}}/?orientation=squarish`}
                      alt={car.brand}
                      style={{ width: '100%', height: '20vh', borderRadius: '10px', marginBottom: '1rem' }}
                      whileHover={{ scale: 1.1 }}
                    />
                    <Typography variant="h5" sx={{ color: '#9F59FF', fontWeight: 'bold', display: 'flex', alignItems: 'center' }} gutterBottom>
                      {car.brand}
                      <IconButton
                        onClick={() => handleFavoriteToggle(car.id)}
                        sx={{
                          color: favorites.includes(car.id) ? '#FF6B6B' : '#7F27FF',
                        }}
                        title={favorites.includes(car.id) ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        {favorites.includes(car.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Model : {car.model}
                    </Typography>
                    <Typography gutterBottom>Year: {car.year}</Typography>
                    <Typography gutterBottom>Price: ${car.price}</Typography>
                    <div style={{ height: '7.5rem', overflowY: 'auto', paddingRight: '5px', scrollbarWidth: 'thin', scrollbarColor: isDarkMode ? 'white #383838' : 'white rgb(383838245, 238, 230)' }}>
                      <Typography>Description : {car.description}</Typography>
                    </div>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Link to={`/cars/${car.id}`}>
                    <CustomButton>
                        Show Details
                    </CustomButton>
                    </Link>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
      />
      </Box>
    </Box>
  );
};

export default Cars;
