import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import ProtectedRoute from './ProtectedRoute.js';
import LoginPage from '../Components/Auth/LoginPage.js';
import Cars from '../Components/ShowCaseCars/Cars.js';
import UserProfilePage from '../Components/Profile/ProfilePage.js';
  import SignUp from '../Components/Auth/SignUp.js';
  import NavBar from '../CommonComponents/NavBar.js';
  import '../App.css';
  import HomePage from '../Components/HomePage/HomePage.js'
import BuyCarPage from '../Components/ShowCaseCars/CarDetailsPage.js';
import SellCarForm from '../Components/SellCar/SellCarForm.js';
import { DarkModeContext } from '../Context/DarkModeContext.js';

function RouteFile() {
    const {isDarkMode, toggleDarkMode} = useContext(DarkModeContext)
    return (
      <>
      <div className="App" style={{backgroundColor: isDarkMode ? 'black' : 'white'}}>
        <Router>
          <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<><NavBar /><HomePage /></>} /> 
            <Route path='/signup' element={<SignUp />} />
            <Route path='/cars' element={<><NavBar /><Cars /></>} />
            <Route path='/cars/:id' element={<><NavBar /><BuyCarPage /></>} />
            <Route path='/sellcar' element={<><NavBar /><SellCarForm /></>} />
            <Route path='profile' element={<><NavBar /><UserProfilePage /></>} /> 
            </Route>
          </Routes>
        </Router>
      </div>
      </>
    );
}

export default RouteFile

