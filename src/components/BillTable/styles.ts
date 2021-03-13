import styled from "styled-components";
import { Paper } from "@material-ui/core";

export const PaperContainer = styled(Paper)`
  margin-top: 40px;
  z-index: 2;
`;

export const Button = styled.div`
  align-items: center;
  padding-right: 10px;
  width: auto;

  :hover {
    cursor: pointer;
  }
`;

export const ChangeStatus = styled.button`
  background: none;
  outline: none;
  border: none;

  :hover {
    cursor: pointer;
  }
`;
