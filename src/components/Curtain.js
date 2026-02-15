import { useEffect, useState } from 'react';
import './Curtain.css';

const Curtain = ({ onComplete }) => {
  const [opening, setOpening] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Sau 1.5 giây bắt đầu kéo rèm
    const timer = setTimeout(() => {
      setOpening(true);
      // Sau khi kéo xong (2s), bắt đầu fade out ngay
      setTimeout(() => {
        setFadeOut(true);
        // Sau khi fade out xong (0.6s), gọi callback
        setTimeout(onComplete, 600);
      }, 2000);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`curtain-container ${fadeOut ? 'fade-out' : ''}`}>
      {/* Thanh treo rèm */}
      <div className="curtain-rod">
        <div className="curtain-rod-end left"></div>
        <div className="curtain-rod-end right"></div>
        <div className="curtain-hooks">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="hook"></div>
          ))}
        </div>
      </div>

      {/* Ánh sáng sân khấu */}
      <div className="stage-lights">
        <div className="spotlight"></div>
        <div className="spotlight"></div>
        <div className="spotlight"></div>
      </div>

      {/* Đèn lồng trang trí */}
      <div className="lantern-decoration lantern-left">🏮</div>
      <div className="lantern-decoration lantern-right">🏮</div>

      {/* Rèm trái */}
      <div className={`curtain-left ${opening ? 'open' : ''}`}>
        <div className="curtain-fabric"></div>
        <div className="curtain-folds"></div>
        <div className="curtain-embroidery"></div>
        <div className="curtain-border"></div>
        <div className="curtain-tassels">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="tassel"></div>
          ))}
        </div>
      </div>

      {/* Rèm phải */}
      <div className={`curtain-right ${opening ? 'open' : ''}`}>
        <div className="curtain-fabric"></div>
        <div className="curtain-folds"></div>
        <div className="curtain-embroidery"></div>
        <div className="curtain-border"></div>
        <div className="curtain-tassels">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="tassel"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Curtain;
