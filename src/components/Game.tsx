import React, { useState, useEffect, useCallback } from 'react';
import { WORDS } from '../data/words';
import Controls from './Controls';
import GameGrid from './GameGrid';
import GameStats from './GameStats';
import GameOverlay from './GameOverlay';
import WordProgress from './WordProgress';

const GRID_SIZE = 12;
const INITIAL_SNAKE = [{ x: 6, y: 6 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 200; // Increased from 150 to 200 (25% slower)

export type Position = { x: number; y: number };
export type Letter = Position & { char: string; collected?: boolean };

function Game() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [word, setWord] = useState('');
  const [letters, setLetters] = useState<Letter[]>([]);
  const [collectedLetters, setCollectedLetters] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [lives, setLives] = useState(3);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [lastCollected, setLastCollected] = useState<Letter | null>(null);

  const shuffleWord = useCallback(() => {
    const newWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setWord(newWord);
    
    const shuffledLetters: Letter[] = newWord.split('').map((char) => {
      let position: Position;
      do {
        position = {
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        };
      } while (
        snake.some((segment) => segment.x === position.x && segment.y === position.y) ||
        letters.some((letter) => letter.x === position.x && letter.y === position.y)
      );
      return { ...position, char, collected: false };
    });
    
    setLetters(shuffledLetters);
    setCollectedLetters('');
  }, [snake, letters]);

  useEffect(() => {
    shuffleWord();
  }, []);

  useEffect(() => {
    if (isPlaying && !gameOver) {
      const timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, gameOver]);

  useEffect(() => {
    if (gameOver || !isPlaying) return;

    const moveSnake = setInterval(() => {
      setSnake((currentSnake) => {
        const head = currentSnake[0];
        const newHead = {
          x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
          y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
        };

        // Check for collision with self
        if (currentSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          setIsPlaying(false);
          return currentSnake;
        }

        // Find letter at new head position
        const letterAtNewHead = letters.find(
          letter => !letter.collected && letter.x === newHead.x && letter.y === newHead.y
        );

        if (letterAtNewHead) {
          const nextExpectedChar = word[collectedLetters.length];
          
          if (letterAtNewHead.char === nextExpectedChar) {
            // Correct letter collected
            const newCollectedLetters = collectedLetters + letterAtNewHead.char;
            setCollectedLetters(newCollectedLetters);
            setLastCollected(letterAtNewHead);
            setScore(prev => prev + 100);
            
            setLetters(prev => 
              prev.map(l => 
                l === letterAtNewHead ? { ...l, collected: true } : l
              )
            );

            return [newHead, ...currentSnake];
          } else {
            // Wrong letter collected
            setLives(prev => {
              const newLives = prev - 1;
              if (newLives <= 0) {
                setGameOver(true);
                setIsPlaying(false);
              }
              return newLives;
            });

            // Relocate the wrong letter
            setLetters(prev => 
              prev.map(l => {
                if (l === letterAtNewHead) {
                  let newPosition: Position;
                  do {
                    newPosition = {
                      x: Math.floor(Math.random() * GRID_SIZE),
                      y: Math.floor(Math.random() * GRID_SIZE),
                    };
                  } while (
                    currentSnake.some(segment => segment.x === newPosition.x && segment.y === newPosition.y) ||
                    prev.some(letter => letter.x === newPosition.x && letter.y === newPosition.y)
                  );
                  return { ...l, ...newPosition };
                }
                return l;
              })
            );
            return currentSnake;
          }
        }

        // Normal movement
        return [newHead, ...currentSnake.slice(0, -1)];
      });
    }, GAME_SPEED);

    return () => clearInterval(moveSnake);
  }, [direction, gameOver, isPlaying, letters, word, collectedLetters, lives]);

  useEffect(() => {
    if (collectedLetters === word && word !== '') {
      setIsPlaying(false);
      setGameOver(true);
    }
  }, [collectedLetters, word]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isPlaying) return;
    
    const keyDirections: Record<string, Position> = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
    };

    const newDirection = keyDirections[e.key];
    if (newDirection) {
      if (!(direction.x === -newDirection.x && direction.y === -newDirection.y)) {
        setDirection(newDirection);
      }
    }
  }, [direction, isPlaying]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handleDirectionChange = (newDirection: Position) => {
    if (!isPlaying) return;
    if (!(direction.x === -newDirection.x && direction.y === -newDirection.y)) {
      setDirection(newDirection);
    }
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setCollectedLetters('');
    setGameOver(false);
    setLives(3);
    setTime(0);
    setScore(0);
    setIsPlaying(true);
    setLastCollected(null);
    shuffleWord();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <GameStats lives={lives} time={time} score={score} />
      
      <GameGrid
        gridSize={GRID_SIZE}
        snake={snake}
        letters={letters}
        lastCollected={lastCollected}
      />

      <WordProgress 
        word={word}
        collectedLetters={collectedLetters}
      />

      <Controls onDirectionChange={handleDirectionChange} />

      <GameOverlay
        isPlaying={isPlaying}
        gameOver={gameOver}
        word={word}
        collectedLetters={collectedLetters}
        time={time}
        score={score}
        onReset={resetGame}
      />
    </div>
  );
}

export default Game;