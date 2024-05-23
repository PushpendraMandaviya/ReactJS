import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Avatar,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  IconButton,
  Button,
  Snackbar,
  Divider,
} from "@mui/material";
import { DarkModeContext } from "../../Context/DarkModeContext";
import { ArrowBackIos, ArrowForwardIos, Delete } from "@mui/icons-material";
import { useSelector } from "react-redux";
import useRandomCars from "../../CustomHooks/UseRandomCars";
import { Link } from "react-router-dom";
import CustomButton from "../../CommonComponents/CustomButton";
import { motion } from 'framer-motion';


const UserProfilePage = () => {
  const cardWidth = 300; // Adjust the width of each card
  const {
    randomCars,
    cartItems,
    handleAddToCart,
    handleRemoveFromCart,
    scrollRef,
    scrollTo,
  } = useRandomCars(cardWidth);
  const { user } = useSelector((state) => state.user);
  const { isDarkMode } = React.useContext(DarkModeContext);
  const [sellerCars, setSellerCars] = useState([]);
  useEffect(() => {
    const fetchSellerCars = async () => {
      try {
        const response = await axios.get("http://localhost:8080/cars");
        const sellerCars = response.data.filter(
          (car) => car.seller.name === user.name
        );
        setSellerCars(sellerCars);
      } catch (error) {
        console.error("Error fetching seller cars:", error);
      }
    };

    fetchSellerCars();
  }, [user.name]);

  const handleRemoveFromSale = async (carId) => {
    try {
      await axios.delete(`http://localhost:8080/cars/${carId}`);
      const updatedSellerCars = sellerCars.filter((car) => car.id !== carId);
      setSellerCars(updatedSellerCars);
    } catch (error) {
      console.error("Error removing car from sale:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.1 }}
    >
    <Box
      p={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: isDarkMode ? "#000" : "#fff",
        color: isDarkMode ? "#FFFFFF" : "#000000",
      }}
    >
        <Box sx={{ width: "80%", maxWidth: "1200px", marginTop: "2rem" }}>
          {/* User Profile Section */}
          <Box sx={{ marginBottom: "4rem" }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <Avatar
                  alt="User Profile"
                  src={"https://source.unsplash.com/random"}
                  sx={{ width: 100, height: 100 }}
                />
              </Grid>
              <Grid item>
                <Typography variant="h5">{user.name}</Typography>
                <Typography variant="subtitle1">{user.email}</Typography>
              </Grid>
            </Grid>
          </Box>
          {/* Divider */}
          <Divider
            sx={{ my: 4, backgroundColor: isDarkMode ? "grey" : "grey" }}
          />
          {/* Cart Section */}
          <Box sx={{ marginBottom: "4rem" }}>
            <Typography variant="h5" mb={2}>
              Your Cart:
            </Typography>
            <Grid container spacing={3}>
              {cartItems.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      width: "100%",
                      backgroundColor: isDarkMode ? "#212121" : "#F5EEE6",
                      color: isDarkMode ? "#FFFFFF" : "#000000",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.image}
                      alt={item.name}
                    />
                    <CardContent>
                      <Typography variant="subtitle1">{item.brand}</Typography>
                      <Typography variant="h6" gutterBottom>
                        Model: {item.model}
                      </Typography>
                      <Typography gutterBottom>Year: {item.year}</Typography>
                      <Typography gutterBottom>Price: ${item.price}</Typography>
                      <div
                        style={{
                          height: "7.5rem",
                          overflowY: "auto",
                          paddingRight: "5px",
                          scrollbarWidth: "thin",
                          scrollbarColor: isDarkMode
                            ? "white #383838"
                            : "white rgb(383838245, 238, 230)",
                          marginBottom: "2rem",
                        }}
                      >
                        <Typography gutterBottom>
                          Description: {item.description}
                        </Typography>
                      </div>
                      <center>
                        <CustomButton>Purchase Car</CustomButton>
                      </center>
                    </CardContent>
                    <Button
                      onClick={() => handleRemoveFromCart(item.id)}
                      variant="contained"
                      sx={{ backgroundColor: "#FF6B6B", mt: 2, width: "100%" }}
                    >
                      Remove from Cart
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Divider */}
          <Divider
            sx={{ my: 4, backgroundColor: isDarkMode ? "grey" : "grey" }}
          />

          {/* Seller Cars Section */}
          <Box>
            <Typography variant="h5" mb={2}>
              Your Cars for Sale:
            </Typography>
            <Grid container spacing={3}>
              {sellerCars.map((car) => (
                <Grid item key={car.id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      width: "100%",
                      backgroundColor: isDarkMode ? "#212121" : "#F5EEE6",
                      color: isDarkMode ? "#FFFFFF" : "#000000",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={
                        car.image
                          ? car.image
                          : `https://source.unsplash.com/200x200/?car/?${car.brand}`
                      }
                      alt={car.name}
                    />
                    <CardContent>
                      <Typography variant="subtitle1">{car.brand}</Typography>
                      <Typography variant="h6" gutterBottom>
                        Model: {car.model}
                      </Typography>
                      <Typography gutterBottom>Year: {car.year}</Typography>
                      <Typography gutterBottom>Price: ${car.price}</Typography>
                      <div
                        style={{
                          height: "7.5rem",
                          overflowY: "auto",
                          paddingRight: "5px",
                          scrollbarWidth: "thin",
                          scrollbarColor: isDarkMode
                            ? "white #383838"
                            : "white rgb(383838245, 238, 230)",
                          marginBottom: "2rem",
                        }}
                      >
                        <Typography gutterBottom>
                          Description: {car.description}
                        </Typography>
                      </div>
                    </CardContent>
                    <Button
                      onClick={() => handleRemoveFromSale(car.id)}
                      variant="contained"
                      sx={{ backgroundColor: "#FF6B6B", mt: 2, width: "100%" }}
                    >
                      Remove from Sale
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Divider */}
          <Divider
            sx={{ my: 4, backgroundColor: isDarkMode ? "grey" : "grey" }}
          />

          {/* Cars Section */}
          <Box>
            <Typography variant="h5" mb={2}>
              Cars you might like:
            </Typography>
            <Box sx={{ position: "relative", overflowX: "hidden" }}>
              <IconButton
                sx={{
                  backgroundColor: isDarkMode
                    ? "rgba(255, 255, 255, 0.5)"
                    : "rgba(0, 0, 0, 0.5)",
                  color: isDarkMode ? "#000" : "#FFF",
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 1,
                }}
                onClick={() =>
                  scrollRef.current.scrollBy({
                    left: -cardWidth * 4,
                    behavior: "smooth",
                  })
                }
              >
                <ArrowBackIos />
              </IconButton>
              <Box
                sx={{
                  display: "flex",
                  overflowX: "scroll",
                  gap: 2,
                  scrollbarWidth: "none",
                  "-ms-overflow-style": "none",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
                ref={scrollRef}
              >
                {randomCars.map((car) => (
                  <Card
                    key={car.id}
                    sx={{
                      height: "80vh",
                      width: cardWidth,
                      flex: "0 0 auto",
                      marginRight: 2,
                      backgroundColor: isDarkMode ? "#212121" : "#F5EEE6",
                      color: isDarkMode ? "#FFFFFF" : "#000000",
                      position: "relative",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={car.image}
                      alt={car.name}
                    />
                    <CardContent>
                      <Typography variant="subtitle1">{car.brand}</Typography>
                      <Typography variant="h6" gutterBottom>
                        Model: {car.model}
                      </Typography>
                      <Typography gutterBottom>Year: {car.year}</Typography>
                      <Typography gutterBottom>Price: ${car.price}</Typography>
                      <div
                        style={{
                          height: "7.5rem",
                          overflowY: "auto",
                          paddingRight: "5px",
                          scrollbarWidth: "thin",
                          scrollbarColor: isDarkMode
                            ? "white #383838"
                            : "white rgb(383838245, 238, 230)",
                        }}
                      >
                        <Typography gutterBottom>
                          Description: {car.description}
                        </Typography>
                      </div>
                    </CardContent>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 2,
                        gap: 10,
                      }}
                    >
                      <Link to={`/cars/${car.id}`}>
                        <CustomButton>Show Details</CustomButton>
                      </Link>
                      {cartItems.find((item) => item.id === car.id) ? (
                        <Button
                          onClick={() => handleRemoveFromCart(car.id)}
                          variant="contained"
                          sx={{
                            marginTop: "1rem",
                            backgroundColor: "#FF6B6B",
                            width: "100%",
                          }}
                        >
                          Remove from Cart
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleAddToCart(car)}
                          variant="contained"
                          sx={{
                            marginTop: "1rem",
                            backgroundColor: "#7F27FF",
                            width: "100%",
                          }}
                        >
                          Add to Cart
                        </Button>
                      )}
                    </Box>
                  </Card>
                ))}
              </Box>
              <IconButton
                sx={{
                  backgroundColor: isDarkMode
                    ? "rgba(255, 255, 255, 0.5)"
                    : "rgba(0, 0, 0, 0.5)",
                  color: isDarkMode ? "#000" : "#FFF",
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 1,
                }}
                onClick={() =>
                  scrollRef.current.scrollBy({
                    left: cardWidth * 4,
                    behavior: "smooth",
                  })
                }
              >
                <ArrowForwardIos />
              </IconButton>
            </Box>
          </Box>
        </Box>
    </Box>
      </motion.div>
  );
};

export default UserProfilePage;
