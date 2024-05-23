import { Dialog, Paper, Typography, Divider, TextField, IconButton, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

import React, { useState, useEffect } from "react";
import { DarkModeContext } from '../../Context/DarkModeContext';

const ChatBox = ({ open, onClose, name }) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [profileImage, setProfileImage] = useState('');
  const {isDarkMode, toggleDarkMode} = React.useContext(DarkModeContext)


  useEffect(() => {
    // Fetch profile image from Unsplash API
    fetch('https://source.unsplash.com/random/200x200/?profile')
      .then(response => {
        setProfileImage(response.url);
      })
      .catch(error => {
        console.error('Error fetching profile image:', error);
      });
  }, []);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newMessages = [...chatMessages, { sender: 'You', message: message }];
      setChatMessages(newMessages);
      setMessage('');

      // Add demo message from seller after a delay
      setTimeout(() => {
        const demoMessage = `Hello there. Greetings from ${name}. Tell me how can i help you?`;
        setChatMessages([...newMessages, { sender: name, message: demoMessage }]);
      }, 1000); // Change delay time as needed
    }
  };

  return (
   <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" sx={ { height:'100vh',backdropFilter:'blur(3px)'}}>
      <Paper elevation={3} sx={{ width:'57rem',height: '60vh', borderRadius: '0', backgroundColor: isDarkMode ? '#121212' : '#f0f0f0' }}>
        {/* Chat header with profile picture */}
        <Grid container alignItems="center" justifyContent="space-between" sx={{ backgroundColor: '#0077b6', padding: '10px', borderBottom: '1px solid #e0e0e0', position:'sticky' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={profileImage} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
            <Typography variant="h6" sx={{ color: '#fff' }}>{name}</Typography>  
          </div>
          {/* Close button */}
          <IconButton onClick={onClose}>
            <CloseIcon sx={{marginRight:'1rem',color:'#fff'}}/>
          </IconButton>
        </Grid>
        {/* Chat messages */}
        <div style={{ backgroundColor: isDarkMode ? '#212121' : '#fff', height: 'calc(100% - 100px)', overflowY: 'auto', overflowX:'hidden', padding: '10px' }}>
          {chatMessages.map((chat, index) => (
            <div key={index} style={{ textAlign: chat.sender === 'You' ? 'right' : 'left', marginBottom: '10px' }}>
              <Typography variant="body1" sx={{ padding: '5px', borderRadius: '10px', color: chat.sender === 'You' ? '#fff' : '#000', backgroundColor: chat.sender === 'You' ? '#7F27FF' : '#f0f0f0' }}>
                {chat.message}
              </Typography>
            </div>
          ))}
        </div>
        {/* Chat input */}
        <Divider />
        <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: '10px', position:'fixed',width:'900px', backgroundColor: '#0077b6',  }}>
        <TextField
          fullWidth
          variant="standard"
          color="secondary"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            '& input': {
              color: isDarkMode ? '#fff' : '#000',
              backgroundColor: isDarkMode ? '#212121' : '#fff',
              borderRadius: '5px',
              padding: '10px'
            },
          }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSendMessage} sx={{ color: '#fff' }}>
                <SendIcon />
              </IconButton>
            ),
          }}
        />
        </Grid>
      </Paper>
    </Dialog>
  );
};

export default ChatBox;
