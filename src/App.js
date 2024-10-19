import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css'; 
import CharacterDisplay from './CharacterDisplay';
import GameBoard from './GameBoard';
import Map from './Map';
import Header from './Header';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <h1>Welcome to the World of Wonder</h1>
        <p>Dungeons and Dragons?</p>
        <button className="navigate-button" onClick={() => navigate('/CharacterDisplay')}>
          Start Game
        </button>
      </header>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/CharacterDisplay" element={<CharacterDisplay />} />
        <Route path="/gameboard" element={<GameBoard />} />
        <Route path="/map" element={<Map />} />
        <Route path="/header" element={<Header />}/>
        
      </Routes>
    </Router>
  );
}
