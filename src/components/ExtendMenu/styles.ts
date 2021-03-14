import { MenuItem } from "@material-ui/core";
import styled from "styled-components";

export const MenuText = styled.span`
  margin: 0px;
  padding: 0px;
  margin-left: 8px;
  color: ${(props: { red?: boolean }) =>
    props.red ? "#c0392b" : "rgba(0,0,0,0.6)"};
`;

export const MenuItemComponent = styled(MenuItem)`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 15px;
`;
