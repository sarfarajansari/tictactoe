import { Modal } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";
import { GameContext } from "../gameContext";
import { Container, Player } from "../helper/helper.styled";
import Results from "../results/results";
import LineComponent from "./lineComponent";

const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 669px;
  margin: 0px auto;

  & > div {
    &:nth-child(2),
    &:nth-child(5),
    &:nth-child(8) {
      border-right: 2px solid #152c4e;
      border-left: 2px solid #152c4e;
    }
  }

  & > div {
    &:nth-child(6),
    &:nth-child(4),
    &:nth-child(5) {
      border-top: 2px solid #152c4e;
      border-bottom: 2px solid #152c4e;
    }
  }
`;

const Tictactoe = () => {
  const { humanPlayer, state, play, isTerminal, lineState, restartGame } =
    useContext(GameContext);

  if (!humanPlayer) return <></>;

  return (
    <Container>
      <BoardGrid>
        {state.map((row, i) => {
          return row.map((cell, j) => {
            return (
              <Player
                player={cell}
                onClick={cell === " " ? () => play([i, j]) : null}
              />
            );
          });
        })}
      </BoardGrid>

      {isTerminal && lineState && (
        <LineComponent
          type={lineState.type}
          lineNumber={lineState.lineNumber}
        />
      )}

      <Results/>
      
    </Container>
  );
};

export default Tictactoe;
