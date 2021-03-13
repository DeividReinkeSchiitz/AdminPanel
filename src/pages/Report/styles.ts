import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: relative;

  flex-direction: column;
  max-width: 100%;

  min-height: 65.5vh;
  height: 100%;
  margin: -50px;
  padding: 50px;
  background-color: #f6f7fb;
  padding-bottom: 100px;
  font-family: Helvetica;
`;

export const Header = styled.div`
  display: flex;
  overflow-x: none;
  width: 100%;
  justify-content: space-between;

  flex-direction: row;
  height: auto;
  height: min-content;
`;

export const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
`;
export const Title = styled.div`
  font-size: 40px;
`;

export const ContainerCount = styled.div`
  background-color: #4268f6;
  border-radius: 20px;
  height: min-content;
  align-self: center;
  margin-left: 10px;

  padding: 5px 20px;
  > span {
    color: #fff;
  }
`;

export const UploadButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  max-width: 150px;
  padding: 10px 15px;
  background-color: #4268f6;
  text-align: center;
  align-self: center;

  color: #fff;
  border-radius: 5px;
  > span {
    display: flex;
    align-self: center;
    padding-left: 20px;
  }

  :hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;

export const ImageFileSearch = styled.img`
  position: absolute;
  height: 40vh;
  width: 40vw;
  bottom: 0;
  right: 0;
  z-index: 0;
`;
