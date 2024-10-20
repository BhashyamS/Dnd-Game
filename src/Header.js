// src/Header.js
import React from 'react';
import './Header.css'; // Make sure you have this CSS file

const Header = ({ username }) => {
  return (
    <header className="header">
      <div className="logo">
        <h1>LoreKroft</h1>
      </div>
    </header>
  );
};

export default Header;
