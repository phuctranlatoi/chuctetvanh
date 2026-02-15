import React, { useEffect } from 'react';
import './FloatingElements.css';

const FloatingElements = () => {
  useEffect(() => {
    const createFloatingElement = () => {
      const container = document.querySelector('.floating-elements-container');
      if (!container) return;

      const elements = ['🌸', '🎋', '🏮', '✨', '🌺'];
      const element = document.createElement('div');
      element.className = 'floating-element';
      element.textContent = elements[Math.floor(Math.random() * elements.length)];
      element.style.left = Math.random() * 100 + '%';
      element.style.animationDuration = (Math.random() * 10 + 15) + 's';
      element.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
      element.style.animationDelay = Math.random() * 5 + 's';
      
      container.appendChild(element);
      
      setTimeout(() => {
        element.remove();
      }, 25000);
    };

    // Tạo ít elements hơn
    for (let i = 0; i < 5; i++) {
      setTimeout(createFloatingElement, i * 800);
    }

    const interval = setInterval(createFloatingElement, 4000);

    return () => clearInterval(interval);
  }, []);

  return <div className="floating-elements-container"></div>;
};

export default FloatingElements;
