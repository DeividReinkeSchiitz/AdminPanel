import styled from "styled-components";
import { Button, MenuItem, TextField } from "@material-ui/core";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import React from "react";

export const Container = styled.div`
  display: flex;
  margin-right: 40px;
`;

export const ButtonStyled = styled.button`
  display: flex;

  background-color: transparent;
  outline: none;
  border: none;

  :hover {
    cursor: pointer;
  }
`;
export const StyledTextField = styled(TextField)`
  margin-left: 8px;
  margin-right: 8px;
  width: 150px;
  margin: 0;
  padding: 0;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

export const ContainerInfo = styled.div`
  display: flex;
  flex-direction: column;

  text-align: left;

  margin-right: 16px;
  font-family: Helvetica;
  color: white;

  span:first-child {
    font-weight: bold;
    font-size: 14px;
  }
  span:last-child {
    text-align: right;
    font-size: 12px;
  }
`;

export const MenuItemStyled = styled(MenuItem)`
  min-width: 15.2rem;
  display: flex;
  justify-content: space-between;
  :hover {
    border-left: 2px solid rgb(63, 81, 181);
    cursor: default;
  }
  > * {
    padding-top: 6px;
    padding-bottom: 6px;
  }
`;
interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

export const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 42,
      height: 26,
      padding: "1px",
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#52d869",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#52d869",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  })
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});
