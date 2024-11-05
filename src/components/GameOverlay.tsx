import React from 'react';
import { Play, RotateCcw } from 'lucide-react';

type GameOverlayProps = {
  isPlaying: boolean;
  gameOver: boolean;
  word: string;
  collectedLetters: string;
  time: number;
  score: number;
  onReset: () => void;
};

function GameOverlay({ isPlaying, gameOver, word, collectedLetters, time, score, onReset }: GameOverlayProps) {
  if (isPlaying) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-black/80 backdrop-blur-sm p-8 rounded-xl text-white text-center">
        {gameOver ? (
          <>
            <h2 className="text-3xl font-bold mb-4">
              {collectedLetters === word ? 'Congratulations!' : 'Game Over!'}
            </h2>
            <p className="text-xl mb-2">Word: {word}</p>
            <p className="text-xl mb-2">Time: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</p>
            <p className="text-xl mb-6">Score: {score}</p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4">QuizWordz Snake</h2>
            <p className="text-lg mb-6">Collect letters in the correct order to spell the word!</p>
          </>
        )}
        <button
          onClick={onReset}
          className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 mx-auto transition-colors"
        >
          {gameOver ? <RotateCcw className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {gameOver ? 'Play Again' : 'Start Game'}
        </button>
      </div>
    </div>
  );
}

export default GameOverlay;