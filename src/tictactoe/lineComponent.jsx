import React, { useContext } from "react";
import styled from "styled-components";
import { GameContext } from "../gameContext";

const LineContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;

  max-width: 669px;
  margin: 0px auto;

  & > div {
    position: relative;
    width: 100%;
    height: 100%;
  }

  @media screen and (min-width: 740px) {
    left: calc((100% - 669px) / 2);
  }
`;

const Line = styled.div`
  position: absolute;
  //   background-color: rgb(247, 95, 78);
  background-color: ${(p) => (p.won ? "green" : "red")};
`;

const getLineFragment = (n = 3) => {
  switch (n) {
    case 1:
      return 1 / 6;

    case 2:
      return 3 / 6;

    case 3:
      return 5 / 6;

    default:
      return "";
  }
};

const getClipArt = (n = 2) => {
  switch (n) {
    case 1:
      return "polygon(99.5% 0,100.5% 0%,0.5% 100.5%,-0.5% 100.5%)";

    case 2:
      return "polygon(0 0, 1% 0, 99% 99%, 100% 101%)";

    default:
      return "";
  }
};
const VerticalLine = styled(Line)`
  width: 3px;
  height: 100%;
  left: calc(${(p) => getLineFragment(p.lineNumber)} * 100%);
`;

const HorizontalLine = styled(Line)`
  width: 100%;
  max-width: 669px;
  height: 2px;
  top: calc(${(p) => getLineFragment(p.lineNumber)} * 100%);
`;

const DiagonalLine = styled(Line)`
  width: 100%;
  height: 100%;
  clip-path: ${(p) => getClipArt(p.lineNumber)};
  border-radius: 5px;
`;

const LineComponent = ({ type = null, lineNumber = 2 }) => {
  const { won } = useContext(GameContext);
  const renderLine = () => {
    switch (type) {
      case "horizontal":
        return (
          <HorizontalLine
            lineNumber={lineNumber}
            className="animate__animated animate__zoomIn"
            won={won}
          />
        );

      case "vertical":
        return (
          <VerticalLine
            lineNumber={lineNumber}
            className="animate__animated animate__zoomIn"
            won={won}
          />
        );

      case "diagonal":
        return (
          <DiagonalLine
            lineNumber={lineNumber}
            className="animate__animated animate__zoomIn"
            won={won}
          />
        );

      default:
        return null;
    }
  };
  return (
    <LineContainer>
      <div>{type && renderLine()}</div>
    </LineContainer>
  );
};

export default LineComponent;
