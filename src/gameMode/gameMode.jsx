import { Button } from "antd";
import React from "react";
import { useContext } from "react";
import { GameContext } from "../gameContext";
import { Container, Header } from "../helper/helper.styled";

const GameMode = () => {
  const { gameMode, setGameMode } = useContext(GameContext);

  if (gameMode) return <></>;

  const selectEasy = () => setGameMode("Easy");
  const selectDifficult = () => setGameMode("Difficult");
  const selectUnbeatable = () => setGameMode("Unbeatable");
  return (
    <Container>
      <Header>Select Game Mode</Header>

      <button className="custom-btn " onClick={selectEasy}>
        Easy
      </button>
      <button className="custom-btn primary" onClick={selectDifficult}>
        Difficult
      </button>
      <button className="custom-btn secondary" onClick={selectUnbeatable}>
        Unbeatable
      </button>
      <br />
      <br />
    </Container>
  );
};

export default GameMode;
