import React, { useEffect, useRef, useState } from "react";

import "./Snake.css";

function Snake() {
  const [snake, setSnake] = useState([
    [5, 5],
    [5, 6],
    [5, 7],
  ]);
  const [direction, setDirection] = useState([0, 1]);
  const directionRef = useRef(direction);
  const [food, setFood] = useState([10, 10]);
  const foodRef = useRef(food);
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(playing);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  function moveSnake() {
    setSnake((prevSnake) => {
      let newSnake = [...prevSnake];
      let headPosition = prevSnake[prevSnake.length - 1];
      let newPosition = [
        headPosition[0] + directionRef.current[0],
        headPosition[1] + directionRef.current[1],
      ];

      const ateFood =
        newPosition[0] === foodRef.current[0] &&
        newPosition[1] === foodRef.current[1];

      if (!ateFood) {
        newSnake.shift();
      } else {
        setFood([
          Math.round(Math.random() * 20),
          Math.round(Math.random() * 20),
        ]);
      }

      newSnake.push(newPosition);
      return newSnake;
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
      if (playingRef.current) {
        moveSnake();
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "ArrowUp") {
        setDirection([-1, 0]);
      }
      if (e.key === "ArrowDown") {
        setDirection([1, 0]);
      }
      if (e.key === "ArrowLeft") {
        setDirection([0, -1]);
      }
      if (e.key === "ArrowRight") {
        setDirection([0, 1]);
      }
    }
    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function handleStart() {
    if (playingRef.current === false) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }

  function handleReset() {
    setPlaying(false);
    setSnake([
      [5, 5],
      [5, 6],
      [5, 7],
    ]);
    setFood([10, 10]);
    setDirection([0, 1]);
  }

  return (
    <div className="container">
      <div className="grid">
        {Array.from({ length: 20 }).map((_, row) =>
          Array.from({ length: 20 }).map((_, col) => {
            const isSnake = snake.some(([r, c]) => r === row && c === col);
            const head = snake[snake.length - 1];
            const isHead = row === head[0] && col === head[1];
            const isFood = row === food[0] && col === food[1];
            return (
              <div
                className={
                  isHead
                    ? "cell head"
                    : isSnake
                      ? "cell snake"
                      : isFood
                        ? "cell food"
                        : "cell"
                }
                key={`${row}-${col}`}
              />
            );
          }),
        )}
      </div>
      <button onClick={() => handleStart()}>
        {playing ? "Pause Game" : "Start Game"}
      </button>
      <button onClick={() => handleReset()}>Reset</button>
    </div>
  );
}

export default Snake;
