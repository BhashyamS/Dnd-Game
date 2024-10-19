import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import './GameBoard.css'; // Import the styling

function GameBoard() {
  const navigate = useNavigate(); // Initialize navigation

  const [text, setText] = useState(''); // To store the transcribed text
  const [isRecording, setIsRecording] = useState(false); // To track if recording is in progress

  // Function to handle voice input
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
      setText(voiceText); // Set the transcribed text
      setIsRecording(false); // Stop recording
    };

    recognition.onerror = () => {
      setIsRecording(false);
      alert('An error occurred during speech recognition.');
    };

    recognition.start(); // Start recording
  };

  // Function to handle form submission
  const handleSubmit = () => {
    alert(`Submitted text: ${text}`);
    // You can send the `text` to a server, save it, or perform any action here.
  };

  return (
    <div className="gameboard-container">
      {/* Top section: Row of images */}
      <div className="top-section">
        <img src="image1.png" alt="Image 1" />
        <img src="image2.png" alt="Image 2" />
        <img src="image3.png" alt="Image 3" />
        <img src="image4.png" alt="Image 4" />
        {/* Button to redirect to map.js */}
        <button
          className="map-button"
          onClick={() => navigate('/map')}
        >
          Go to Map
        </button>
      </div>

      <div className="main-content">
        {/* Character and Enemy Section */}
        <div className="character-enemy-section">
          {/* Character Card */}
          <div className="character-card">
            <h3>Character Card</h3>
            <img src="character_image.png" alt="Character" />
            <p>HP: 100</p>
            <p>Attack: 50</p>
          </div>

          {/* Enemy Card */}
          <div className="enemy-card">
            <h3>Enemy Card</h3>
            <img src="enemy_image.png" alt="Enemy" />
            <p>HP: 120</p>
            <p>Attack: 60</p>
          </div>
        </div>

        {/* Center section: Prompt and Text Area with Microphone */}
        <div className="prompt-section">
          <h3>Prompt</h3>
          <textarea
            placeholder="Type here"
            value={text} // Bind the transcribed text to the textarea
            onChange={(e) => setText(e.target.value)} // Update text on manual input
          ></textarea>

          {/* Microphone Button */}
          <button
            className={`mic-button ${isRecording ? 'recording' : ''}`}
            onClick={handleVoiceInput}
            disabled={isRecording}
          >
            {isRecording ? 'Recording...' : '🎤'} {/* Display mic icon or status */}
          </button>

          {/* Submit Button */}
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameBoard;
