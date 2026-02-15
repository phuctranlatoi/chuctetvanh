import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import Curtain from './components/Curtain';
import Fireworks from './components/Fireworks';
import RedEnvelope from './components/RedEnvelope';
import Confetti from './components/Confetti';
import WishMessage from './components/WishMessage';
import FloatingElements from './components/FloatingElements';
import ParallaxParticles from './components/ParallaxParticles';
import ProgressBar from './components/ProgressBar';

function App() {
  const [showCurtain, setShowCurtain] = useState(true);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCurtainComplete = () => {
    setShowCurtain(false);
    setShowFireworks(true);
    
    // Sau 4 giây pháo hoa, hiện nội dung chính
    setTimeout(() => {
      setShowFireworks(false);
      setShowContent(true);
      setShowConfetti(true);
    }, 4000);
  };

  return (
    <div className="App">
      {showCurtain && <Curtain onComplete={handleCurtainComplete} />}
      {showFireworks && <Fireworks />}
      {showContent && <ProgressBar />}
      {showContent && <ParallaxParticles />}
      {showConfetti && <Confetti />}
      {showContent && (
        <>
          <FloatingElements />
          <motion.div
            className="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <WishMessage />
            <RedEnvelope />
          </motion.div>
        </>
      )}
    </div>
  );
}

export default App;
