import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import './Map.css'; // Import the styling
import Header from './Header';

function Map() {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="map-container">
      <Header />
      {/* Button to redirect to Game */}
      <button
        className="go-game-button"
        onClick={() => navigate('/gameboard')} // Change this route as needed
      >
        Go to Game
      </button>
    </div>
  );
}

export default Map;
