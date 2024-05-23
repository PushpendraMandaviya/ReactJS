import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DarkModeProvider } from './Context/DarkModeContext';
import store from './Redux/Store';
import { Provider } from'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
  <DarkModeProvider>
    <App />
  </DarkModeProvider>
  </Provider>
  </React.StrictMode>
);