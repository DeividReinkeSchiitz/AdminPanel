import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 40vh;

  align-items: center;
  justify-content: center;

  overflow: none;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;

  /*   background: #f6f7fb; */
  padding-top: 250px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  > span {
    margin-top: 30px;
    font-size: 20px;
  }
`;

export const Image = styled.img`
  width: 70%;
  height: 70%;

  /*   min-width: 200px;
  min-height: 200px; */
`;
