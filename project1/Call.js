import logo from './florahub.png';                     
import React, { useState } from 'react'
import Profile from './Profile';
import Login from './Login';
import Menu from './Menu';
import Home from './Home';
import PlantList from '../PlantList';
import PlantDetails from '../PlantDetails';
import ForgotPassword from "./ForgotPassword";
function Call() {
  
        return(
          <div>
                    <div className="home" style={{right:'-150'}}>
                    <img className='img' src={logo} width='100px'/>
                    <h2 style={{fontFamily:" 'Dancing Script', cursive",fontSize: "32px",color:"rgb(21, 107, 26)", fontWeight: "600"}}>Where Nature Lives Indoors</h2>
                       </div>
          </div>
        );
}
export default Call;