import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CharacterDisplay.css';
import Header from './Header';

function CharacterDisplay() {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data from the external API on component load
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('http://54.67.37.79:8000/test'); // Your external URL here
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCharacters(data); // Set the fetched data to the state
      } catch (error) {
        console.error('Error fetching characters:', error);
        setError(error.message);
      }
    };

    fetchCharacters();
  }, []); // The empty array makes sure this runs only once, after the component mounts

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character); // Store the selected character's details
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter characters based on the search term
  const filteredCharacters = characters.filter(
    (character) => character.image && character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="character-display-container">
      <Header />
      <h2 className="title">Choose Your Character</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Character Grid */}
      <div className="character-grid">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character) => (
            <div
              key={character._id}
              className={`character-card ${selectedCharacter?._id === character._id ? 'selected' : ''}`}
              onClick={() => handleSelectCharacter(character)} // Handle selection
            >
              <img src={character.image} alt={character.name} /> {/* Use the image URL directly */}
              <p>{character.name}</p>
            </div>
          ))
        ) : (
          <p style={{ color: 'white' }}>No characters found</p>
        )}
      </div>

      {selectedCharacter && (
        <div className="character-details">
          <h3>{selectedCharacter.name}</h3>
          <img src={selectedCharacter.image} alt={selectedCharacter.name} />
          <button className="navigate-button" onClick={() => navigate('/gameboard')}>
            Go to Game
          </button>
        </div>
      )}
    </div>
  );
}

export default CharacterDisplay;
