// components/ChatForm.js
import React, { useState } from 'react';
import bot from './assets/bot.svg';
import Image from "next/image";

const ChatForm = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the onSubmit function passed from the parent component
    onSubmit(prompt);

    // Clear the prompt after submission
    setPrompt('');
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <textarea
        name="prompt"
        placeholder="Ask your Query..."
        value={prompt}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button type="submit">
        <Image src={bot} alt="send" />
      </button>
    </form>
  );
};

export default ChatForm;
