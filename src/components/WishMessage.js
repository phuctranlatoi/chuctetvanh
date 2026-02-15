import { motion } from 'framer-motion';
import { useState } from 'react';
import './WishMessage.css';

const WishMessage = () => {
  const [openedEnvelopes, setOpenedEnvelopes] = useState([]);

  const miniWishes = [
    { id: 1, text: "Chúc em học giỏi, điểm cao rực rỡ, thành tích xuất sắc!", position: { top: '15%', left: '8%' } },
    { id: 2, text: "Chúc em luôn khỏe mạnh, tươi cười, tràn đầy năng lượng!", position: { top: '25%', right: '10%' } },
    { id: 3, text: "Chúc em gặp nhiều may mắn, tài lộc kéo đến!", position: { top: '60%', left: '5%' } },
    { id: 4, text: "Chúc em vạn sự như ý, mọi điều hanh thông!", position: { top: '70%', right: '8%' } },
    { id: 5, text: "Chúc tình bạn của chúng mình mãi bền chặt!", position: { top: '40%', left: '12%' } },
    { id: 6, text: "Chúc em luôn xinh đẹp, rạng rỡ và hạnh phúc!", position: { top: '50%', right: '15%' } },
  ];

  const handleEnvelopeClick = (id) => {
    if (!openedEnvelopes.includes(id)) {
      setOpenedEnvelopes([...openedEnvelopes, id]);
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
          <div className="greeting-name">Gửi Vân Anh thân mến</div>
          <p className="main-message">
            Năm mới 2026 đến rồi! Anh chúc em luôn vui vẻ, học tập tiến bộ, 
            và mỗi ngày đều tràn đầy năng lượng tích cực. 
            Cảm ơn em vì đã là người bạn tuyệt vời bên cạnh anh!
          </p>
          <div className="signature">— Phúc gửi tặng</div>
        </motion.div>

        <motion.p className="hint-text" variants={itemVariants}>
          Nhấn vào các bao lì xì xung quanh để đọc lời chúc!
        </motion.p>
      </div>

      {/* Bao lì xì nằm ngẫu nhiên */}
      {miniWishes.map((wish, index) => (
        <motion.div
          key={wish.id}
          className={`floating-envelope ${openedEnvelopes.includes(wish.id) ? 'opened' : ''}`}
          style={wish.position}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
          onClick={() => handleEnvelopeClick(wish.id)}
        >
          <div className="envelope-wrapper">
            <div className="envelope-flap-mini"></div>
            <div className="envelope-body-mini">
              <div className="envelope-decoration">
                <div className="star">⭐</div>
              </div>
            </div>
            {openedEnvelopes.includes(wish.id) && (
              <motion.div
                className="wish-paper"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -20, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <p>{wish.text}</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default WishMessage;
