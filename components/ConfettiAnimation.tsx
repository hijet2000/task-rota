import React, { useEffect, useRef } from 'react';

// A simple confetti animation component
export const ConfettiAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particles: any[] = [];
        const particleCount = 150;
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];

        const createParticles = () => {
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height - height,
                    speed: Math.random() * 5 + 1,
                    radius: Math.random() * 5 + 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    tilt: Math.floor(Math.random() * 10) - 10,
                    tiltAngle: 0,
                    tiltAngleIncrement: 0.07,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach((p, i) => {
                ctx.beginPath();
                ctx.lineWidth = p.radius;
                ctx.strokeStyle = p.color;
                ctx.moveTo(p.x + p.tilt + (i / 2), p.y);
                ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.radius);
                ctx.stroke();

                p.y += p.speed;
                p.tiltAngle += p.tiltAngleIncrement;
                p.tilt = Math.sin(p.tiltAngle) * 15;

                if (p.y > height) {
                    particles[i] = { ...p, x: Math.random() * width, y: -20 };
                }
            });
            requestAnimationFrame(draw);
        };
        
        createParticles();
        draw();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }} />;
};
