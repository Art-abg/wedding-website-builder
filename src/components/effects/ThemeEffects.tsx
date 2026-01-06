import { useEffect, useRef } from 'react';
import { useThemeStore } from '../../store/themeStore';

export const ThemeEffects = () => {
  const { getEffectiveTheme } = useThemeStore();
  const theme = getEffectiveTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Pomegranate Garden Particles
  useEffect(() => {
    if (theme.id !== 'pomegranate_garden') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const count = Math.floor(window.innerWidth / 10); // Responsive count
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#C0392B'; // Deep red like pomegranate seeds

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        p.y += p.speed;
        p.x += Math.sin(p.y * 0.01) * 0.2; // Sway

        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme.id]);

  if (theme.id === 'pomegranate_garden') {
    return (
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-0 opacity-30 mix-blend-multiply"
      />
    );
  }

  if (theme.id === 'armenian_classic') {
    return (
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />
    );
  }

  return null;
};
