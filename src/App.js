import { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import Curtain from './components/Curtain';
import Fireworks from './components/Fireworks';
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
          
          {/* Trang trí Tết */}
          <div className="tet-decorations">
            <div className="peach-blossom" style={{ top: '8%', left: '3%', fontSize: '5rem' }}>🌸</div>
            <div className="peach-blossom" style={{ top: '15%', right: '5%', fontSize: '6rem' }}>🌸</div>
            <div className="peach-blossom" style={{ top: '65%', left: '2%', fontSize: '4.5rem' }}>🌸</div>
            <div className="peach-blossom" style={{ top: '75%', right: '4%', fontSize: '5.5rem' }}>🌸</div>
            
            <div className="firecracker" style={{ top: '5%', left: '15%', fontSize: '3.5rem' }}>🧨</div>
            <div className="firecracker" style={{ top: '10%', right: '18%', fontSize: '4rem' }}>🧨</div>
            <div className="firecracker" style={{ top: '82%', left: '12%', fontSize: '3rem' }}>🧨</div>
            
            <div className="lantern" style={{ top: '3%', left: '25%' }}>🏮</div>
            <div className="lantern" style={{ top: '7%', right: '28%' }}>🏮</div>
            <div className="lantern" style={{ top: '88%', left: '22%' }}>🏮</div>
            <div className="lantern" style={{ top: '85%', right: '25%' }}>🏮</div>
            
            <div className="gold-coin" style={{ top: '20%', left: '8%' }}>🪙</div>
            <div className="gold-coin" style={{ top: '28%', right: '10%' }}>🪙</div>
            <div className="gold-coin" style={{ top: '60%', left: '6%' }}>🪙</div>
            <div className="gold-coin" style={{ top: '55%', right: '7%' }}>🪙</div>
            
            <div className="tangerine" style={{ top: '35%', left: '4%' }}>🍊</div>
            <div className="tangerine" style={{ top: '45%', right: '5%' }}>🍊</div>
          </div>
          
          <motion.div
            className="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <WishMessage />
          </motion.div>
        </>
      )}
    </div>
  );
}

export default App;
