import React, { useEffect, useRef } from 'react';

/**
 * ParticleCanvas: Renders floating golden stardust, bokeh glowing orbs,
 * and gently falling blossom/flower petals.
 */
const ParticleCanvas = ({ enabled = true, themeId = 'royalRed' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Color palettes based on theme
    const isPink = themeId === 'blushPink';
    const petalColors = isPink
      ? ['rgba(255, 192, 203, 0.75)', 'rgba(255, 182, 193, 0.65)', 'rgba(244, 143, 177, 0.6)']
      : ['rgba(255, 218, 185, 0.75)', 'rgba(255, 182, 193, 0.7)', 'rgba(240, 128, 128, 0.55)', 'rgba(255, 235, 160, 0.65)'];

    // 1. Golden Dust / Sparkles
    const sparkleCount = Math.min(Math.floor(width / 22), 65);
    const sparkles = Array.from({ length: sparkleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.45 + 0.15),
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.7 + 0.2,
      opacityDelta: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      maxOpacity: Math.random() * 0.4 + 0.6,
      minOpacity: 0.1,
      isStar: Math.random() > 0.7,
    }));

    // 2. Falling Flower Petals
    const petalCount = Math.min(Math.floor(width / 45), 28);
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 12 + 10,
      speedY: Math.random() * 0.9 + 0.6,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.025,
      flip: Math.random() * Math.PI,
      flipSpeed: Math.random() * 0.02 + 0.01,
      oscillation: Math.random() * Math.PI * 2,
      oscillationSpeed: Math.random() * 0.02 + 0.01,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    // 3. Bokeh Orbs (Soft warm light spheres)
    const bokehCount = 14;
    const bokehOrbs = Array.from({ length: bokehCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 70 + 40,
      alpha: Math.random() * 0.08 + 0.03,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
    }));

    const drawStar = (cx, cy, spikes, outerRadius, innerRadius, alpha) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 238, 170, ${alpha})`;
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Bokeh Orbs
      bokehOrbs.forEach((orb) => {
        orb.x += orb.speedX;
        orb.y += orb.speedY;
        if (orb.x < -orb.radius) orb.x = width + orb.radius;
        if (orb.x > width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = height + orb.radius;
        if (orb.y > height + orb.radius) orb.y = -orb.radius;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, `rgba(255, 220, 140, ${orb.alpha})`);
        grad.addColorStop(0.6, `rgba(255, 200, 100, ${orb.alpha * 0.4})`);
        grad.addColorStop(1, 'rgba(255, 200, 100, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Golden Sparkles
      sparkles.forEach((s) => {
        s.y += s.speedY;
        s.x += s.speedX;
        s.opacity += s.opacityDelta;

        if (s.opacity > s.maxOpacity || s.opacity < s.minOpacity) {
          s.opacityDelta = -s.opacityDelta;
        }

        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }

        if (s.isStar && s.size > 1.4) {
          drawStar(s.x, s.y, 4, s.size * 2.5, s.size * 0.6, s.opacity);
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 225, 140, ${s.opacity})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      });

      // Draw Falling Flower Petals
      petals.forEach((p) => {
        p.oscillation += p.oscillationSpeed;
        p.flip += p.flipSpeed;
        p.rotation += p.rotationSpeed;

        p.x += p.speedX + Math.sin(p.oscillation) * 0.8;
        p.y += p.speedY;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(Math.sin(p.flip), 1);

        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.7, p.size * 0.9, p.size * 0.4, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.4, -p.size * 0.8, -p.size * 0.7, 0, -p.size);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, 'rgba(255, 240, 245, 0.3)');
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled, themeId]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
};

export default ParticleCanvas;
