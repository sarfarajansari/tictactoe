import { Select } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";
import { GameContext } from "../gameContext";
import { Container, Header, Player } from "../helper/helper.styled";

const PlayerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 500px;

  position: relative;
  margin: 0 auto;
`;

const PlayerSelection = () => {
  const playerOptions = ["X", "O"];
  const { humanPlayer, startGame, gameMode } = useContext(GameContext);

  if (humanPlayer || !gameMode) return <></>;

  return (
    <Container>
      <Header>Select Player</Header>

      <PlayerContainer>
        {playerOptions.map((player, index) => (
          <Player
            player={player}
            key={index}
            onClick={() => startGame(player)}
          />
        ))}
      </PlayerContainer>
    </Container>
  );
};

export default PlayerSelection;
