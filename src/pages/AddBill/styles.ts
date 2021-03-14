import { Button, TextField } from "@material-ui/core";
import { ArrowBackIos, DeleteOutline } from "@material-ui/icons";
import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin: -50px;
  padding: 50px;
  background-color: #f6f7fb;

  font-family: Helvetica;
`;

export const Title = styled.span`
  display: flex;
  align-self: center;
  justify-content: center;

  color: #3f51b5;

  font-family: Helvetica;
  font-weight: bold;
  font-size: 25px;

  margin-right: 35px;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  flex-direction: row;
  height: auto;
  height: min-content;

  margin-bottom: 20px;
`;

export const ButtonBack = styled(Button)`
  display: flex;

  width: 70px;
  height: 70px;
  border-radius: 50%;

  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const ArrawBack = styled(ArrowBackIos)`
  display: flex;
  align-self: center;
  justify-content: center;
  color: #3f51b5;

  width: 40px;
  height: 40px;
  margin: auto;
  margin-left: 30%;

  flex-shrink: 0;
`;

export const FormContainer = styled.form`
  display: flex;
  position: relative;
  flex-direction: column;

  background: #fff;

  width: auto;
  height: auto;

  padding: 50px;
  align-self: center;
  border-radius: 5px;
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

const Commonfield = css`
  margin-bottom: 20px;
  width: 400px;
`;

export const BillCodeField = styled(TextField)`
  ${Commonfield}
`;
export const NameField = styled(TextField)`
  ${Commonfield}
`;
export const DueDateField = styled(TextField)`
  ${Commonfield}
`;
export const StatusField = styled(TextField)`
  ${Commonfield}
`;
export const ServiceField = styled(TextField)`
  ${Commonfield}
`;
export const CostField = styled(TextField)`
  ${Commonfield}
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

export const SubmitButton = styled(Button)`
  color: #3f51b5;
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;

  border: none;
  outline: none;

  > span {
    font-size: 15px;
    font-weight: bold;
  }

  :hover {
    cursor: pointer;
  }

  background: #f6f7fb;
`;

export const ContainerButton = styled.div`
  display: flex;
  width: 100%;
  margin-left: 50%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const FindText = styled.span`
  color: #3f51b5;
  margin-left: 15px;
`;

export const SwitchContainer = styled.div`
  display: flex;
  position: absolute;

  top: 0;
  right: 0;

  margin: 20px;
`;

export const SpanError = styled.span`
  color: #c0392b;
  font-size: 13px;
`;
