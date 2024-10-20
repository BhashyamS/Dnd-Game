import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import './GameBoard.css'; 
import Header from './Header';

function GameBoard() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the passed character data
  const { selectedCharacter } = location.state || {}; // Extract the selected character

  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [diceRoll, setDiceRoll] = useState(null);

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser. Please use Chrome.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setText(voiceText);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
      alert('An error occurred during speech recognition.');
    };

    recognition.start();
  };

  const handleSubmit = () => {
    alert(`Submitted text: ${text}`);
  };

  const handleDiceRoll = () => {
    const roll = Math.floor(Math.random() * 20) + 1;
    setDiceRoll(roll);
  };

  return (
    <div className="gameboard-container">
      <Header />

      <div className="top-section">
        <img src="image1.png" alt="Image 1" />
        <img src="image2.png" alt="Image 2" />
        <img src="image3.png" alt="Image 3" />
        <img src="image4.png" alt="Image 4" />
        <button className="map-button" onClick={() => navigate('/map')}>
          🗺️
        </button>
      </div>

      <div className="main-content">
        <div className="character-enemy-section">
          {/* Character Card */}
          <div className="character-card">
            <h3>Character Card</h3>
            {selectedCharacter ? (
              <>
                <img src={`path_to_images/${selectedCharacter.image_ids[0]}.png`} alt={selectedCharacter.character_name} />
                <p>Character: {selectedCharacter.character_name}</p>
                <p>Strength: {selectedCharacter.Attributes?.Strength || 'N/A'}</p>
                <p>Agility: {selectedCharacter.Attributes?.Agility || 'N/A'}</p>
                <p>Magic: {selectedCharacter.Attributes?.Magic || 'N/A'}</p>
                <p>Physical Defense: {selectedCharacter.Defense?.['Physical Defense'] || 'N/A'}</p>
                <p>Magical Defense: {selectedCharacter.Defense?.['Magical Defense'] || 'N/A'}</p>
              </>
            ) : (
              <p>No character selected</p>
            )}
          </div>

          {/* Enemy Card */}
          <div className="enemy-card">
            <h3>Enemy Card</h3>
            <img src="enemy_image.png" alt="Enemy" />
            <p>HP: 120</p>
            <p>Attack: 60</p>
          </div>
        </div>

        <div className="prompt-section">
          <h3>Dungeon Master:</h3>
          <textarea
            placeholder="Type here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <div className="button-group">
            <button className={`mic-button ${isRecording ? 'recording' : ''}`} onClick={handleVoiceInput} disabled={isRecording}>
              {isRecording ? 'Recording...' : '🎤'}
            </button>

            <button className="submit-button" onClick={handleSubmit}>Submit</button>

            <div className="dice-roll-section">
              <button className="dice-button" onClick={handleDiceRoll}>
                🎲 Roll Dice
              </button>
              {diceRoll !== null && <p>You rolled: {diceRoll}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameBoard;
