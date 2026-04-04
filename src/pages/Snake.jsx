import React, { useEffect, useState } from "react";

import "./Snake.css";

function Snake() {
  const [snake, setSnake] = useState([
    [5, 5],
    [5, 6],
    [5, 7],
  ]);
  const [direction, setDirection] = useState([0, 1]);
  const [seconds, setSeconds] = useState(0);

  function moveSnake() {
    let newSnake = [...snake];
    let headPosition = snake[snake.length - 1];
    let newPosition = [...direction];
    newPosition[0] = headPosition[0] + direction[0];
    newPosition[1] = headPosition[1] + direction[1];

    newSnake.push(newPosition);
    newSnake.shift();
    setSnake(newSnake);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
      moveSnake();
    }, 200);
    return () => clearInterval(interval);
  }, [snake]);

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

  return (
    <div className="container">
      <button
        onClick={() => {
          moveSnake();
        }}
      >
        Förläng ormen
      </button>
      <div className="grid">
        {Array.from({ length: 20 }).map((_, row) =>
          Array.from({ length: 20 }).map((_, col) => {
            const isSnake = snake.some(([r, c]) => r === row && c === col);
            return (
              <div
                className={isSnake ? "cell snake" : "cell"}
                key={`${row}-${col}`}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}

export default Snake;
