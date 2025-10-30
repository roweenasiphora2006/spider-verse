import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface WebConnectionProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
  isAnimating: boolean;
}

export const WebConnection = ({ from, to, color, isAnimating }: WebConnectionProps) => {
  const [pathData, setPathData] = useState('');

  useEffect(() => {
    const startX = from.x + 40;
    const startY = from.y + 40;
    const endX = to.x + 40;
    const endY = to.y + 40;

    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    const offsetX = (endY - startY) * 0.2;
    const offsetY = (startX - endX) * 0.2;

    const controlX = midX + offsetX;
    const controlY = midY + offsetY;

    const path = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
    setPathData(path);
  }, [from, to]);

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
    >
      <defs>
        <filter id={`glow-${color}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d={pathData}
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        filter={`url(#glow-${color})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: isAnimating ? [0.6, 1, 0.6] : 0.7,
        }}
        transition={{
          pathLength: { duration: 1, ease: "easeInOut" },
          opacity: { duration: 1.5, repeat: isAnimating ? Infinity : 0 },
        }}
      />

      {isAnimating && (
        <motion.circle
          r="4"
          fill={color}
          filter={`url(#glow-${color})`}
        >
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            path={pathData}
          />
        </motion.circle>
      )}
    </svg>
  );
};
