// src/LoginPage.js
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Container,
  Typography,
  FilledInput,
  Button,
  Grid,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Add this import
import CarVideo from "../../Assets/Images/HomePage/CarVideo.mp4";
import { useSelector } from "react-redux";
import { setLoggedInUser } from "../../Redux/Slices/UserSlice";
import CustomButton from "../../CommonComponents/CustomButton";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch(); // Add this line

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    if (validateEmail(emailValue)) {
      setError("");
    } else {
      setError("Please enter a valid email address.");
    }
  };

  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    if (validatePassword(passwordValue)) {
      setError("");
    } else {
      setError("Password must be at least 8 characters long.");
    }
  };

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError("Please enter both email and password.");
        return;
      }
  
      if (!validatePassword(password)) {
        setError("Password must be at least 8 characters long.");
        return;
      }
  
      const response = await axios.get("http://localhost:8080/users");
      const users = response.data;
  
      const currUser = users.find(
        (u) => u.email === email && u.password === password
      );
  
      if (currUser) {
        localStorage.setItem("user", JSON.stringify(currUser));
        dispatch(setLoggedInUser(currUser));
        navigate("/home");
      } else {
        setError("Incorrect email or password.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("An error occurred. Please try again later.");
    }
  };
  
  const validatePassword = (password) => {
    return password.length >= 8;
  };
  

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <Box sx={{ position: "fixed" }}>
      <video
        src={CarVideo}
        alt="Black Shade Car"
        style={{
          position: "fixed",
          zIndex: 1,
          height: "auto%",
          maxWidth: "100%",
          borderRadius: "10px",
          boxShadow: "0 10px 18px rgba(0, 0, 1, 1)",
        }}
        autoPlay
        loop
        playsInline
      />

      <Box
        style={{
          marginTop: "10rem",
          marginLeft: "40rem",
          display: "flex",
          alignContent: "center",
          position: "relative",
          zIndex: 3,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(15px)",
          width: "400px",
          height: "400px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "1rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Container maxWidth="sm" sx={{}}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: "#FFFF",
                  textAlign: "left",
                  fontWeight: "bold",
                  fontFamily: "Roboto, sans-serif",
                  justifyContent: "center",
                }}
              >
                {" "}
                Login to AutoRadar
              </Typography>

              <br />
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <motion.div
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
                      onChange={handleEmailChange}
                      id="filled-adornment-email"
                      type="email"
                      placeholder={`Enter Email`}
                      label
                    />
                  </motion.div>
                </Grid>
                <Grid item xs={12}>
                  <motion.div
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
                      onChange={handlePasswordChange}
                      id="filled-adornment-password"
                      type={showPassword ? "text" : "password"}
                      placeholder={`Enter Password`}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            sx={{ color: "grey" }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </motion.div>
                </Grid>
                <Grid item xs={12}>
                  <br />
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <CustomButton
                      variant="contained"
                      color="primary"
                      onClick={handleLogin}
                    >
                      Login
                    </CustomButton>
                  </motion.div>
                </Grid>
                <Grid item xs={12}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Button
                      variant="outlined"
                      onClick={handleSignupClick}
                      sx={{
                        borderColor: "#7F27FF",
                        color: "#7F27FF",
                        width: { sm: 250, md: 350 },
                      }}
                    >
                      Sign Up
                    </Button>
                  </motion.div>
                </Grid>
                {error && (
                  <Grid item xs={12}>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      <Typography variant="body2" sx={{ color: "red" }}>
                        {error}
                      </Typography>
                    </motion.div>
                  </Grid>
                )}
              </Grid>
            </motion.div>
          </Container>
        </motion.div>
      </Box>
    </Box>
  );
};

export default LoginPage;
