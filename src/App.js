import styled from "styled-components";
import Background from "./background/background";
import GameProvider from "./gameContext";
import Header from "./header/header";
import PlayerSelection from "./playerSelection/playerSelection";
import Tictactoe from "./tictactoe/tictactoe";
import 'animate.css';

const ContentContainer = styled.div`
  padding-top: 100px;
`;
function App() {
  return (
    <div className="App">
      <Background />
      <Header />
      <GameProvider>
        <ContentContainer>
          <PlayerSelection />
          <Tictactoe />
        </ContentContainer>
      </GameProvider>
    </div>
  );
}

export default App;
