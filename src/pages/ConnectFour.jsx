import React, { useRef, useState } from "react";

import "./ConnectFour.css";

function ConnectFour() {
  const [playerOneDiscs, setPlayerOneDiscs] = useState([
    [5, 1],
    [5, 2],
    [5, 3],
    [5, 4],
  ]);
  const [playerTwoDiscs, setPlayerTwoDiscs] = useState([
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [hoveredCol, setHoveredCol] = useState(null);

  const columns = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
  ];

  function getDropRow(col) {
    const all = [...playerOneDiscs, ...playerTwoDiscs];

    for (let row = 5; row >= 0; row--) {
      const occupied = all.some(([r, c]) => r === row && c === col);

      if (!occupied) {
        return row;
      }
    }
    return null;
  }

  function handlePutDisc(col) {
    const row = getDropRow(col);
    if (row === null) {
      return;
    }

    if (currentPlayer === 1) {
      setPlayerOneDiscs((prev) => [...prev, [row, col]]);
    } else {
      setPlayerTwoDiscs((prev) => [...prev, [row, col]]);
    }

    setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
  }

  function handleReset() {
    setPlayerOneDiscs([]);
    setPlayerTwoDiscs([]);
    setCurrentPlayer(1);
  }

  return (
    <div className="container" style={{ position: "relative" }}>
      <div className="connect-grid">
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 7 }).map((_, col) => {
            const isP1 = playerOneDiscs.some(
              ([r, c]) => r === row && c === col,
            );
            const isP2 = playerTwoDiscs.some(
              ([r, c]) => r === row && c === col,
            );
            const isTopRow = columns.some(([r, c]) => r === row && c === col);

            return (
              <div
                onMouseEnter={() => setHoveredCol(col)}
                onMouseLeave={() => setHoveredCol(null)}
                onClick={() => handlePutDisc(col)}
                className={
                  isP1
                    ? "holes p1"
                    : isP2
                      ? "holes p2"
                      : isTopRow
                        ? "holes topRow"
                        : "holes"
                }
                key={`${row}-${col}`}
              >
                {/* {row}, {col} */}
              </div>
            );
          }),
        )}
        {hoveredCol !== null && (
          <div
            className="preview-disc"
            style={{
              left: hoveredCol * 110 + 10,
              background: currentPlayer === 1 ? "var(--accent)" : "limegreen",
            }}
          />
        )}
      </div>
      <button onClick={() => handleReset()} className="btn">
        Reset
      </button>
    </div>
  );
}

export default ConnectFour;
