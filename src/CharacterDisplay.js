import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CharacterDisplay.css';
import Header from './Header';

const characters = [
  { id: 1, name: 'Character 1', image: 'image1.png', stats: 'HP: 100, Attack: 50' },
  { id: 2, name: 'Character 2', image: 'image2.png', stats: 'HP: 120, Attack: 40' },
  { id: 3, name: 'Character 3', image: 'image3.png', stats: 'HP: 80, Attack: 60' },
  { id: 4, name: 'Character 4', image: 'image4.png', stats: 'HP: 110, Attack: 55' },
  { id: 5, name: 'Character 5', image: 'image5.png', stats: 'HP: 90, Attack: 70' },
  { id: 6, name: 'Character 6', image: 'image6.png', stats: 'HP: 150, Attack: 45' },
  { id: 7, name: 'Character 7', image: 'image7.png', stats: 'HP: 200, Attack: 35' },
  { id: 8, name: 'Character 8', image: 'image8.png', stats: 'HP: 95, Attack: 65' },
  { id: 9, name: 'Character 9', image: 'image9.png', stats: 'HP: 140, Attack: 30' },
  { id: 10, name: 'Character 10', image: 'image10.png', stats: 'HP: 130, Attack: 55' },
];

function CharacterDisplay() {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Track the selected character
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character); // Store the selected character's details
  };

    // Function to handle search input change
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    // Filter characters based on the search term
    const filteredCharacters = characters.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
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
              key={character.id}
              className={`character-card ${selectedCharacter?.id === character.id ? 'selected' : ''}`}
              onClick={() => handleSelectCharacter(character)} // Handle selection
            >
              <img src={character.image} alt={character.name} />
              <p>{character.name}</p>
            </div>
          ))
        ) : (
          <p style={{ color: 'white' }}>No characters found</p> // Show a message when no characters match the search
        )}
      </div>

      {/* Show selected character details */}
      {selectedCharacter && (
        <div className="character-details">
          <h3>{selectedCharacter.name}</h3>
          <img src={selectedCharacter.image} alt={selectedCharacter.name} />
          <p>{selectedCharacter.stats}</p>
          <button className="navigate-button" onClick={() => navigate('/gameboard')}>
            Go to Game
          </button>
        </div>
      )}
    </div>
  );
}

export default CharacterDisplay;
