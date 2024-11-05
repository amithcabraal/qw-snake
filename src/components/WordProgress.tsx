import React from 'react';
import { motion } from 'framer-motion';

type WordProgressProps = {
  word: string;
  collectedLetters: string;
};

function WordProgress({ word, collectedLetters }: WordProgressProps) {
  return (
    <div className="flex gap-2">
      {word.split('').map((letter, index) => {
        const isCollected = index < collectedLetters.length;
        const isNext = index === collectedLetters.length;

        return (
          <motion.div
            key={`${letter}-${index}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold ${
              isCollected
                ? 'bg-green-500 text-white'
                : isNext
                ? 'bg-yellow-400 text-black'
                : 'bg-white/10 text-white/30'
            }`}
          >
            {letter}
          </motion.div>
        );
      })}
    </div>
  );
}

export default WordProgress;