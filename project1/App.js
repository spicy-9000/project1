import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { useState } from "react";
import Menu from "./project1/Menu";
import Home from "./project1/Home";
import Login from "./project1/Login";
import Contact from "./project1/Contact";
import ForgotPassword from "./project1/ForgotPassword";
import Call from "./project1/Call"; // Optional layout or header
import About from './project1/About';
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const menuSlide = () => setIsOpen(!isOpen);

  return (
    <BrowserRouter>
      <Call /> {/* This is your header (logo + search) */}
      <Menu isOpen={isOpen} menuSlide={menuSlide} />

      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />

        <Route path="/Home" element={<Home/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Contact" element={<Contact/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
