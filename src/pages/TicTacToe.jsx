import { useState } from "react";
import "../App.css";

function TicTacToe() {
  const [board, setBoard] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [previousTurn, setPreviousTurn] = useState("O");
  const [tie, setTie] = useState(false);

  const [gameType, setGameType] = useState("twoPlayer");

  const [win, setWin] = useState(false);

  const [winningLine, setWinningLine] = useState([]);

  const winningSquares = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkBoard(board) {
    for (const combination of winningSquares) {
      const a = combination[0];
      const b = combination[1];
      const c = combination[2];
      if (board[a] != null && board[a] === board[b] && board[a] === board[c]) {
        setWin(true);
        console.log(combination);
        setWinningLine(combination);
        return true;
      }
    }
    if (!board.includes(null)) {
      setTie(true);
    }
    return false;
  }

  function getWinner(board) {
    for (const combination of winningSquares) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function minMax(board, isMaximizing) {
    const winner = getWinner(board);

    if (winner === "X") {
      return -1;
    }
    if (winner === "O") {
      return 1;
    }
    if (!board.includes(null)) {
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "O";
          let score = minMax(board, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "X";
          let score = minMax(board, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  function checkIfGoingToWIn(board) {
    for (const combination of winningSquares) {
      const a = combination[0];
      const b = combination[1];
      const c = combination[2];
      if (board[a] != null && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  }

  function easyBotMove(currentBoard) {
    let notDone = true;
    let newBoard = [...currentBoard];
    while (notDone) {
      const botTurn = Math.floor(Math.random() * 9);
      if (newBoard[botTurn] === null) {
        newBoard[botTurn] = "O";
        notDone = false;
      }
      if (!newBoard.includes(null)) {
        notDone = false;
      }
    }
    return newBoard;
  }

  function mediumBotMove(currentBoard) {
    let newBoard = [...currentBoard];
    let winningBoard = getWinningMove(newBoard);
    let blockingBoard = getBlockingMove(newBoard);
    if (winningBoard) {
      newBoard = winningBoard;
    } else if (blockingBoard) {
      newBoard = blockingBoard;
    } else {
      newBoard = easyBotMove(newBoard);
    }

    return newBoard;
  }

  function impossibleBotMove(board) {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = "O";

        let score = minMax(board, false);
        board[i] = null;

        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    let newBoard = [...board];
    newBoard[move] = "O";
    return newBoard;
  }

  function getWinningMove(board) {
    let newBoard = [...board];
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === null) {
        newBoard[i] = "O";

        if (checkIfGoingToWIn(newBoard)) {
          return newBoard;
        } else {
          newBoard[i] = null;
        }
      }
    }
    return false;
  }

  function getBlockingMove(board) {
    let newBoard = [...board];
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === null) {
        newBoard[i] = "X";
        if (checkIfGoingToWIn(newBoard)) {
          newBoard[i] = "O";
          return newBoard;
        } else {
          newBoard[i] = null;
        }
      }
    }
    return false;
  }

  function handleClick(index) {
    let newBoard = [...board];
    if (board[index] === null && win === false) {
      if (gameType != "twoPlayer") {
        newBoard[index] = "X";
        setPreviousTurn("X");
        const hasWon = checkBoard(newBoard);

        if (!hasWon) {
          setTimeout(() => {
            let botBoard = null;
            if (gameType === "easyBot") {
              botBoard = easyBotMove(newBoard);
            } else if (gameType === "mediumBot") {
              botBoard = mediumBotMove(newBoard);
            } else if (gameType === "impossibleBot") {
              botBoard = impossibleBotMove(newBoard);
            }
            setBoard(botBoard);
            checkBoard(botBoard);
            setPreviousTurn("O");
          }, 500);
        }
      } else {
        if (previousTurn === "O") {
          setPreviousTurn("X");
          newBoard[index] = "X";
        } else {
          setPreviousTurn("O");
          newBoard[index] = "O";
        }
      }
    }

    setBoard(newBoard);
    checkBoard(newBoard);
  }

  function handleReset() {
    setBoard([null, null, null, null, null, null, null, null, null]);
    setPreviousTurn("O");
    setWin(false);
    setTie(false);
    setWinningLine([]);
  }

  return (
    <>
      <div className="container">
        <div className="game-type-container">
          <button
            className={
              gameType === "twoPlayer"
                ? "game-type-btn active"
                : "game-type-btn"
            }
            onClick={() => {
              handleReset();
              setGameType("twoPlayer");
            }}
          >
            2 player
          </button>
          <button
            className={
              gameType === "easyBot" ? "game-type-btn active" : "game-type-btn"
            }
            onClick={() => {
              handleReset();
              setGameType("easyBot");
            }}
          >
            Easy bot
          </button>
          <button
            className={
              gameType === "mediumBot"
                ? "game-type-btn active"
                : "game-type-btn"
            }
            onClick={() => {
              handleReset();
              setGameType("mediumBot");
            }}
          >
            Medium bot
          </button>
          <button
            className={
              gameType === "impossibleBot"
                ? "game-type-btn active"
                : "game-type-btn"
            }
            onClick={() => {
              handleReset();
              setGameType("impossibleBot");
            }}
          >
            Impossible bot
          </button>
        </div>
        {!win && gameType === "twoPlayer" && (
          <p>{previousTurn === "O" ? "X Tur att spela" : "O Tur att spela"}</p>
        )}
        {gameType != "twoPlayer" && !win && !tie && <p>Du är X</p>}
        {win && gameType === "twoPlayer" && <p>{previousTurn + " vann"}</p>}
        {win && previousTurn === "X" && gameType != "twoPlayer" && (
          <p>Du vann</p>
        )}
        {win && previousTurn === "O" && gameType != "twoPlayer" && (
          <p>Botten vann</p>
        )}
        {tie && <p>Det blev lika</p>}
        <div className="board">
          {board.map((value, index) => (
            <button
              key={index}
              className={`square ${winningLine.includes(index) ? "win" : ""}`}
              onClick={() => {
                handleClick(index);
              }}
            >
              {value}
            </button>
          ))}
        </div>
        <button
          className="reset-btn"
          onClick={() => {
            handleReset();
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default TicTacToe;
