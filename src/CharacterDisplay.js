import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CharacterDisplay.css'; // Add styling for background image
import Header from './Header';

function CharacterDisplay() {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('http://54.67.37.79:8000/test');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (Array.isArray(data.data)) {
          setCharacters(data.data);
        } else {
          throw new Error('Fetched data is not an array');
        }
      } catch (error) {
        console.error('Error fetching characters:', error);
        setError(error.message);
      }
    };

    fetchCharacters();
  }, []);

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCharacters = characters.filter(
    (character) =>
      character.image_ids && character.character_name.toLowerCase().includes(searchTerm.toLowerCase())
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
              key={character._id.$oid}
              className={`character-card ${selectedCharacter?._id.$oid === character._id.$oid ? 'selected' : ''}`}
              onClick={() => handleSelectCharacter(character)}
            >
            <img
              src={`http://54.67.37.79:8000/static/src/${character.image_ids[0]}.png`}  
              alt={character.character_name} />
              <p>{character.character_name}</p>
            </div>
          ))
        ) : (
          <p style={{ color: 'white' }}>No characters found</p>
        )}
      </div>

      {selectedCharacter && (
        <div className="character-details">
          <img src="/public/characterSheet.png" alt="D&D Sheet Background" className="character-background" /> {/* Use the D&D sheet image */}
          <div className="character-stats">
            <h3>{selectedCharacter.character_name}</h3>
            <p>Strength: {selectedCharacter.Attributes?.Strength || 'N/A'}</p>
            <p>Agility: {selectedCharacter.Attributes?.Agility || 'N/A'}</p>
            <p>Magic: {selectedCharacter.Attributes?.Magic || 'N/A'}</p>
            <p>Physical Defense: {selectedCharacter.Defense?.['Physical Defense'] || 'N/A'}</p>
            <p>Magical Defense: {selectedCharacter.Defense?.['Magical Defense'] || 'N/A'}</p>
            <button
              className="navigate-button"
              onClick={() => navigate('/gameboard', { state: { selectedCharacter } })}
            >
              Go to Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterDisplay;
