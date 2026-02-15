import React, { useEffect } from 'react';
import './Confetti.css';

const Confetti = () => {
  useEffect(() => {
    const createConfetti = () => {
      const confettiContainer = document.querySelector('.confetti-container');
      if (!confettiContainer) return;

      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      
      const colors = ['#ff0000', '#ffd700', '#ff69b4', '#00ff00', '#00bfff', '#ff1493'];
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      confetti.style.animationDelay = Math.random() * 2 + 's';
      
      confettiContainer.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 5000);
    };

    const interval = setInterval(createConfetti, 400);

    return () => clearInterval(interval);
  }, []);

  return <div className="confetti-container"></div>;
};

export default Confetti;
