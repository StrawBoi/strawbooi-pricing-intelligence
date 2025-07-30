/*
 * Strawbooi Pricing Intelligence Platform
 * Copyright (c) 2025 Strawbooi. All rights reserved.
 * Advanced 3D Floating Grid Background Component
 */

import React, { useEffect, useRef } from 'react';

const FloatingGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrame;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gridSize = 80;
      const amplitude = 10;
      const frequency = 0.01;
      
      // Create gradient for the lines
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.1)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      
      // Draw vertical lines with wave effect
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= canvas.height; y += 2) {
          const waveX = x + Math.sin((y + time) * frequency) * amplitude;
          if (y === 0) {
            ctx.moveTo(waveX, y);
          } else {
            ctx.lineTo(waveX, y);
          }
        }
        ctx.stroke();
      }
      
      // Draw horizontal lines with wave effect
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 2) {
          const waveY = y + Math.sin((x + time) * frequency) * amplitude;
          if (x === 0) {
            ctx.moveTo(x, waveY);
          } else {
            ctx.lineTo(x, waveY);
          }
        }
        ctx.stroke();
      }
      
      // Add floating particles
      const particleCount = 20;
      for (let i = 0; i < particleCount; i++) {
        const x = (Math.sin(time * 0.001 + i) * canvas.width / 4) + canvas.width / 2;
        const y = (Math.cos(time * 0.0008 + i * 2) * canvas.height / 4) + canvas.height / 2;
        const size = Math.sin(time * 0.002 + i) * 2 + 3;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${Math.sin(time * 0.003 + i) * 0.3 + 0.2})`;
        ctx.fill();
      }
      
      time += 16;
    };

    const animate = () => {
      drawGrid();
      animationFrame = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default FloatingGrid;