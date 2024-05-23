import React from 'react';
import { Box, Typography } from '@mui/material';

function FeaturesBox({ isDarkMode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '2rem', textAlign: 'left' }}>
      <Box className="feature-box" sx={{ border: `2px solid ${isDarkMode ? 'white' : '#7F27FF'}`, width: '25vw', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s', backgroundColor: isDarkMode ? '#191919' : '#F5EEE6' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
        <Typography variant='h4' sx={{ color: isDarkMode ? 'white' : '#7F27FF' }}>01</Typography>
        <Typography variant='h4' sx={{ color: isDarkMode ? 'white' : 'black' }}>Premium Selection</Typography>
        <br />
        <Typography variant='h6' sx={{ color: isDarkMode ? 'lightgrey' : 'black' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Typography>
      </Box>

      <Box className="feature-box" sx={{ backgroundColor: isDarkMode ? '#191919' : '#F5EEE6', border: `2px solid ${isDarkMode ? 'white' : '#7F27FF'}`, width: '25vw', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
        <Typography variant='h4' sx={{ color: isDarkMode ? 'white' : '#7F27FF' }}>02</Typography>
        <Typography variant='h4' sx={{ color: isDarkMode ? 'white' : 'black' }}>Exclusive Service</Typography>
        <br />
        <Typography variant='h6' sx={{ color: isDarkMode ? 'lightgrey' : 'black' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Typography>
      </Box>

      <Box className="feature-box" sx={{ backgroundColor: isDarkMode ? '#191919' : '#F5EEE6', border: `2px solid ${isDarkMode ? 'white' : '#7F27FF'}`, width: '25vw', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
        <Typography variant='h4' sx={{ color: isDarkMode ? 'white' : '#7F27FF' }}>03</Typography>
        <Typography variant='h4' sx={{ color: isDarkMode ? 'white' : 'black' }}>Swift & Secure</Typography>
        <br />
        <Typography variant='h6' sx={{ color: isDarkMode ? 'lightgrey' : 'black' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Typography>
      </Box>
    </div>
  );
}

export default FeaturesBox;
