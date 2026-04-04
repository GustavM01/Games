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
  const [points, setPoints] = useState(0);
  const [highScore, setHighScore] = useState(
    () => parseInt(localStorage.getItem("snakeHighScore")) || 0,
  );

  //Strictmode gör så att den räknar poäng 2 ggr därför har jag denna
  const [hasEaten, setHasEaten] = useState(false);

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

      if (
        newPosition[0] >= 20 ||
        newPosition[0] < 0 ||
        newPosition[1] >= 20 ||
        newPosition[1] < 0
      ) {
        handleReset();
      }

      if (
        prevSnake.some(([r, c]) => r === newPosition[0] && c === newPosition[1])
      ) {
        handleReset();
        return prevSnake;
      }

      const ateFood =
        newPosition[0] === foodRef.current[0] &&
        newPosition[1] === foodRef.current[1];

      if (!ateFood) {
        newSnake.shift();
        setHasEaten(false);
      } else {
        if (hasEaten === false) {
          setPoints((prev) => {
            const newPoint = prev + 1;
            setHasEaten(true);

            if (newPoint > highScore) {
              setHighScore(newPoint);
              localStorage.setItem("snakeHighScore", newPoint);
            }
            return newPoint;
          });

          setFood(() => {
            let newFood;
            do {
              newFood = [
                Math.floor(Math.random() * 20),
                Math.floor(Math.random() * 20),
              ];
            } while (
              prevSnake.some(([r, c]) => r === newFood[0] && c == newFood[1])
            );
            return newFood;
          });
        }
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
      if (e.key === "ArrowUp" && directionRef.current[0] === 0) {
        setDirection([-1, 0]);
        !playing && setPlaying(true);
      }
      if (e.key === "ArrowDown" && directionRef.current[0] === 0) {
        setDirection([1, 0]);
        !playing && setPlaying(true);
      }
      if (e.key === "ArrowLeft" && directionRef.current[1] === 0) {
        setDirection([0, -1]);
        !playing && setPlaying(true);
      }
      if (e.key === "ArrowRight") {
        if (directionRef.current[1] === 0) {
          setDirection([0, 1]);
        } else {
          setPlaying(true);
        }
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
    setPoints(0);
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
      <p>{points}</p>
      <div className="grid">
        {Array.from({ length: 20 }).map((_, row) =>
          Array.from({ length: 20 }).map((_, col) => {
            const isSnake = snake.some(([r, c]) => r === row && c === col);
            const head = snake[snake.length - 1];
            let headClass = "cell head";
            if (direction[0] === -1) headClass += " head-up";
            if (direction[0] === 1) headClass += " head-down";
            if (direction[1] === -1) headClass += " head-left";
            if (direction[1] === 1) headClass += " head-right";
            const isHead = row === head[0] && col === head[1];
            const isFood = row === food[0] && col === food[1];
            return (
              <div
                className={
                  isHead
                    ? headClass
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
      <div className="snake-btn-container">
        <button className="btn" onClick={() => handleStart()}>
          {playing ? "Pause Game" : "Start Game"}
        </button>
        <button className="btn" onClick={() => handleReset()}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Snake;
