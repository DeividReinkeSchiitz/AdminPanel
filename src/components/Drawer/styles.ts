import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const drawerWidth = 240;

export const Loading = styled(CircularProgress)`
  padding: 10px;
`;

export const ExpandButton = styled.button`
  background: none;
  outline: none;
  border-width: 0px;
  :hover {
    cursor: pointer;
  }
  width: 100%;
  margin: 0px;
`;

export const NavigationTextContent = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0px 10px 50px;

  background: rgba(0, 0, 0, 0.02);
`;

export const LinkText = styled.span`
  color: rgba(0, 0, 0, 0.6);
  font-family: Helvetica;
  font-size: 14px;

  :hover {
    color: rgba(0, 0, 0, 0.3);
  }
`;

export const useStyles = makeStyles((theme: any) =>
  createStyles({
    reloadSpan: {
      color: "white",
      paddingLeft: "5px",
    },
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "space-between",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    addButton: {
      position: "absolute",
      bottom: "0",
      right: "0",
      margin: "20px",
    },
    refreshButton: {
      position: "absolute",
      bottom: "0",
      left: "0",
      background: "#3F51B5",
      margin: "20px",
      outline: "none",
    },
  })
);

export const MuiAccordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(Accordion);

export const MuiAccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(AccordionSummary);

export const MuiAccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(AccordionDetails);

export const Logout = styled.span`
  margin-right: 10px;
  font-size: 17px;
  font-family: Roboto;

  border-bottom: 1px solid black;

  :hover {
    cursor: pointer;
  }
`;
