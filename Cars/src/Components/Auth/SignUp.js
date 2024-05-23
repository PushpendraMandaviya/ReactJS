import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, FilledInput, Button, Grid, Box } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CarVideo from '../../Assets/Images/HomePage/CarVideo.mp4';
import CustomButton from '../../CommonComponents/CustomButton';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [idCounter, setIdCounter] = useState(1); // Counter for generating sequential IDs
  
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const validateName = (name) => {
      return name.trim() !== '';
    };
  
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const validatePassword = (password) => {
      return password.length >= 8;
    };
  
    const handleSignUp = async () => {
      if (!validateName(name)) {
        setError('Please enter your name.');
        return;
      }
  
      if (!validateEmail(email)) {
        setError('Please enter a valid email address.');
        return;
      }
  
      if (!validatePassword(password)) {
        setError('Password must be at least 8 characters long.');
        return;
      }
  
      try {
        // Make API call to signup endpoint with sequential ID

        const users = await axios.get('http://localhost:8080/users');
        console.log(users)
        // console.log(response.data);
        setIdCounter(users.data.length)
        console.log(setIdCounter)
        const response = await axios.post('http://localhost:8080/users', { id: (users.data.length)+1, name, email, password });
        // Increment ID counter for the next signup
        // setIdCounter(idCounter + 1);
        // Navigate to login page after successful signup
        navigate('/login');
      } catch (error) {
        console.error('Error signing up:', error);
        setError('An error occurred. Please try again later.');
      }
    };
  
    const handleLoginClick = () => {
      navigate('/login');
    };

  return (
    <Box sx={{ position: 'fixed' }}>
      <video src={CarVideo} alt="Black Shade Car" style={{ position: 'fixed', zIndex: 1, height: 'auto%', maxWidth: '100%', borderRadius: '10px', boxShadow: '0 10px 18px rgba(0, 0, 1, 1)' }} autoPlay loop playsInline />

      <Box sx={{
        marginTop: '10rem',
        marginLeft: '40rem',
        display: 'flex',
        alignContent: 'center',
        position: 'relative',
        zIndex: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(15px)',
        width: '400px',
        height: '400px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '1rem'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <center>
            <Container maxWidth="sm" sx={{}}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h5" gutterBottom style={{ color: '#FFFF', textAlign: 'left', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}> Signup to AutoRadar </Typography>
                <br />
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12}>
                    <motion.Box
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <FilledInput
                        sx={{
                          width: { sm: 250, md: 350 },
                          color: "white",
                          "& .MuiInputBase-root": {
                            height: 50,
                          },
                        }}
                        type='text'
                        placeholder={`Enter Your Name`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </motion.Box>
                  </Grid>
                  <Grid item xs={12}>
                    <motion.Box
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <FilledInput
                        sx={{
                          width: { sm: 250, md: 350 },
                          color: "white",
                          "& .MuiInputBase-root": {
                            height: 50,
                          },
                        }}
                        type='email'
                        placeholder={`Enter Email`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </motion.Box>
                  </Grid>
                  <Grid item xs={12}>
                    <motion.Box
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <FilledInput
                        sx={{
                          width: { sm: 250, md: 350 },
                          color: "white",
                          "& .MuiInputBase-root": {
                            height: 50,
                          },
                        }}
                        type={showPassword ? "text" : "password"}
                        placeholder={`Enter Password`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              sx={{ color: 'grey' }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </motion.Box>
                  </Grid>
                  <Grid item xs={12}>
                    <br />
                    <motion.Box
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}>
                      <CustomButton variant="contained" color="primary" onClick={handleSignUp}>
                        SignUp
                      </CustomButton  >
                    </motion.Box>
                  </Grid>
                  <Grid item xs={12}>
                    <motion.Box
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <Button variant="outlined" onClick={handleLoginClick} sx={{ marginBottom: '1rem', borderColor: '#7F27FF', color: '#7F27FF', width: { sm: 250, md: 350 } }}>
                        Back to Login
                      </Button>
                    </motion.Box>
                  </Grid>
                </Grid>
                {error && (
                  <Grid item xs={12}>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1 }}>
                      <Typography variant="body2" sx={{ color: 'red' }}>{error}</Typography>
                    </motion.div>
                  </Grid>
                )}
              </motion.div>
            </Container>
          </center>
        </motion.div>
      </Box>
    </Box>
  );
};

export default SignUp;