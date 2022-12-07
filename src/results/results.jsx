import { Modal } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";
import { GameContext } from "../gameContext";
import { Header } from "../helper/helper.styled";

const ResultText = styled.div`
  font-size: 72px;
  background: -webkit-linear-gradient(45deg, #09009f, #00ff95 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;
const Results = () => {
  const { isTerminal, restartGame, resultText } = useContext(GameContext);
  return (
    <div>
      <Modal
        open={isTerminal}
        onOk={restartGame}
        okText="Restart"
        centered
        cancelButtonProps={{ style: { display: "none" } }}
        // okButtonProps={{
        //   style: { background: "#152c4e", color: "rgb(247, 95, 78)" },
        // }}
      >
        <Header>Result</Header>
        <ResultText>{resultText}</ResultText>
      </Modal>
    </div>
  );
};

export default Results;
