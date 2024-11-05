import React from 'react';
import { Heart, Clock, Trophy } from 'lucide-react';

type GameStatsProps = {
  lives: number;
  time: number;
  score: number;
};

function GameStats({ lives, time, score }: GameStatsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex gap-8 text-white">
      <div className="flex items-center gap-2">
        <Heart className="w-6 h-6 text-red-500" />
        <span className="text-xl font-bold">{lives}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-6 h-6 text-blue-400" />
        <span className="text-xl font-mono">{formatTime(time)}</span>
      </div>
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <span className="text-xl font-bold">{score}</span>
      </div>
    </div>
  );
}

export default GameStats;