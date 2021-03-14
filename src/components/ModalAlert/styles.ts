import { Modal } from "@material-ui/core";
import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;

  width: 60vw;
  max-width: 400px;

  /* background: #f0f0f0; */
  background: #fff;
  border-radius: 10px;
  padding: 24px;

  font-family: Helvetica, sans-serif;
`;

export const CurrentModal = styled(Modal)`
  display: flex;

  align-items: center;
  align-self: center;
  justify-content: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TitleMember = styled.span`
  font-size: 20px;
  font-weight: bold;
  opacity: 0.9;

  margin-bottom: 15px;
  font-size: 17px;
  font-family: Helvetica;
`;

export const Description = styled.span`
  font-size: 15px;
  opacity: 0.7;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  margin-top: 45px;
`;

const button = css`
  outline: none;
  border: none;
  display: flex;
  padding: 10px 2vw;

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export const RemoveButton = styled.button`
  ${button}
  background-color: #c0392b;
  margin-right: 15px;
  > span {
    color: #fff;
  }
`;

export const CancelButton = styled.button`
  ${button}
`;
