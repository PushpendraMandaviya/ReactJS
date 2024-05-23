import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../Context/DarkModeContext';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {useSelector, useDispatch} from 'react-redux'
import { logoutUser } from '../Redux/Slices/UserSlice';

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const {isDarkMode, toggleDarkMode} = React.useContext(DarkModeContext)
  const {user} = useSelector((state)=>state.user)
  const pages = [`${user.name}`, 'Sell Car', 'AutoRadar', 'Cars', 'Logout'];
  const dispatch = useDispatch();
  console.log("User from navbar", user)
  
  const handleClick = (page) => {
    if (page === 'Logout') {
      const confirmed = window.confirm('Are you sure you want to logout?');
      if (confirmed) {
        dispatch(logoutUser());
        navigate('/login');
      }
    }
  
    if (page === `${user.name}`) {
      navigate('/profile');
    }
  
    if (page === 'AutoRadar') {
      navigate('/home');
    }
  
    if (page === 'Cars') {
      navigate('/cars');
    }
  
    if (page === 'Sell Car') {
      navigate('/sellcar');
    }
  };
  
  
  return (
    <AppBar position="static" sx={{ boxShadow:'none',backgroundColor: isDarkMode ? 'black' : 'white' }}>
      <Toolbar disableGutters>
        <Box
          sx={{
            backgroundColor: isDarkMode ? 'black' : 'white',
            color: isDarkMode ? 'white' : 'black',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '2.5rem',
            gap: 7 // Set width to 100% for full width
          }}
        >
        
          {pages.map((page) => (
            <Button
              key={page}
              onClick={() => handleClick(page)}
              sx={{
                mx: 2,
                color: isDarkMode ? 'white' : 'black',
                fontSize: page === 'AutoRadar' ? '1.8rem' : '1rem',
                fontFamily: 'Roboto, sans-serif',
                textTransform: 'capitalize',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: isDarkMode ? 'white' : '#7F27FF',
                  color: isDarkMode ? 'black' : 'white'
                }
              }}
            >
              {page}
            </Button>
          ))}
          <IconButton onClick={toggleDarkMode} color="inherit" sx={{ position: 'fixed', right: 20, ml: 1 }}>
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;