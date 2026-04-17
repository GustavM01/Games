import React, { useEffect, useState } from "react";
import "./ConnectFour.css";

function ConnectFour() {
  const [playerOneDiscs, setPlayerOneDiscs] = useState([[]]);

  const [playerTwoDiscs, setPlayerTwoDiscs] = useState([[]]);

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [hoveredCol, setHoveredCol] = useState(null);
  const [fallingDisc, setFallingDisc] = useState(null);
  const [playing, setPlaying] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [showPreviewDisc, setShowPreviewDisc] = useState(true);
  const [winningLine, setWinningline] = useState([[]]);

  const columns = Array.from({ length: 7 });
  const rows = Array.from({ length: 6 });

  function getDropRow(col) {
    const all = [...playerOneDiscs, ...playerTwoDiscs];

    for (let row = 5; row >= 0; row--) {
      const occupied = all.some(([r, c]) => r === row && c === col);
      if (!occupied) return row;
    }
    return null;
  }

  function checkDirection(row, col, dRow, dCol, discs) {
    let count = 0;

    let r = row;
    let c = col;

    while (true) {
      const found = discs.some(([rr, cc]) => rr === r && cc === c);

      if (!found) break;

      count++;
      r += dRow;
      c += dCol;
    }
    return count;
  }

  function checkWin(row, col, discs) {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];

    return directions.some(([dr, dc]) => {
      const total =
        checkDirection(row, col, dr, dc, discs) +
        checkDirection(row, col, -dr, -dc, discs) -
        1;

      return total >= 4;
    });
  }

  function handlePutDisc(col) {
    if (!playing) return;
    const row = getDropRow(col);
    if (row === null) return;

    const player = currentPlayer;

    setFallingDisc({
      col,
      row,
      player,
      y: -400,
      animating: false,
    });

    requestAnimationFrame(() => {
      setFallingDisc((prev) => ({
        ...prev,
        animating: true,
        y: row,
      }));
    });

    setCurrentPlayer((p) => (p === 1 ? 2 : 1));
    setPlaying(false);
    setTimeout(() => {
      if (player === 1) {
        setPlayerOneDiscs((prev) => [...prev, [row, col]]);
      } else {
        setPlayerTwoDiscs((prev) => [...prev, [row, col]]);
      }

      setFallingDisc(null);
      const newDisc = [row, col];

      const newDiscs =
        currentPlayer === 1
          ? [...playerOneDiscs, newDisc]
          : [...playerTwoDiscs, newDisc];

      if (checkWin(row, col, newDiscs)) {
        setPlaying(false);
        setGameOver(true);
      } else {
        setPlaying(true);
      }
    }, 350);
  }

  function handleReset() {
    setPlayerOneDiscs([]);
    setPlayerTwoDiscs([]);
    setCurrentPlayer(1);
    setPlaying(true);
    setGameOver(false);
    setShowPreviewDisc(true);
  }

  return (
    <div className="container" style={{ position: "relative" }}>
      <div className="connect-grid">
        {gameOver && (
          <div
            className="overlay"
            onClick={() => {
              setGameOver(false);
              setShowPreviewDisc(false);
            }}
          >
            <div className="overlay-card">
              <p>Player {currentPlayer} won!</p>
              <p className="continue">Click anywhere to continue</p>
            </div>
          </div>
        )}
        {columns.map((_, col) => (
          <div
            key={col}
            className="column"
            onMouseEnter={() => {
              if (showPreviewDisc) setHoveredCol(col);
            }}
            onMouseLeave={() => {
              if (showPreviewDisc) setHoveredCol(null);
            }}
            onClick={() => handlePutDisc(col)}
          >
            {rows.map((_, row) => {
              const isP1 = playerOneDiscs.some(
                ([r, c]) => r === row && c === col,
              );

              const isP2 = playerTwoDiscs.some(
                ([r, c]) => r === row && c === col,
              );

              return (
                <div
                  key={`${row}-${col}`}
                  className={isP1 ? "holes p1" : isP2 ? "holes p2" : "holes"}
                />
              );
            })}
            {fallingDisc?.col === col && (
              <div
                className="falling-disc"
                style={{
                  transform: `translateY(${fallingDisc.animating ? fallingDisc.row * 90 : -100}px)`,
                  background:
                    fallingDisc.player === 1 ? "var(--accent)" : "limegreen",
                }}
              />
            )}
          </div>
        ))}
        {hoveredCol !== null && !gameOver && (
          <div
            className="preview-disc"
            style={{
              left: hoveredCol * 90 + 15,
              background: currentPlayer === 1 ? "var(--accent)" : "limegreen",
            }}
          />
        )}
      </div>

      <button onClick={handleReset} className="btn">
        Reset
      </button>
    </div>
  );
}

export default ConnectFour;
