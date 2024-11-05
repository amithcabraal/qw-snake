import React from 'react';
import { Position, Letter } from './Game';
import { motion, AnimatePresence } from 'framer-motion';

type GameGridProps = {
  gridSize: number;
  snake: Position[];
  letters: Letter[];
  lastCollected: Letter | null;
};

function GameGrid({ gridSize, snake, letters, lastCollected }: GameGridProps) {
  const cellSize = 40;

  return (
    <div 
      className="relative w-[480px] h-[480px] bg-gray-800/50 rounded-lg overflow-hidden backdrop-blur-sm border border-white/10"
      style={{ perspective: '1000px' }}
    >
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
        {Array.from({ length: gridSize * gridSize }).map((_, i) => (
          <div key={i} className="border border-white/5" />
        ))}
      </div>

      <AnimatePresence>
        {snake.map((segment, i) => (
          <motion.div
            key={`snake-${i}`}
            className={`absolute w-[40px] h-[40px] rounded-sm ${
              i === 0 ? 'bg-green-400' : 'bg-green-500'
            }`}
            initial={i === 0 ? { scale: 0.8 } : { scale: 1 }}
            animate={{
              left: `${segment.x * cellSize}px`,
              top: `${segment.y * cellSize}px`,
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 1,
            }}
          />
        ))}

        {letters.map((letter, i) => (
          <AnimatePresence key={`letter-${i}`}>
            {!letter.collected && (
              <motion.div
                className={`absolute w-[40px] h-[40px] bg-yellow-400 rounded-sm flex items-center justify-center font-bold text-2xl ${
                  lastCollected?.char === letter.char ? 'z-10' : ''
                }`}
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  left: `${letter.x * cellSize}px`,
                  top: `${letter.y * cellSize}px`,
                }}
                exit={{
                  scale: 0,
                  rotate: 360,
                  transition: { duration: 0.5 }
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              >
                {letter.char}
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default GameGrid;