import React from 'react';
import Game from './components/Game';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
        <h1 className="text-4xl font-bold text-center mb-6 text-white tracking-wider">
          QuizWordz Snake
        </h1>
        <Game />
      </div>
    </div>
  );
}

export default App;