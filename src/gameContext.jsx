import React, { useEffect, useMemo, useState } from "react";
import {
  getIsTerminal,
  getNextState,
  getPlayer,
  miniMax,
  utility,
} from "./AI/minimax";

export const GameContext = React.createContext({});

const initialState = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

const GameProvider = ({ children }) => {
  const [humanPlayer, setHumanPlayer] = useState(null);

  const [state, setState] = useState(initialState);

  const currentPlayer = useMemo(() => {
    return getPlayer(state);
  }, [state]);

  const play = (action) => {
    if (currentPlayer !== humanPlayer) return;

    const nextState = getNextState(state, action);
    setState(nextState);

    // botPlay([...nextState]);
  };

  const botPlayer = useMemo(() => {
    switch (humanPlayer) {
      case "X":
        return "O";
      case "O":
        return "X";

      default:
        return null;
    }
  }, [humanPlayer]);

  const isTerminal = useMemo(() => {
    return getIsTerminal(state);
  }, [state]);

  useEffect(() => {
    if (currentPlayer !== botPlayer || isTerminal) return;

    const bestAction = miniMax(state)[1];

    const nextState = getNextState(state, bestAction);
    setState(nextState);
  }, [humanPlayer, state]);

  const lineState = useMemo(() => {
    const score = (player) => (player === "X" ? 1 : -1);
    const isTriad = (vector) => {
      let [a, b, c] = vector;
      if (a === b && b === c && c !== " ") return score(a);

      return 0;
    };

    const column = (i) => [state[0][i], state[1][i], state[2][i]];

    for (let i = 0; i < 3; i++) {
      if (isTriad(state[i])) {
        return {
          type: "horizontal",
          lineNumber: i + 1,
        };
      }

      if (isTriad(column(i)))
        return {
          type: "vertical",
          lineNumber: i + 1,
        };
    }

    if (isTriad([state[0][0], state[1][1], state[2][2]]))
      return {
        type: "diagonal",
        lineNumber: 2,
      };

    if (isTriad([state[0][2], state[1][1], state[2][0]]))
      return {
        type: "diagonal",
        lineNumber: 1,
      };

    return null;
  }, [state]);

  const resultText = useMemo(() => {
    if (!isTerminal) return null;

    const utilityNum = utility(state);

    if (utilityNum === 0) return "Game Drawn";

    if (
      (utilityNum === 1 && humanPlayer === "X") ||
      (utilityNum === -1 && humanPlayer === "O")
    )
      return "You Won!";

    return "You Lost!";
  }, [state]);

  const restartGame = () => {
    setHumanPlayer(null);
    setState([...initialState]);
  };

  const startGame = (player) => {
    setHumanPlayer(player);
    setState([...initialState]);
  };

  return (
    <GameContext.Provider
      value={{
        humanPlayer,
        setHumanPlayer,
        startGame,
        state,
        play,
        isTerminal,
        lineState,
        restartGame,
        resultText
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
