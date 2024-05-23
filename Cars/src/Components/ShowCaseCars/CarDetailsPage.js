import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Card, Typography, Button, CardContent } from "@mui/material";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Event, AttachMoney, EmojiTransportation, Cancel, Commute, Build, LocalGasStation, Person, History, CheckCircle } from "@mui/icons-material";
import ChatBox from "../ChatBox/ChatBox";
import { DarkModeContext } from "../../Context/DarkModeContext";
import CustomButton from "../../CommonComponents/CustomButton";
import useAddToCart from "../../CustomHooks/UseAddToCart";
import useRandomCars from '../../CustomHooks/UseRandomCars';

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const apiUrl = `http://localhost:8080/cars/${id}`;
  const { isDarkMode, toggleDarkMode } = React.useContext(DarkModeContext);
  const cardWidth = 300; // Adjust the width of each card
  const { randomCars, cartItems, handleAddToCart, handleRemoveFromCart, scrollRef, scrollTo } = useRandomCars(cardWidth);
  const [showChatBox, setShowChatBox] = useState(false);
  const [contacted, setContacted] = useState(false);

  const handleContactSeller = () => {
    setShowChatBox(true);
    setContacted(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchData();
  }, [apiUrl]);


  if (!car) {
    return (
      <div style={{ color: "black", textAlign: "center", marginTop: "2rem" }}>
        Loading...
      </div>
    );
  }
    
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <>
      <Box sx={{display:'flex',justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h4"
          sx={{float:'left', fontWeight: "bold", marginLeft: "2rem", marginTop: "1rem", color: isDarkMode ? 'white' : 'black' }}
        >
          {car.brand} {car.model}
        </Typography>
    <Box sx={{marginRight:'2rem'}}>

    {cartItems.find((item) => item.id === car.id) ? (
                  <Button onClick={() => handleRemoveFromCart(car.id)} variant="contained" sx={{marginTop:'1rem', backgroundColor: '#FF6B6B', width: '100%' }}>
                    Remove from Cart
                  </Button>
                ) : (
                  <Button onClick={() => handleAddToCart(car)} variant="contained" sx={{marginTop:'1rem', backgroundColor: '#7F27FF', width: '100%' }}>
                    Add to Cart
                  </Button>
                )}
    </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.8)" : "#fff",
            color: isDarkMode ? 'white' : 'black',
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            display: "flex",
            gap: 5,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <Card
              sx={{
                backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
                color: isDarkMode ? "#FFFFFF" : "#000000",
                borderRadius: "10px",
                border:'none',
                boxShadow: isDarkMode ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
                height: "50vh",
                width: "40vw",
              }}
            >
              <CardContent>
                <motion.img
                  src={
                    car.image
                      ? car.image
                      : "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={car.Brand}
                  style={{ width: "100%", height: "46vh", borderRadius: "10px" }}
                  whileHover={{ scale: 1.1 }}
                />
              </CardContent>
            </Card>
            {/* {/ Description /} */}
            <Box
              sx={{
                p: 2,
                backgroundColor: isDarkMode ? "#212121" : "#F5EEE6",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                width: "38vw",
                height: 'auto'
              }}
            >
              <List>
                <ListItem>
                  <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                    Description
                  </Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ color: 'grey' }}>
                    <EmojiTransportation />
                  </ListItemIcon>
                  <ListItemText primary={`${car.description}`} />
                </ListItem>
              </List>
            </Box>
          </Box>
          {/* {/ Car Details /} */}
          <Box
            sx={{
              p: 3,
              backgroundColor: isDarkMode ? "#212121" : "#F5EEE6",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              width: "30vw",
              height: "100%",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              Car Details
            </Typography>
            <List sx={{ width: "100%" }}>
              <ListItem>
                <ListItemIcon sx={{ color: 'grey' }}>
                  <Event />
                </ListItemIcon>
                <ListItemText
 primary={`Year: ${car.year}`} />
 </ListItem>
 <ListItem>
   <ListItemIcon sx={{ color: 'grey' }}>
     <AttachMoney />
   </ListItemIcon>
   <ListItemText primary={`Price: $${car.price}`} />
 </ListItem>
 <ListItem>
   <ListItemIcon sx={{ color: 'grey' }}>
     <Cancel />
   </ListItemIcon>
   <ListItemText primary={`Defects: ${car.defects}`} />
 </ListItem>
 <ListItem>
   <ListItemIcon sx={{ color: 'grey' }}>
     <Commute />
   </ListItemIcon>
   <ListItemText primary={`Kilometers: ${car.kilometers}`} />
 </ListItem>
 <ListItem>
   <ListItemIcon sx={{ color: 'grey' }}>
     <Build />
   </ListItemIcon>
   <ListItemText primary={`Car Type: ${car.cartype}`} />
 </ListItem>
 <ListItem>
   <ListItemIcon sx={{ color: 'grey' }}>
     <LocalGasStation />
   </ListItemIcon>
   <ListItemText primary={`Fuel Type: ${car.fuelType}`} />
 </ListItem>
 <ListItem>
   <ListItemIcon sx={{ color: 'grey' }}>
     <Person />
   </ListItemIcon>
   <ListItemText
     primary={`Number of Owners: ${car.numberOfOwners}`}
   />
 </ListItem>
 <ListItem>
   <ListItemIcon sx={{ color: 'grey' }}>
     <Build />
   </ListItemIcon>
   <ListItemText primary={`Engine: ${car.engine}`} />
 </ListItem>
 <ListItem>
   <ListItemIcon sx={{ color: 'grey' }}>
     <Commute />
   </ListItemIcon>
   <ListItemText primary={`Transmission: ${car.transmission}`} />
 </ListItem>
 <ListItem>
   <ListItemIcon sx={{ color: 'grey' }}>
     <History />
   </ListItemIcon>
   <ListItemText
     primary={`Service History: ${car.serviceHistory}`}
   />
 </ListItem>
 <ListItem>
   <ListItemIcon sx={{ color: 'grey' }}>
     {
       car.insurance ? <CheckCircle /> : <Cancel />
     }
   </ListItemIcon>
   <ListItemText
     primary={`Insurance: ${car.insurance ? "Yes" : "No"}`}
   />
 </ListItem>
</List>
</Box>

<Box
sx={{
 flexDirection: "column",
 display: "flex",
 gap: 5,
}}
>
<Box
 sx={{
   p: 3,
   backgroundColor: isDarkMode ? "#212121" : "#F5EEE6",
   borderRadius: "10px",
   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
   width: "20vw",
 }}
>
 <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
   Features
 </Typography>
 <List
   sx={{ marginLeft: '2rem', listStyleType: 'disc', width: "100%", maxWidth: 360 }}
 >
   {car.features.map((feature, index) => (
     <ListItem key={index} sx={{ display: 'list-item' }}>
       <ListItemText primary={`${feature}`} />
     </ListItem>
   ))}
 </List>
</Box>

<Box
 sx={{
   p: 3,
   backgroundColor: isDarkMode ? "#212121" : "#F5EEE6",
   borderRadius: "10px",
   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
   width: "20vw",
 }}
>
 <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
   Seller Details
 </Typography>
 <List sx={{ width: "100%", maxWidth: 360 }}>
   <List>
     {car && car.seller && (
       <>
         <ListItem variant="h6" sx={{ fontWeight: "bold" }}>
           Name: {car.seller.name}
         </ListItem>
         <ListItem variant="h6" sx={{ fontWeight: "bold" }}>
           Location: {car.seller.location}
         </ListItem>
         <ListItem variant="h6" sx={{ fontWeight: "bold" }}>
           Email: {car.seller.email}
         </ListItem>
         <ListItem>
           <CustomButton
             variant="contained"
             onClick={handleContactSeller}
           >
             Chat With Seller
           </CustomButton>
           {showChatBox && <ChatBox open={showChatBox} onClose={() => setShowChatBox(false)} name={car.seller.name} />}
         </ListItem>
       </>
     )}
   </List>
 </List>
</Box>
</Box>
</Box>
</>
</motion.div>
);
};

export default CarDetailsPage;
