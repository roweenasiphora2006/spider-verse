import { motion } from 'framer-motion';
import { LinkedListNode } from '../types';
import { useMultiverseStore } from '../store/multiverseStore';

interface SpiderNodeProps {
  node: LinkedListNode;
  position: { x: number; y: number };
  isAnimating: boolean;
}

export const SpiderNode = ({ node, position, isAnimating }: SpiderNodeProps) => {
  const { spiderPerson } = node;

  return (
    <motion.div
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isAnimating ? [1, 1.2, 1] : 1,
        opacity: 1,
      }}
      transition={{
        duration: isAnimating ? 0.5 : 0.8,
        repeat: isAnimating ? Infinity : 0,
        repeatDelay: 0.2,
      }}
    >
      <div className="relative group cursor-pointer">
        <motion.div
          className="absolute inset-0 rounded-full blur-xl opacity-60"
          style={{
            backgroundColor: spiderPerson.color,
          }}
          animate={{
            scale: isAnimating ? [1, 1.5, 1] : [1, 1.2, 1],
            opacity: isAnimating ? [0.6, 0.9, 0.6] : [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div
          className="relative w-20 h-20 rounded-full flex items-center justify-center font-bold text-3xl border-4 shadow-2xl"
          style={{
            backgroundColor: spiderPerson.color,
            borderColor: spiderPerson.glowColor,
            color: '#ffffff',
            textShadow: `0 0 10px ${spiderPerson.glowColor}`,
          }}
        >
          {spiderPerson.letter}
        </div>

        <motion.div
          className="absolute -inset-2 rounded-full border-2 opacity-0 group-hover:opacity-100"
          style={{
            borderColor: spiderPerson.color,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded"
          style={{
            color: spiderPerson.color,
            textShadow: `0 0 5px ${spiderPerson.glowColor}`,
          }}
        >
          {spiderPerson.name}
        </div>
      </div>
    </motion.div>
  );
};
