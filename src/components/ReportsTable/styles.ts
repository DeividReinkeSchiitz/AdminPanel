import { Paper } from "@material-ui/core";
import styled from "styled-components";

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
