import React from 'react';
import { Button, useTheme } from '@mui/material';

const CustomButton = ({ children, width = '100%', ...props }) => {
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#7F27FF',
        mt: 'auto',
        width,
        '&:hover': {
          backgroundColor: '#4B0082',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
