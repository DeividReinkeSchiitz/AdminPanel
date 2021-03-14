import { Delete } from "@material-ui/icons";
import styled from "styled-components";

export const SwipeableRight = styled.div`
  display: flex;
  background: #c0392b;

  width: 100%;
  height: 100%;

  opacity: 0.8;
  align-items: center;
`;

export const DeleteText = styled.span`
  color: var(--primary);
`;

export const DeleteIcon = styled(Delete)`
  height: 70%;
  padding: 20px;
  width: 40px;
`;
