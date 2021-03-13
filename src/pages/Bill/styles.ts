import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin: -50px;
  padding: 50px;
  background-color: #f6f7fb;

  font-family: Helvetica;

  position: relative;
`;

export const Header = styled.div`
  display: flex;
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
  height: auto;

  max-width: 150px;
  margin-right: 40px;
  padding: 10px 15px;
  border-radius: 5px;

  justify-content: space-evenly;

  text-align: center;
  align-items: center;
  align-self: center;

  background-color: #4268f6;
  color: #fff;

  :hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;

export const BillText = styled.span``;

export const ImageFileSearch = styled.img`
  position: absolute;
  height: 40vh;
  width: 40vw;
  bottom: 0;
  right: 0;
  z-index: 0;
`;
