import React from "react";
import Home from "./Home";
import Login from "./Login";
import { useState } from "react";
import {Link} from 'react-router-dom';
import PlantList from "../PlantList";
import PlantDetails from "../PlantDetails";
import Contact from "./Contact";
import ForgotPassword from "./ForgotPassword";

function Menu({ isOpen, menuSlide }) {
  return (
    <>
      {!isOpen && (
        <button className="menu-button" onClick={menuSlide}>
          ☰ Menu
        </button>
      )}

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="item">
          <Link to="/Home" onClick={menuSlide}>Home</Link>
        </div>
        <div className="item">
          <Link to="/Login" onClick={menuSlide}>Login</Link>
        </div>
        <div className="item">
          <Link to="/About" onClick={menuSlide}>About</Link>
        </div>
        <div className="item">
          <Link to="/Contact" onClick={menuSlide}>Contact</Link>
        </div>

        <button className="close-button" onClick={menuSlide}>
          Close
        </button>
      </div>
    </>
  );
}

export default Menu;
