import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './WishMessage.css';

const WishMessage = () => {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [envelopePosition, setEnvelopePosition] = useState({ top: '45%', right: '8%' });

  // Random positions cho bao lì xì
  const randomPositions = [
    { top: '15%', left: '8%' },
    { top: '25%', right: '10%' },
    { top: '35%', left: '12%' },
    { top: '50%', right: '8%' },
    { top: '60%', left: '6%' },
    { top: '70%', right: '12%' },
  ];

  const getRandomPosition = () => {
    const randomIndex = Math.floor(Math.random() * randomPositions.length);
    return randomPositions[randomIndex];
  };

  useEffect(() => {
    // Thay đổi vị trí mỗi 10 giây nếu chưa mở
    const interval = setInterval(() => {
      if (!envelopeOpened) {
        setEnvelopePosition(getRandomPosition());
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [envelopeOpened]);

  const handleEnvelopeClick = () => {
    if (envelopeOpened) {
      // Nếu đã mở, click để đóng
      setEnvelopeOpened(false);
      setClickCount(0);
    } else {
      // Nếu chưa mở, tăng số lần click
      const newClickCount = clickCount + 1;
      setClickCount(newClickCount);

      if (newClickCount < 3) {
        // Chưa đủ 3 lần, chạy sang vị trí khác
        setEnvelopePosition(getRandomPosition());
      } else {
        // Đủ 3 lần, mở bao lì xì
        setEnvelopeOpened(true);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <motion.div
      className="wish-message"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="wish-card">
        <motion.div className="card-header" variants={itemVariants}>
          <h1 className="main-title">
            <span className="title-line">CHÚC MỪNG NĂM MỚI</span>
            <span className="title-year">2026</span>
          </h1>
        </motion.div>
        
        <motion.div className="main-wish-box" variants={itemVariants}>
          <div className="greeting-name">Gửi Vân Anh</div>
          <p className="main-message">
            Năm mới rồi nè!
            Cảm ơn Vân Anh vì đã xuất hiện trong một năm của Phúc theo cách rất riêng.
            Phúc chúc Vân Anh năm 2026 luôn vui vẻ, khỏe mạnh và gặp thật nhiều may mắn. Chúc Vân Anh học tốt hơn, đạt được những điều mình mong muốn.
            Chúc Vân Anh ngày càng xinh đẹp hơn, rạng rỡ hơn và lúc nào cũng tràn đầy năng lượng.
            Mong một năm thật nhiều điều tốt đẹp sẽ đến với Vân Anh.
          </p>
        </motion.div>

        <motion.p className="hint-text" variants={itemVariants}>
          {clickCount === 0 && "Tìm bao lì xì để nhận lời nhắn đặc biệt ạaaaaa"}
        </motion.p>
      </div>

      {/* Bao lì xì nhỏ xuất hiện random */}
      <motion.div
        className={`mini-envelope ${envelopeOpened ? 'opened' : ''}`}
        style={envelopePosition}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          ...envelopePosition
        }}
        transition={{ 
          opacity: { delay: 0.8, duration: 0.5 },
          scale: { delay: 0.8, duration: 0.5 },
          top: { duration: 0.6, ease: "easeInOut" },
          left: { duration: 0.6, ease: "easeInOut" },
          right: { duration: 0.6, ease: "easeInOut" }
        }}
        onClick={handleEnvelopeClick}
      >
        <div className="envelope-wrapper">
          <div className="envelope-flap-mini"></div>
          <div className="envelope-body-mini">
            <div className="envelope-decoration">
              <div className="star">⭐</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lời nhắn bí mật - tách riêng để có thể đóng mở */}
      <AnimatePresence>
        {envelopeOpened && (
          <motion.div
            className="secret-message-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleEnvelopeClick}
          >
            <motion.div
              className="secret-message"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-button" onClick={handleEnvelopeClick}>✕</button>
              <p>Phúc thương Vân Anh nhiều lắm á nhaaa 💕</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WishMessage;
