import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import './RedEnvelope.css';

const RedEnvelope = () => {
  const [opened, setOpened] = useState(false);
  const [currentWish, setCurrentWish] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const wishes = [
    '💰 Tiền vô như nước, tình yêu ngập tràn!',
    '🌟 Năm mới thành công rực rỡ, hạnh phúc tràn đầy!',
    '💖 Mãi bên nhau, yêu thương mỗi ngày!',
    '🎯 Mọi ước mơ đều thành hiện thực!',
    '🌸 Xinh đẹp, tươi trẻ, rạng ngời mãi mãi!',
    '🍀 May mắn gõ cửa, tài lộc kéo đến!',
    '✨ Luôn vui vẻ, khỏe mạnh, hạnh phúc!',
    '🎊 Năm mới vạn sự như ý, phát tài phát lộc!',
    '🌈 Cuộc sống tươi đẹp như cầu vồng!',
    '🎓 Học tập tiến bộ, sự nghiệp thăng hoa!',
    '💝 Tình bạn bền chặt, tình yêu ngọt ngào!',
    '🏆 Thành công trong mọi lĩnh vực!',
    '🌺 Luôn tươi cười, luôn hạnh phúc!',
    '🎁 Nhận được nhiều quà và niềm vui!',
    '🌟 Sáng ngời như ngôi sao, rực rỡ như mặt trời!',
    '💫 Mọi điều ước đều được thực hiện!',
    '🎉 Năm mới nhiều niềm vui, ít lo âu!',
    '🌻 Tươi tắn, năng động, tràn đầy năng lượng!',
    '💕 Được yêu thương, được quan tâm mỗi ngày!',
    '🎈 Cuộc sống nhẹ nhàng, vui vẻ như bong bóng!'
  ];

  const handleOpen = () => {
    if (!opened) {
      setIsShaking(true);
      
      setTimeout(() => {
        setIsShaking(false);
        const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
        setCurrentWish(randomWish);
        setOpened(true);
        
        // Pháo hoa canvas-confetti
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#ffd700', '#ff0000', '#ff69b4']
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#ffd700', '#ff0000', '#ff69b4']
          });
        }, 250);
      }, 500);
    }
  };

  const handleReset = () => {
    setOpened(false);
    setCurrentWish('');
  };

  return (
    <div className="envelope-container">
      <motion.div
        className={`envelope ${opened ? 'opened' : ''} ${isShaking ? 'shaking' : ''}`}
        onClick={handleOpen}
        whileHover={{ scale: 1.05, rotateZ: 2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="envelope-flap"></div>
        <div className="envelope-body">
          <div className="envelope-text">Lì Xì</div>
          <div className="envelope-decoration">福</div>
        </div>
      </motion.div>
      
      {opened && (
        <motion.div
          className="wish-popup"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
        >
          <motion.div
            className="wish-content"
            initial={{ rotateY: 90 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>{currentWish}</h2>
            <motion.button
              className="reset-btn"
              onClick={handleReset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mở lì xì khác 🧧
            </motion.button>
          </motion.div>
        </motion.div>
      )}
      
      {!opened && (
        <motion.p
          className="envelope-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          👆 Nhấn vào bao lì xì để nhận lời chúc!
        </motion.p>
      )}
    </div>
  );
};

export default RedEnvelope;
