import styled from "styled-components";

export const Container = styled.div`
  border-radius: 4px;

  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: saturate(180%) blur(10px);
  //   height: 500px;
  position: relative;
  top: 40px;
  margin: 0 auto;

  width: 90vw;


`;

export const XO_Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap");
  font-size: 10rem;
  color: rgb(247, 95, 78);
  width: 223px;
  height: 223px;

  font-family: "Patrick Hand", cursive;
  text-align: center;
  cursor: pointer;
  user-select: none;

  @media screen and (max-width: 720px) {
    font-size: 5rem;
  }
`;

export const Player = styled.div`
  padding-top: 100%;

  background-image: url("${(p) =>
    process.env.PUBLIC_URL + `/${p.player}.png`}");

  background-size: cover;
  cursor: pointer;
  user-select: none;
`;

export const Header = styled.div`
  font-size: 3rem;
  color: rgb(247, 95, 78);
  text-align: center;
  color: #152c4e;

  text-decoration: underline rgb(247, 95, 78);
`;
