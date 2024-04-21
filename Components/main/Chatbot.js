'use client'
import React, { useState, useEffect, useRef } from 'react';
import ChatForm from './ChatForm';
import user from './assets/user.svg';
import bot from './assets/bot.svg';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { slideInFromBottom } from '../../utils/motion';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  const handleSubmit = async (prompt) => {
    // Update messages state with user prompt
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: prompt, isAI: false },
    ]);

    // Fetch response from server
    const response = await fetch('http://127.0.0.1:8000/chatapi/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });

    if (response.ok) {
      const jsonData = await response.json();

      // Update messages state with bot response
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: jsonData.response, isAI: true },
      ]);
    } else {
      const err = await response.text();
      alert(err);
    }
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    
    // Scroll to the Top of chat container when messages change
    chatContainer.scrollTop = chatContainer.scrollHeight;
  
    // Check if the chat container is scrolled to the Top
    const isScrolledToTop = chatContainer.scrollHeight - chatContainer.clientHeight <= chatContainer.scrollTop + 1;
  
    // If not scrolled to the Top, scroll to the Top
    if (!isScrolledToTop) {
      chatContainer.scrollTop = chatContainer.scrollHeight - chatContainer.clientHeight;
    }
  }, [messages.length]); // Listen to changes in the length of the messages array
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideInFromBottom(0.5)} // Apply slideInFromLeft animation variant
    >

    <div id="app">
      <div
        id="chat_container"
        ref={chatContainerRef}
        style={{
          overflowY: 'auto',
          borderRadius: '2rem 2rem 0px 0px',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          zIndex: '21',
          scrollBehavior: 'smooth',
        }}
        >
        {messages.map((message, index) => (
          <div
          className={`wrapper ${message.isAI ? 'ai' : 'user'}`}
          key={`message-${index}`}
          >
            <div className="chat">
              <div className={`profile ${message.isAI ? 'ai' : 'user'} mx-10 ${message.isAI ? 'justify-start' : 'justify-end'}`}>
                <Image src={message.isAI ? bot : user} alt={message.isAI ? 'bot' : 'user'} />
              </div>
              <div className="message">
                {message.isAI ? (
                  <TypingAnimation>{message.text}</TypingAnimation>
                  ) : (
                    message.text
                    )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatForm onSubmit={handleSubmit} />
    </div>
    </motion.div>
  );
};

const TypingAnimation = ({ children }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= children.length) {
        setDisplayText(children.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 10); // Adjust typing speed (milliseconds)

    return () => clearInterval(typingInterval);
  }, [children]);

  return <>{displayText}</>;
};

export default Chatbot;
