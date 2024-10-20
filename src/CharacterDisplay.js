import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CharacterDisplay.css';
import Header from './Header';

function CharacterDisplay() {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [characters, setCharacters] = useState([]); // Ensure characters is an array by default
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

        // Check if the fetched data contains an array in the 'data' field
        if (Array.isArray(data.data)) {
          setCharacters(data.data); // Set the fetched data to the state
          console.log('Characters:', data.data); // Log the characters to see if they're correctly set
        } else {
          throw new Error('Fetched data is not an array');
        }
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
              onClick={() => handleSelectCharacter(character)} // Handle selection
            >
              <img src={`path_to_images/${character.image_ids[0]}.png`} alt={character.character_name} /> {/* Use the first image ID */}
              <p>{character.character_name}</p>
            </div>
          ))
        ) : (
          <p style={{ color: 'white' }}>No characters found</p>
        )}
      </div>

      {selectedCharacter && (
        <div className="character-details">
          <h3>{selectedCharacter.character_name}</h3>
          <img src={`path_to_images/${selectedCharacter.image_ids[0]}.png`} alt={selectedCharacter.character_name} />
          <div>
          <button className="navigate-button" onClick={() => navigate('/gameboard')}>
            Go to Game
          </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterDisplay;
