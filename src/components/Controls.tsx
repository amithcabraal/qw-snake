import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

type ControlsProps = {
  onDirectionChange: (direction: { x: number; y: number }) => void;
};

function Controls({ onDirectionChange }: ControlsProps) {
  return (
    <div className="grid grid-cols-3 gap-3 w-64">
      <div />
      <button
        onClick={() => onDirectionChange({ x: 0, y: -1 })}
        className="bg-white/10 p-5 rounded-lg hover:bg-white/20 active:bg-white/30 transition-colors duration-150"
      >
        <ArrowUp className="w-8 h-8 text-white" />
      </button>
      <div />
      <button
        onClick={() => onDirectionChange({ x: -1, y: 0 })}
        className="bg-white/10 p-5 rounded-lg hover:bg-white/20 active:bg-white/30 transition-colors duration-150"
      >
        <ArrowLeft className="w-8 h-8 text-white" />
      </button>
      <button
        onClick={() => onDirectionChange({ x: 0, y: 1 })}
        className="bg-white/10 p-5 rounded-lg hover:bg-white/20 active:bg-white/30 transition-colors duration-150"
      >
        <ArrowDown className="w-8 h-8 text-white" />
      </button>
      <button
        onClick={() => onDirectionChange({ x: 1, y: 0 })}
        className="bg-white/10 p-5 rounded-lg hover:bg-white/20 active:bg-white/30 transition-colors duration-150"
      >
        <ArrowRight className="w-8 h-8 text-white" />
      </button>
    </div>
  );
}

export default Controls;