import React, { useEffect, useRef, useState } from 'react';

interface GlobalMouseEffectProps {
  darkMode: boolean;
}

const GlobalMouseEffect: React.FC<GlobalMouseEffectProps> = ({ darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<any[]>([]);
  const backgroundParticlesRef = useRef<any[]>([]);
  const animationRef = useRef<number>();
  const [isMobile, setIsMobile] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const lastParticleTime = useRef(0);
  const lastBackgroundUpdate = useRef(0);
  const frameCount = useRef(0);
  const particleIdCounter = useRef(0);

  const minimalSymbols = ['.', '•', '·', '-', '+', '*', '○', '◦'];
  const backgroundSymbols = isMobile ? 
    ['{', '}', '<', '>', '/', '=', '[]', '()', '+', '-', '*', 'Java', 'Node.js', 'Python', 'Vue'] : 
    ['React', 'JS', 'CSS', 'HTML', '{', '}', '<', '>', '/', '=', '[]', '()', 'const', 'let', 'var', 'function'];

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024 || 
                   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cursor tracking
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    if (!isMobile) {
      document.addEventListener('mousemove', updateCursor);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      
      // Hide default cursor
      document.body.style.cursor = 'none';
    }

    return () => {
      if (!isMobile) {
        document.removeEventListener('mousemove', updateCursor);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'auto';
      }
    };
  }, [isMobile]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const backgroundCanvas = backgroundCanvasRef.current;
    if (!canvas || !backgroundCanvas) return;

    const ctx = canvas.getContext('2d');
    const bgCtx = backgroundCanvas.getContext('2d');
    if (!ctx || !bgCtx) return;

    const config = {
      mobile: {
        backgroundParticles: 15,
        maxParticles: 4,
        particleInterval: 600,
        backgroundFPS: 20,
        mainFPS: 40,
        dpr: 1,
        blur: 'none',
        fadeInDuration: 2000,    // 2 segundos para aparecer
        fadeOutDuration: 3000,   // 3 segundos para desaparecer
        particleLifetime: 8000   // 8 segundos total de vida
      },
      desktop: {
        backgroundParticles: 60,
        maxParticles: 10,
        particleInterval: 150,
        backgroundFPS: 60,
        mainFPS: 60,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
        blur: 'blur(0.5px)',
        fadeInDuration: 2500,    // 2.5 segundos para aparecer
        fadeOutDuration: 4000,   // 4 segundos para desaparecer
        particleLifetime: 12000  // 12 segundos total de vida
      }
    };

    const settings = isMobile ? config.mobile : config.desktop;

    const createBackgroundParticle = (width: number, height: number) => {
      particleIdCounter.current++;
      return {
        id: particleIdCounter.current,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.3),
        vy: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.3),
        symbol: backgroundSymbols[Math.floor(Math.random() * backgroundSymbols.length)],
        fontSize: isMobile ? Math.random() * 6 + 10 : Math.random() * 10 + 14,
        maxOpacity: isMobile ? Math.random() * 0.2 + 0.05 : Math.random() * 0.3 + 0.1,
        currentOpacity: 0,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * (isMobile ? 0.002 : 0.008),
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        birthTime: Date.now(),
        phase: 'fadeIn', // fadeIn, stable, fadeOut, dead
        deathTime: null
      };
    };

    const initBackgroundParticles = (width: number, height: number) => {
      backgroundParticlesRef.current = [];
      
      
      for (let i = 0; i < settings.backgroundParticles; i++) {
        const particle = createBackgroundParticle(width, height);
        particle.birthTime = Date.now() + (i * 100); 
        backgroundParticlesRef.current.push(particle);
      }
    };

    const updateParticleOpacity = (particle: any) => {
      const now = Date.now();
      const age = now - particle.birthTime;

      if (age < 0) {
       
        particle.currentOpacity = 0;
        particle.phase = 'waiting';
        return;
      }

      if (particle.phase === 'waiting' || particle.phase === 'fadeIn') {
        if (age < settings.fadeInDuration) {
          // Fase de fade in
          const progress = age / settings.fadeInDuration;
          particle.currentOpacity = particle.maxOpacity * progress;
          particle.phase = 'fadeIn';
        } else {
          // Fase estável
          particle.currentOpacity = particle.maxOpacity;
          particle.phase = 'stable';
        }
      } else if (particle.phase === 'stable') {
        
        const stableTime = settings.particleLifetime - settings.fadeInDuration - settings.fadeOutDuration;
        if (age > settings.fadeInDuration + stableTime) {
          particle.phase = 'fadeOut';
          particle.deathTime = now + settings.fadeOutDuration;
        }
      } else if (particle.phase === 'fadeOut') {
       
        const fadeOutProgress = (particle.deathTime - now) / settings.fadeOutDuration;
        particle.currentOpacity = particle.maxOpacity * Math.max(0, fadeOutProgress);
        
        if (fadeOutProgress <= 0) {
          particle.phase = 'dead';
        }
      }
    };

    const resizeCanvas = () => {
      const dpr = settings.dpr;
      const width = window.innerWidth;
      const height = isMobile ? window.innerHeight : Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight
      );
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);

      backgroundCanvas.width = width * dpr;
      backgroundCanvas.height = height * dpr;
      backgroundCanvas.style.width = width + 'px';
      backgroundCanvas.style.height = height + 'px';
      bgCtx.scale(dpr, dpr);

      if (isMobile) {
        ctx.imageSmoothingEnabled = false;
        bgCtx.imageSmoothingEnabled = false;
      }

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
      rotation: number;
      rotationSpeed: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        
        const angle = Math.random() * Math.PI * 2;
        const speed = isMobile ? 0.08 : 0.15;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        this.maxLife = isMobile ? 2.5 : 3.5;
        this.life = this.maxLife;
        this.symbol = getRandomMinimalSymbol();
        this.fontSize = isMobile ? 8 : 12;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= isMobile ? 0.025 : 0.01;
        this.rotation += this.rotationSpeed;
        
        this.vx *= 0.99;
        this.vy *= 0.99;
      }

      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        ctx.font = `${this.fontSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const lifeRatio = this.life / this.maxLife;
        const alpha = Math.pow(lifeRatio, 0.8) * (isMobile ? 0.6 : 0.8);
        
        if (isMobile) {
          ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
        } else {
          const progress = (this.maxLife - this.life) / this.maxLife;
          const r = Math.floor(96 + (236 - 96) * progress);
          const g = Math.floor(165 + (72 - 165) * progress);
          const b = Math.floor(250 + (153 - 250) * progress);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = isMobile ? 3 : 5;
        
        ctx.fillText(this.symbol, 0, 0);
        ctx.restore();
      }
    }

    const updateBackgroundParticles = () => {
      const now = performance.now();
      const backgroundInterval = 1000 / settings.backgroundFPS;
      
      if (now - lastBackgroundUpdate.current < backgroundInterval) {
        return;
      }
      
      lastBackgroundUpdate.current = now;
      
      const width = backgroundCanvas.width / settings.dpr;
      const height = backgroundCanvas.height / settings.dpr;
      
      bgCtx.clearRect(0, 0, width, height);
      
      // Atualizar partículas existentes
      backgroundParticlesRef.current.forEach(particle => {
        updateParticleOpacity(particle);
        
        if (particle.phase !== 'waiting' && particle.phase !== 'dead') {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.pulsePhase += particle.pulseSpeed;
          
          if (!isMobile) {
            particle.rotation += particle.rotationSpeed;
          }
          
          // Wrap around screen
          if (particle.x < -50) particle.x = width + 50;
          if (particle.x > width + 50) particle.x = -50;
          if (particle.y < -50) particle.y = height + 50;
          if (particle.y > height + 50) particle.y = -50;
          
          
          if (particle.currentOpacity > 0.001) {
            bgCtx.save();
            bgCtx.translate(particle.x, particle.y);
            
            if (!isMobile) {
              bgCtx.rotate(particle.rotation);
            }
            
            bgCtx.font = `${particle.fontSize}px ${isMobile ? 'monospace' : "'Fira Code', monospace"}`;
            bgCtx.textAlign = 'center';
            bgCtx.textBaseline = 'middle';
            
            const pulse = Math.sin(particle.pulsePhase) * 0.3 + 0.7;
            const finalOpacity = particle.currentOpacity * pulse;
            
            const baseColor = darkMode ? '96, 165, 250' : '59, 130, 246';
            bgCtx.fillStyle = `rgba(${baseColor}, ${finalOpacity})`;
            
            bgCtx.shadowColor = `rgba(${baseColor}, ${finalOpacity * 0.5})`;
            bgCtx.shadowBlur = isMobile ? 2 : 4;
            
            bgCtx.fillText(particle.symbol, 0, 0);
            bgCtx.restore();
          }
        }
      });
      
     
      const aliveParticles = backgroundParticlesRef.current.filter(p => p.phase !== 'dead');
      const deadCount = backgroundParticlesRef.current.length - aliveParticles.length;
      
      
      for (let i = 0; i < deadCount; i++) {
        const newParticle = createBackgroundParticle(width, height);
        // Adicionar delay aleatório para evitar sincronização
        newParticle.birthTime = Date.now() + Math.random() * 2000;
        aliveParticles.push(newParticle);
      }
      
      backgroundParticlesRef.current = aliveParticles;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isMobile) {
        const touch = e.touches[0];
        if (touch && Math.random() > 0.95) {
          const offsetX = (Math.random() - 0.5) * 8;
          const offsetY = (Math.random() - 0.5) * 8;
          
          particlesRef.current.push(
            new MinimalParticle(touch.clientX + offsetX, touch.clientY + window.scrollY + offsetY)
          );
        }
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      frameCount.current++;
      
      if (frameCount.current % (isMobile ? 1 : 1) === 0) {
        ctx.clearRect(0, 0, canvas.width / settings.dpr, canvas.height / settings.dpr);
        
        updateBackgroundParticles();

        if (particlesRef.current.length > settings.maxParticles) {
          particlesRef.current = particlesRef.current.slice(-Math.floor(settings.maxParticles / 2));
        }
        
        particlesRef.current = particlesRef.current.filter(particle => {
          particle.update();
          particle.draw();
          return particle.life > 0;
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isMobile) {
      document.addEventListener('touchstart', handleTouchMove, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
    }
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      
      if (isMobile) {
        document.removeEventListener('touchstart', handleTouchMove);
        document.removeEventListener('touchmove', handleTouchMove);
      }
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [darkMode, isMobile]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400&display=swap');
          
          ${!isMobile ? `
            * {
              cursor: none !important;
            }
            
            a, button, input, textarea, select {
              cursor: none !important;
            }
          ` : ''}
          
          ${isMobile ? `
            canvas {
              will-change: auto !important;
              transform: translateZ(0);
            }
          ` : ''}
        `
      }} />

      {/* Custom Cursor  */}
      {!isMobile && (
        <div
          ref={cursorRef}
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: cursorPos.x - 12,
            top: cursorPos.y - 12,
            width: '24px',
            height: '24px',
            transition: 'transform 0.1s ease-out',
            transform: isClicking ? 'scale(1.3)' : 'scale(1)',
          }}
        >
          {/* Outer ring */}
          <div 
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: darkMode ? '#60a5fa' : '#3b82f6',
              backgroundColor: 'transparent',
              opacity: 0.8,
            }}
          />
          
          {/* Inner dot */}
          <div 
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              backgroundColor: darkMode ? '#60a5fa' : '#3b82f6',
              boxShadow: `0 0 8px ${darkMode ? '#60a5fa' : '#3b82f6'}`,
            }}
          />
          
          {/* Click effect */}
          {isClicking && (
            <div 
              className="absolute inset-0 rounded-full border-2"
              style={{
                borderColor: darkMode ? '#60a5fa' : '#3b82f6',
                animation: 'clickPulse 0.3s ease-out',
                backgroundColor: 'transparent',
              }}
            />
          )}
        </div>
      )}

      {/* Background Canvas */}
      <canvas
        ref={backgroundCanvasRef}
        className="fixed top-0 left-0 pointer-events-none z-0"
        style={{ 
          width: '100vw',
          minHeight: '100vh',
          opacity: isMobile ? 0.4 : 0.7,
          filter: isMobile ? 'none' : 'blur(0.5px)',
          willChange: isMobile ? 'auto' : 'transform'
        }}
      />

      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 pointer-events-none z-[1]"
        style={{ 
          width: '100vw',
          minHeight: '100vh',
          opacity: isMobile ? 0.7 : 1,
          willChange: isMobile ? 'auto' : 'transform'
        }}
      />

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes clickPulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(2);
              opacity: 0;
            }
          }
        `
      }} />
    </>
  );
};

export default GlobalMouseEffect;