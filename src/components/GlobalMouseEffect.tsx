import React, { useEffect, useRef, useState } from 'react';

interface GlobalMouseEffectProps {
darkMode: boolean;
}

const GlobalMouseEffect: React.FC<GlobalMouseEffectProps> = ({ darkMode }) => {
const canvasRef = useRef<HTMLCanvasElement>(null);
const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
const mouseRef = useRef({ x: 0, y: 0 });
const targetMouseRef = useRef({ x: 0, y: 0 });
const particlesRef = useRef<any[]>([]);
const backgroundParticlesRef = useRef<any[]>([]);
const animationRef = useRef<number>();
const [isMobile, setIsMobile] = useState(false);
const lastParticleTime = useRef(0);
const clickEffect = useRef({ active: false, intensity: 0, decay: 0 });

// PONTOS E TRAÇOS
const minimalSymbols = ['.', '•', '·', '-', '_', '|', '/', '\\'];

// Símbolos para o fundo - mais variados
const backgroundSymbols = [
  'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Node.js',
  'function', 'const', 'let', 'var', 'class', 'import', 'export',
  '{', '}', '(', ')', '[', ']', '<', '>', '=>', '&&', '||',
  'useState', 'useEffect', 'props', 'state', 'component',
  'async', 'await', 'promise', 'fetch', 'API', 'JSON',
  '0', '1', 'true', 'false', 'null', 'undefined',
  'div', 'span', 'button', 'input', 'form', 'header'
];

// Detectar mobile
useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 1024);
  };
  
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);

