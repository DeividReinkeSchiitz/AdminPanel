import { Button, Collapse, Modal, TextField } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;

  width: 60vw;
  max-width: 400px;

  background: #f0f0f0;
  border-radius: 10px;
  padding: 20px;
  position: relative;
`;

export const CurrentModal = styled(Modal)`
  display: flex;

  align-items: center;
  align-self: center;
  justify-content: center;
`;

export const TitleMember = styled.span`
  color: #3f51b5;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
  font-family: Helvetica;
  text-align: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const button = css`
  display: flex;
  padding: 12px 3vw;
`;

export const SubmitButton = styled(Button)`
  ${button}
  background-color: #00B13A;
  width: 100%;
  margin-left: 10px;
  > span {
    color: #fff;
  }

  :hover {
    background-color: #00b13a;
    opacity: 0.8;
  }
`;

export const DescriptionInput = styled(TextField)`
  width: 100%;
  align-self: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ContainerButton = styled.div`
  display: flex;
  width: 100%;
  align-self: left;
  flex-direction: row;
`;

export const CancelButton = styled(Button)`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
`;

export const UploadSpan = styled.span`
  margin-left: 15px;
  align-self: center;
  font-size: 18px;
`;

export const PdfContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin: 5px 0px;
`;

export const DeleteIcon = styled(DeleteOutline)`
  justify-content: right;
  position: absolute;
  right: 0;
  padding: 7px;

  :hover {
    background: #ccc;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const CollapseSuccess = styled(Collapse)`
  position: absolute;
  width: 50%;
  margin: auto;
  top: 0;
  margin-top: 50px;
`;

export const SpanError = styled.span`
  color: #c0392b;
  font-size: 13px;
`;

export const FindText = styled.span`
  color: #fff;
  margin-left: 15px;
`;
