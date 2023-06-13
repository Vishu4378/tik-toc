import React, { useEffect, useState } from "react";
import {
  combination_five,
  combination_four,
  combination_three,
} from "./boardCombinations";

interface Props {
  value: number;
}

export const TacTable: React.FC<Props> = ({ value }) => {
  useEffect(() => {
    setBoard(Array(value * value).fill(""));
  }, [value]);

  const [board, setBoard] = useState(Array(value * value).fill(""));

  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  function handleClick(i: number) {
    const currentBoard = [...board];
    currentBoard[i] = currentPlayer;

    setBoard(currentBoard);
    console.log("current", currentBoard);
    checkWinner(currentBoard, currentPlayer);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  function checkWinner(currentBoard: string[], currentPlayer: string) {
    if (value === 3) {
      for (let i = 0; i < combination_three.length; i++) {
        const [a, b, c] = combination_three[i];

        if (
          currentBoard[a] === currentPlayer &&
          currentBoard[b] === currentPlayer &&
          currentBoard[c] === currentPlayer
        ) {
          setWinner(currentPlayer);
          break;
        }
      }
    } else if (value === 4) {
      for (let i = 0; i < combination_four.length; i++) {
        const [a, b, c, d] = combination_four[i];

        if (
          currentBoard[a] === currentPlayer &&
          currentBoard[b] === currentPlayer &&
          currentBoard[c] === currentPlayer &&
          currentBoard[d] === currentPlayer
        ) {
          setWinner(currentPlayer);
          break;
        }
      }
    } else if (value === 5) {
      for (let i = 0; i < combination_five.length; i++) {
        const [a, b, c, d, e] = combination_five[i];

        if (
          currentBoard[a] === currentPlayer &&
          currentBoard[b] === currentPlayer &&
          currentBoard[c] === currentPlayer &&
          currentBoard[d] === currentPlayer &&
          currentBoard[e] === currentPlayer
        ) {
          setWinner(currentPlayer);
          break;
        }
      }
    }
  }
  function handleReset() {
    setBoard(Array(value * value).fill(""));
    setCurrentPlayer("X");
    setWinner("");
  }
  console.log(value);
  return (
    <div className="flex flex-col items-center justify-center  text-gray-200 bg-[#171717]">
      <div
        className={`grid w-90  gap-0.5 mx-auto bg-gray-200`}
        style={{
          gridTemplateColumns: `repeat(${value},1fr)`,
        }}
      >
        {board.map((num, i) => (
          <div
            className="flex items-center justify-center w-20 h-20 text-4xl text-gray-200 bg-[#171717]"
            key={i}
            onClick={() => handleClick(i)}
          >
            {num}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        {winner && (
          <div className="text-xl font-semibold font">
            winner is player<span className="text-red-500"> {winner}</span>
          </div>
        )}
        <div>
          <button
            className="px-4 py-1 duration-150 bg-gray-400 rounded-md hover:shadow-xl shadow-gray-400 hover:rounded-sm "
            onClick={() => handleReset()}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
