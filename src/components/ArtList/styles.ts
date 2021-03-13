import styled, { css } from "styled-components";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: "#f6f7fb",
    },
    TextMonth: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
      fontWeight: "bold",
    },
    TextWeek: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
      fontWeight: "normal",
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  })
);

export const ContainerCount = styled.div`
  background-color: #4268f6;
  border-radius: 20px;
  height: min-content;
  margin-left: 20px;
  padding: 2.6px 12px;
  > span {
    color: #fff;
    font-size: 13px;
  }
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 95vw;
  height: 100%;
`;
