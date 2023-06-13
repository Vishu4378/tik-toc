import React, { useContext, useEffect, useState } from "react";
import {
  combination_five,
  combination_four,
  combination_three,
} from "@/components/boardCombinations";
import Context, { UserContextType, userContext } from "@/components/Context";

interface Props {
  value: number;
}

const TacTable: React.FC<Props> = () => {
  const { p1, p2, setP1, setP2, setValue, value } =
    useContext<UserContextType>(userContext);

  const getWinningCombinations = (N: number) => {
    const combinations = [];

    for (let i = 0; i < N; i++) {
      const row = [];
      for (let j = 0; j < N; j++) {
        row.push(i * N + j);
      }
      combinations.push(row);
    }

    for (let i = 0; i < N; i++) {
      const column = [];
      for (let j = 0; j < N; j++) {
        column.push(i + j * N);
      }
      combinations.push(column);
    }

    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < N; i++) {
      diagonal1.push(i * N + i);
      diagonal2.push(i * N + (N - 1 - i));
    }
    combinations.push(diagonal1, diagonal2);
    setCombination(combinations);
    return combinations;
  };

  useEffect(() => {
    setBoard(Array(value * value).fill(""));
    setCurrentPlayerName(p1);
    getWinningCombinations(value);
  }, [value, p1]);

  const [board, setBoard] = useState(Array(value * value).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");
  const [currentPlayerName, setCurrentPlayerName] = useState<string>(p1);
  const [winner, setWinner] = useState<string>("");
  const [combination, setCombination] = useState<number[][]>([]);
  function handleClick(i: number) {
    const currentBoard = [...board];
    currentBoard[i] = currentPlayer;

    setBoard(currentBoard);
    console.log("current", currentBoard);
    checkWinner(currentBoard, currentPlayer);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    setCurrentPlayerName(currentPlayerName === p1 ? p2 : p1);
  }

  function checkWinner(currentBoard: string[], currentPlayer: string) {
    for (let i = 0; i < combination.length; i++) {
      let val = 0;
      for (let j = 0; j < combination[i].length; j++) {
        let temp: number;
        temp = combination[i][j];
        if (currentBoard[temp] === currentPlayer) {
          val = val + 1;
        }
      }
      if (val === value) {
        setWinner(currentPlayerName);
        setCurrentPlayerName("");
        break;
      }
    }
  }
  function handleReset() {
    setBoard(Array(value * value).fill(""));
    setCurrentPlayer("X");
    setWinner("");
    setCurrentPlayerName(p1);
  }
  console.log(value);
  return (
    <div className="flex flex-col items-center justify-center  text-gray-200 bg-[#171717] min-h-screen">
      {winner && (
        <div className="p-4 text-xl font-semibold font">
          winner is player<span className="text-red-500"> {winner}</span>
        </div>
      )}
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
        <div>
          <p className="font-semibold">
            Player <span className="text-red-500">{currentPlayerName}</span>
          </p>
        </div>
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

export default TacTable;
