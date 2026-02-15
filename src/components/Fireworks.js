import { useEffect, useRef } from 'react';
import './Fireworks.css';

const Fireworks = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const rockets = [];
    const particles = [];
    
    const colorSchemes = [
      ['#ff0844', '#ff6b9d', '#ffd700', '#ffed4e'],
      ['#00d9ff', '#66e0ff', '#ffffff', '#b3f0ff'],
      ['#ff1493', '#ff69b4', '#ffd700', '#ffb6c1'],
      ['#00ff00', '#7fff00', '#ffff00', '#adff2f'],
      ['#ff4500', '#ff6347', '#ffd700', '#ffa500'],
      ['#9370db', '#ba55d3', '#ff69b4', '#dda0dd'],
      ['#ff0000', '#ff6600', '#ffff00', '#ff9900'],
      ['#00bfff', '#87ceeb', '#ffffff', '#add8e6'],
    ];

    class Rocket {
      constructor(x) {
        this.x = x;
        this.y = canvas.height;
        this.targetY = canvas.height * 0.15 + Math.random() * canvas.height * 0.25;
        this.velocity = -10 - Math.random() * 5;
        this.colors = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
        this.exploded = false;
        this.trail = [];
        this.type = Math.random() > 0.3 ? 'burst' : Math.random() > 0.5 ? 'ring' : 'willow';
      }

      draw() {
        // Vẽ đuôi đơn giản
        for (let i = 0; i < this.trail.length; i++) {
          const pos = this.trail[i];
          const alpha = (i / this.trail.length) * 0.6;
          
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = this.colors[0];
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        
        // Vẽ tên lửa
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.colors[0];
        ctx.fillStyle = this.colors[0];
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 8) this.trail.shift();

        this.y += this.velocity;
        this.velocity += 0.2;

        if (this.y <= this.targetY || this.velocity >= 0) {
          this.explode();
          this.exploded = true;
        }
      }

      explode() {
        if (this.type === 'burst') {
          this.createBurst();
        } else if (this.type === 'ring') {
          this.createRing();
        } else {
          this.createWillow();
        }
      }

      createBurst() {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(this.x, this.y, this.colors, 'burst'));
        }
      }

      createRing() {
        const particleCount = 40;
        for (let i = 0; i < particleCount; i++) {
          const angle = (Math.PI * 2 * i) / particleCount;
          particles.push(new Particle(this.x, this.y, this.colors, 'ring', angle));
        }
      }

      createWillow() {
        const particleCount = 55;
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(this.x, this.y, this.colors, 'willow'));
        }
      }
    }

    class Particle {
      constructor(x, y, colors, type, angle = null) {
        this.x = x;
        this.y = y;
        this.colors = colors;
        this.type = type;
        
        if (type === 'ring' && angle !== null) {
          const speed = 5 + Math.random() * 2;
          this.velocity = {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
          };
        } else if (type === 'willow') {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 3 + 1;
          this.velocity = {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed - 2
          };
        } else {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 8 + 3;
          this.velocity = {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
          };
        }
        
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.01;
        this.gravity = type === 'willow' ? 0.15 : 0.05;
        this.friction = 0.98;
        this.trail = [];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * 2 + 2;
      }

      draw() {
        // Vẽ đuôi đơn giản hơn
        for (let i = 0; i < this.trail.length; i++) {
          const pos = this.trail[i];
          const alpha = (i / this.trail.length) * this.alpha * 0.5;
          
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Vẽ hạt chính
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 5) this.trail.shift();

        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.velocity.y += this.gravity;
        
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
      }
    }

    function animate() {
      ctx.fillStyle = 'rgba(10, 10, 30, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rockets.forEach((rocket, index) => {
        if (rocket.exploded) {
          rockets.splice(index, 1);
        } else {
          rocket.update();
          rocket.draw();
        }
      });

      particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
          particles.splice(index, 1);
        } else {
          particle.update();
          particle.draw();
        }
      });

      requestAnimationFrame(animate);
    }

    function launchRocket() {
      const x = canvas.width * 0.15 + Math.random() * canvas.width * 0.7;
      rockets.push(new Rocket(x));
    }

    // Bắn nhiều hơn để rực rỡ
    const launchInterval = setInterval(() => {
      launchRocket();
      if (Math.random() > 0.5) {
        setTimeout(launchRocket, 200);
      }
    }, 700);
    
    // Bắn 3 quả đầu tiên
    launchRocket();
    setTimeout(launchRocket, 300);
    setTimeout(launchRocket, 600);

    animate();

    return () => {
      clearInterval(launchInterval);
    };
  }, []);

  return (
    <div className="fireworks-container">
      <canvas ref={canvasRef} className="fireworks-canvas" />
      
      {/* Decorative elements */}
      <div className="decorative-lantern lantern-left-top">🏮</div>
      <div className="decorative-lantern lantern-right-top">🏮</div>
      <div className="decorative-flower flower-bottom-left">🌸</div>
      <div className="decorative-flower flower-bottom-right">🌸</div>
      
      <div className="loading-text">
        <h1>CHÚC MỪNG NĂM MỚI</h1>
        <p className="subtitle">2026 - Năm Mới Hạnh Phúc</p>
      </div>
    </div>
  );
};

export default Fireworks;