useEffect(() => {
  const canvas = canvasRef.current;
  const backgroundCanvas = backgroundCanvasRef.current;
  if (!canvas || !backgroundCanvas) return;

  const ctx = canvas.getContext('2d');
  const bgCtx = backgroundCanvas.getContext('2d');
  if (!ctx || !bgCtx) return;

  
  const initBackgroundParticles = (width: number, height: number) => {
    backgroundParticlesRef.current = [];
    const particleCount = isMobile ? 25 : 35;
    
    for (let i = 0; i < particleCount; i++) {
      backgroundParticlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        symbol: backgroundSymbols[Math.floor(Math.random() * backgroundSymbols.length)],
        fontSize: Math.random() * 8 + 12,
        opacity: Math.random() * 0.15 + 0.05,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.005
      });
    }
  };

  // Configurar canvas
  const resizeCanvas = () => {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      window.innerHeight
    );
    
    // Canvas principal
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    // Canvas de fundo
    backgroundCanvas.width = width * dpr;
    backgroundCanvas.height = height * dpr;
    backgroundCanvas.style.width = width + 'px';
    backgroundCanvas.style.height = height + 'px';
    bgCtx.scale(dpr, dpr);

    initBackgroundParticles(width, height);
  };
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

 
  const getRandomMinimalSymbol = () => {
    return minimalSymbols[Math.floor(Math.random() * minimalSymbols.length)];
  };

  
  class MinimalParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    symbol: string;
    fontSize: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      
      // Movimento mais sutil
      const angle = Math.random() * Math.PI * 2;
      const speed = isMobile ? 0.08 : 0.1;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      
      this.maxLife = isMobile ? 2 : 2.5;
      this.life = this.maxLife;
      this.symbol = getRandomMinimalSymbol();
      this.fontSize = isMobile ? 8 : 9;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= isMobile ? 0.02 : 0.015;
      
      this.vx *= 0.995;
      this.vy *= 0.995;
    }

    draw() {
      if (!ctx) return;
      
      ctx.save();
      
      ctx.font = `${this.fontSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const lifeRatio = this.life / this.maxLife;
      const alpha = Math.pow(lifeRatio, 1.2) * (isMobile ? 0.4 : 0.5);
      
      
      const progress = (this.maxLife - this.life) / this.maxLife;
      const r = Math.floor(96 + (236 - 96) * progress);  
      const g = Math.floor(165 + (72 - 165) * progress);  
      const b = Math.floor(250 + (153 - 250) * progress);
      
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      
      ctx.fillText(this.symbol, this.x, this.y);
      ctx.restore();
    }
  }

  // Atualizar partículas de fundo
  const updateBackgroundParticles = () => {
    const width = backgroundCanvas.width / (window.devicePixelRatio || 1);
    const height = backgroundCanvas.height / (window.devicePixelRatio || 1);
    
    bgCtx.clearRect(0, 0, width, height);
    
    backgroundParticlesRef.current.forEach(particle => {
      // Movimento
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.rotation += particle.rotationSpeed;
      
      // Wrap around screen
      if (particle.x < -50) particle.x = width + 50;
      if (particle.x > width + 50) particle.x = -50;
      if (particle.y < -50) particle.y = height + 50;
      if (particle.y > height + 50) particle.y = -50;
      
      // Desenhar
      bgCtx.save();
      bgCtx.translate(particle.x, particle.y);
      bgCtx.rotate(particle.rotation);
      
      bgCtx.font = `${particle.fontSize}px 'Fira Code', monospace`;
      bgCtx.textAlign = 'center';
      bgCtx.textBaseline = 'middle';
      
      const baseColor = darkMode ? '96, 165, 250' : '59, 130, 246';
      bgCtx.fillStyle = `rgba(${baseColor}, ${particle.opacity})`;
      
      bgCtx.fillText(particle.symbol, 0, 0);
      bgCtx.restore();
    });
  };

  
  const handleInteraction = (x: number, y: number) => {
    targetMouseRef.current = { x, y: y + window.scrollY };
    
    const currentTime = Date.now();
    const timeSinceLastParticle = currentTime - lastParticleTime.current;
    
   
    const minInterval = isMobile ? 300 : 250; // ms entre partículas
    
    if (timeSinceLastParticle > minInterval && Math.random() > 0.8) {
      // Apenas 1 partícula minimalista
      const offsetX = (Math.random() - 0.5) * 6;
      const offsetY = (Math.random() - 0.5) * 6;
      
      particlesRef.current.push(
        new MinimalParticle(x + offsetX, y + window.scrollY + offsetY)
      );
      
      lastParticleTime.current = currentTime;
    }
  };

  // Click handler para efeito de cor
  const handleClick = (e: MouseEvent | TouchEvent) => {
    clickEffect.current = {
      active: true,
      intensity: 1,
      decay: 0.08
    };
  };

  // Mouse events
  const handleMouseMove = (e: MouseEvent) => {
    handleInteraction(e.clientX, e.clientY);
  };

  // Touch events
  const handleTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      handleInteraction(touch.clientX, touch.clientY);
    }
  };

  // Animation loop
  const animate = () => {
    if (!ctx || !canvas) return;
    
    ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));

    // Atualizar fundo
    updateBackgroundParticles();

    // Interpolação suave
    const lerpFactor = 0.1;
    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * lerpFactor;
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * lerpFactor;

   
    if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
      const radius = isMobile ? 15 : 18;
      const opacity = isMobile ? 0.02 : 0.025;
      
      const gradient = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, radius
      );
      
      // Gradiente azul para rosa
      gradient.addColorStop(0, `rgba(96, 165, 250, ${opacity})`);    // Azul
      gradient.addColorStop(0.5, `rgba(168, 85, 247, ${opacity * 0.8})`); // Roxo
      gradient.addColorStop(1, `rgba(236, 72, 153, 0)`);            // Rosa transparente
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

   
    const maxParticles = isMobile ? 4 : 6;
    if (particlesRef.current.length > maxParticles) {
      particlesRef.current = particlesRef.current.slice(-3);
    }
    
    // Atualizar partículas
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.update();
      particle.draw();
      return particle.life > 0;
    });

    // Atualizar efeito de clique
    if (clickEffect.current.active) {
      clickEffect.current.intensity -= clickEffect.current.decay;
      if (clickEffect.current.intensity <= 0) {
        clickEffect.current.active = false;
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  // Event listeners
  if (isMobile) {
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchstart', handleClick, { passive: true });
  } else {
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });
  }
  
  animate();

  return () => {
    window.removeEventListener('resize', resizeCanvas);
    
    if (isMobile) {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleClick);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    }
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };
}, [darkMode, isMobile]);


useEffect(() => {
  if (isMobile) return;


  const existingCursor = document.getElementById('kennedy-cursor');
  if (existingCursor) {
    existingCursor.remove();
  }

 
  const cursor = document.createElement('div');
  cursor.id = 'kennedy-cursor';
  cursor.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #ec4899 100%);
    box-shadow: 0 0 12px rgba(96, 165, 250, 0.4), 0 0 24px rgba(236, 72, 153, 0.2);
    transform: translate(-50%, -50%);
    transition: all 0.1s ease;
    opacity: 0;
    will-change: transform, opacity;
  `;
  
  document.body.appendChild(cursor);

  const cursorPos = { x: 0, y: 0 };
  const targetPos = { x: 0, y: 0 };
  let cursorAnimationId: number;
  
  const animateCursor = () => {
    cursorPos.x += (targetPos.x - cursorPos.x) * 0.2;
    cursorPos.y += (targetPos.y - cursorPos.y) * 0.2;
    
    cursor.style.left = cursorPos.x + 'px';
    cursor.style.top = cursorPos.y + 'px';
    
    // Efeito no clique
    if (clickEffect.current.active) {
      const intensity = clickEffect.current.intensity;
      cursor.style.transform = `translate(-50%, -50%) scale(${1 + intensity * 0.4})`;
      cursor.style.opacity = '1';
    } else {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.opacity = '0.8';
    }
    
    cursorAnimationId = requestAnimationFrame(animateCursor);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    targetPos.x = e.clientX;
    targetPos.y = e.clientY;
    cursor.style.opacity = '0.8';
  };
  
  const handleMouseLeave = () => {
    cursor.style.opacity = '0';
  };
  
  document.addEventListener('mousemove', handleMouseMove, { passive: true });
  document.addEventListener('mouseleave', handleMouseLeave);
  
  animateCursor();

  return () => {
    if (cursorAnimationId) {
      cancelAnimationFrame(cursorAnimationId);
    }
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseleave', handleMouseLeave);
    
  
    if (cursor && cursor.parentNode) {
      cursor.parentNode.removeChild(cursor);
    }
  };
}, [isMobile]);

return (
  <>
    {!isMobile && (
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400&display=swap');
          
          @media (min-width: 1024px) and (hover: hover) {
            body { cursor: none !important; }
            *, *:before, *:after { cursor: none !important; }
          }
        `
      }} />
    )}

    {/* Canvas de fundo */}
    <canvas
      ref={backgroundCanvasRef}
      className="fixed top-0 left-0 pointer-events-none z-0"
      style={{ 
        width: '100vw',
        minHeight: '100vh',
        opacity: isMobile ? 0.4 : 0.5,
        filter: 'blur(1px)'
      }}
    />

    {/* Canvas principal */}
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 pointer-events-none z-[1]"
      style={{ 
        width: '100vw',
        minHeight: '100vh',
        opacity: isMobile ? 0.7 : 0.9
      }}
    />
  </>
);
};

export default GlobalMouseEffect;