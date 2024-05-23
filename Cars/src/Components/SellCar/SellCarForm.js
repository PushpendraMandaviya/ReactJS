import React, { useEffect, useState } from 'react';
import { TextField, Button, Autocomplete, Grid, Typography, Paper, Box, Checkbox, FormControlLabel, InputAdornment, IconButton, Tooltip } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import axios from 'axios';
import SpeedVideo from '../../Assets/Images/ShowCaseCars/Speedometer.mp4';
import { motion } from "framer-motion";
import { DarkModeContext } from '../../Context/DarkModeContext';
import CustomButton from '../../CommonComponents/CustomButton';
import { useSelector } from 'react-redux';

const initialFormData = {
  brand: '',
  model: '',
  year: '',
  price: '',
  kilometers: '',
  mileage: '',
  cartype: '',
  fuelType: '',
  numberOfOwners: '',
  defects: '',
  condition: '',
  engine: '',
  transmission: '',
  features: [],
  insurance: false,
  serviceHistory: '',
  description: '',
  seller: {} // New field to store seller details
};

const fieldMap = [
  { name: 'brand', label: 'Brand', icon: '🚗', tooltip: 'Enter the brand of the car' },
  { name: 'model', label: 'Model', icon: '🚘', tooltip: 'Enter the model of the car' },
  { name: 'year', label: 'Year', icon: '📅', tooltip: 'Enter the year of the car' },
  { name: 'price', label: 'Price', icon: '💰', tooltip: 'Enter the price of the car' },
  { name: 'kilometers', label: 'Kilometers', icon: '🛣️', tooltip: 'Enter the kilometers driven' },
  { name: 'mileage', label: 'Mileage', icon: '🚥', tooltip: 'Enter the mileage of the car' },
  { name: 'cartype', label: 'Car Type', icon: '🚙', tooltip: 'Enter the type of car' },
  { name: 'fuelType', label: 'Fuel Type', icon: '⛽', tooltip: 'Enter the fuel type' },
  { name: 'numberOfOwners', label: 'Number of Owners', icon: '👥', tooltip: 'Enter the number of owners' },
  { name: 'defects', label: 'Defects', icon: '🛠️', tooltip: 'Enter any defects' },
  { name: 'condition', label: 'Condition', icon: '🛣️', tooltip: 'Enter the condition of the car' },
  { name: 'engine', label: 'Engine', icon: '🔧', tooltip: 'Enter the engine details' },
  { name: 'transmission', label: 'Transmission', icon: '⚙️', tooltip: 'Enter the transmission details' },
  { name: 'serviceHistory', label: 'Service History', icon: '🛠️', tooltip: 'Enter the service history' },
  { name: 'description', label: 'Description', icon: '📝', tooltip: 'Enter a description' },
  { name: 'features', label: 'Features', icon: '🎛️', tooltip: 'Select features' }
];

const SellCarForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [featuresOptions, setFeaturesOptions] = useState([]);
  const {isDarkMode, toggleDarkMode} = React.useContext(DarkModeContext);
  const { user } = useSelector((state) => state.user); // Fetch user details

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cars');
        const features = response.data.reduce((acc, car) => {
          return [...acc, ...car.features];
        }, []);
        const uniqueFeatures = [...new Set(features)];
        setFeaturesOptions(uniqueFeatures);
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    fetchFeatures();
  }, []);

  const handleFeatureChange = (event, values) => {
    setFormData({ ...formData, features: values });
  };

  const handleCheckboxChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.checked });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Combine user details with the form data
      const formDataWithUser = {
        ...formData,
        seller: {
          name: user.name,
          email: user.email,
          // Add other user details if needed
        }
      };

      // Submit the form with combined data
      const response = await axios.post('http://localhost:8080/cars', formDataWithUser);
      console.log('Form submitted successfully:', response.data);
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <>
        <Box sx={{ position: 'relative' }}>
          {isDarkMode ?
            <video src={SpeedVideo} alt="Black Shade Car" style={{ position: 'fixed', zIndex: 1, height: '100%', width: '100%', borderRadius: '10px', boxShadow: '0 10px 18px rgba(0, 0, 1, 1)' }} autoPlay loop playsInline />
            : null }
          <Box sx={{ position: 'relative', zIndex: 2, marginTop: '-1rem', marginLeft: 'auto', marginRight: 'auto', width: '80%', gap: 10 }}>
            <center>
              <Typography variant="h2" sx={{ marginTop: '2rem', fontWeight: 'bold', color: isDarkMode ? 'white' : '#7F27FF' }}>
                Sell Your Car
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'lightgrey', fontWeight: 'light', color: isDarkMode ? 'white' : 'black' }}>
                Explore our diverse selection of top-tier vehicles and experience automotive excellence firsthand.
              </Typography>
            </center>
            <Paper elevation={3} sx={{ marginTop:'2rem',padding: '2rem', backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(245, 238, 230,0.5)', borderRadius: '10px', color: isDarkMode ? 'grey' :'black' }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                {fieldMap.map((field) => (
                    <Grid item xs={12} md={6} key={field.name}>
                      {field.name === 'features' ? (
                        <Autocomplete
                          multiple
                          id="features"
                          options={featuresOptions}
                          onChange={handleFeatureChange}
                          renderInput={(params) => <TextField {...params} variant="standard" color="secondary" label="Select Features" sx={{ color: isDarkMode ? 'white' : 'black', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                  color="primary"
                                    checked={selected}
                                  />
                                }
                                label={option}
                              />
                            </li>
                          )}
                        />
                      ) : (
                        <Tooltip title={field.tooltip} arrow placement="top">
                          <TextField
                            fullWidth
                            variant="filled"
                            label={field.label}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">{field.icon}</InputAdornment>,
                              sx: { backgroundColor: 'rgba(255, 255, 255, 0.2)', color: isDarkMode ? 'white' : 'black' },
                              placeholder: `Enter ${field.label}`,
                            }}
                          />
                        </Tooltip>
                      )}
                    </Grid>
                  ))}
                </Grid>
                <Box mt={2}>
                  <CustomButton
                    width="100px"
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                  >
                    Submit
                  </CustomButton>
                </Box>
              </form>
            </Paper>
          </Box>
        </Box>
      </>
    </motion.div>
  );
};

export default SellCarForm;
