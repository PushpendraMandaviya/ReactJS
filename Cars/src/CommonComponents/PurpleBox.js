import React from 'react';
import { Box } from '@mui/material';

const PurpleBox = () => {
  return (
    <Box
      sx={{
        position:'relative',
        zIndex:2,
        backgroundColor: 'rgba(75, 0, 130, 0.5)',   
        backdropFilter: 'blur(10px)', // Transparent dark purple color
        width: '500px',
        height: '300px',
        margin: 'auto',
        marginTop: '50px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Adding a shadow for depth
      }}
    ></Box>
  );
};

export default PurpleBox;