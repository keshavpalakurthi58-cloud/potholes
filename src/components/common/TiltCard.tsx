import React, { useRef, useState, useCallback } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt angle in degrees (default: 8)
  perspective?: number; // 3D perspective in px (default: 1000)
  glare?: boolean;
  onClick?: () => void;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 7,
  perspective = 1000,
  glare = false,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (-maxTilt to +maxTilt)
      const rotateX = -((y - centerY) / centerY) * maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setTilt({ rotateX, rotateY, scale: 1.015 });
      if (glare) {
        setGlarePos({
          x: (x / rect.width) * 100,
          y: (y / rect.height) * 100,
          opacity: 0.15,
        });
      }
    },
    [maxTilt, glare]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
    if (glare) {
      setGlarePos(prev => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className="inline-block w-full"
    >
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
          transition: isHovered
            ? 'transform 0.1s ease-out, box-shadow 0.2s ease-out'
            : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease',
          transformStyle: 'preserve-3d',
        }}
        className={`relative rounded-2xl bg-white border border-asphalt-200/80 shadow-sm hover:shadow-md transition-shadow will-change-transform ${className}`}
      >
        {children}

        {glare && (
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, transparent 65%)`,
              opacity: glarePos.opacity,
              transition: 'opacity 0.3s ease',
            }}
          />
        )}
      </div>
    </div>
  );
};
