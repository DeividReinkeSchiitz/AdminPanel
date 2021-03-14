import { Card } from "@material-ui/core";
import { AccessAlarm, Check, NotInterested } from "@material-ui/icons";
import styled, { css } from "styled-components";


const iconCss = css`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  height: 30px;
  width: 30px;
`;

export const PendentIcon = styled(AccessAlarm)`
  ${iconCss};
  fill: #ffff72;
`;

export const CheckedIcon = styled(Check)`
  ${iconCss};
  fill: #bef67a;
`;
export const WrongIcon = styled(NotInterested)`
  ${iconCss};
  fill: #ff7961;
`;

export const Container = styled.div``;

export const CardImage = styled(Card)`
  max-width: 345px;
  margin-left: 30px;
  min-height: 260px;
`;
