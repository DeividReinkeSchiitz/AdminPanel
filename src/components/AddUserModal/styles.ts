import styled, { css } from "styled-components";
import { MenuItem, Input, Modal, TextField, Button } from "@material-ui/core";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;

  width: 60vw;
  max-width: 400px;

  background: #f0f0f0;
  border-radius: 10px;
  padding: 40px;
`;

export const CurrentModal = styled(Modal)`
  display: flex;

  align-items: center;
  align-self: center;
  justify-content: center;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;

  height: auto;
  width: auto;
`;

const cssInput = css`
  width: 100%;
  margin-bottom: 10px;
`;

export const TitleMember = styled.span`
  color: var(--gray);
  opacity: 0.7;
  font-size: 20px;
  margin-bottom: 20px;
  font-family: Helvetica;
  align-self: center;
`;

export const EmailField = styled(TextField)`
  ${cssInput}
`;
export const CpfField = styled(TextField)`
  ${cssInput}
`;
export const NameField = styled(TextField)`
  ${cssInput}
`;

export const ServiceField = styled(TextField)`
  ${cssInput}
`;
export const CostField = styled(TextField)`
  ${cssInput}
`;
export const PaymentField = styled(TextField)`
  ${cssInput}
`;

export const EmailInput = styled(Input)`
  ${cssInput}
`;

export const CreateButton = styled(Button)`
  padding: 12px;
`;
/* 
export const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
 */

export const StyledTextField = styled(TextField)`
  ${cssInput}
`;
