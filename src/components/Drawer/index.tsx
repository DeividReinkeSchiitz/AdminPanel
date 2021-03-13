import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";

import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemText,
  IconButton,
  Fab,
} from "@material-ui/core";

import {
  Menu,
  Add,
  ChevronLeft,
  ChevronRight,
  ExpandMore,
  ExpandLess,
} from "@material-ui/icons";

import {
  useStyles,
  Loading,
  NavigationTextContent,
  LinkText,
  MuiAccordion,
  MuiAccordionDetails,
  MuiAccordionSummary,
  Logout,
} from "./styles";

import firebase from "../../config/firebaseConfig";

import { Link, NavLink, useHistory } from "react-router-dom";
import AddUserModal from "../AddUserModal";
import Swipeable from "../Swipeable";
import DropdownData from "../DropdownData";

interface DrawerI {
  children: any;
}

interface FirestoreDataI {
  cost: string;
  cpf: string;
  email: string;
  id: string;
  name: string;
  service: string;
  serviceActive?: boolean;
  serviceBegin: string;
  serviceEnd: string;
  notificationToken: string;
}

export default function PersistentDrawerLeft(props: DrawerI) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loadingValue, setLoadingValue] = useState(false);
  const [response, setResponse] = useState<FirestoreDataI[]>([]);
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const [currentUserInfo, setCurrentUserInfo] = useState<FirestoreDataI>({
    cost: "",
    cpf: "",
    email: "",
    id: "",
    name: "",
    service: "",
    serviceActive: false,
    serviceBegin: "",
    serviceEnd: "",
    notificationToken: "",
  });

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };

  const firebaseData = async () => {
    try {
      const db = firebase.firestore();

      setLoadingValue(true);
      const data = await db
        .collection("users")
        .where("disabled", "==", false)
        .get();

      let array: FirestoreDataI[] = [];

      data.forEach((doc: any) => {
        let currentData: FirestoreDataI = {
          ...doc.data(),
          id: doc.id!,
        };
        array.push(currentData);
      });

      setResponse(array);
      setLoadingValue(false);
    } catch (error) {
      console.log(error);
    }

    setCurrentUserInfo({
      cost: "",
      cpf: "",
      email: "",
      id: "",
      name: "",
      service: "",
      serviceActive: false,
      serviceBegin: "",
      serviceEnd: "",
      notificationToken: "",
    });
  };

  useEffect(() => {
    firebaseData();
  }, []);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addName = (text: FirestoreDataI) => {
    setCurrentUserInfo(text);
  };

  const history = useHistory();

  const logOut = async () => {
    try {
      await firebase.auth().signOut();
      localStorage.setItem("userAuthenticated", "false");
      history.push("/Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      <AddUserModal
        handleModal={handleModal}
        open={openModal}
        refresh={firebaseData}
      />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar
          style={{
            width: "100%",
            justifyContent: "space-between",
            marginRight: "50px",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <Menu />
          </IconButton>
          {currentUserInfo.name && <DropdownData data={currentUserInfo} />}
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          {loadingValue && <Loading />}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
          <Logout onClick={logOut}>Logout</Logout>
        </div>
        <List>
          {response.map((text, index) => (
            <div key={text.id}>
              <Swipeable id={text.id} refresh={firebaseData} name={text.name}>
                <MuiAccordion
                  square
                  expanded={expanded === `panel${index + 1}`}
                  onChange={handleChange(`panel${index + 1}`)}
                  style={{ width: "100%" }}
                >
                  <MuiAccordionSummary
                    aria-controls={`panel${index + 1}d-content`}
                    id={`panel${index + 1}d-header`}
                    style={{ width: "100%", background: "#fff" }}
                  >
                    <ListItem key={index} style={{ width: "100%" }}>
                      <ListItemText primary={text.name} />

                      <ExpandMore style={{ marginRight: 5 }} />
                    </ListItem>
                  </MuiAccordionSummary>
                  <MuiAccordionDetails
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    <NavigationTextContent>
                      <Link
                        to={`/relatorios/${text.id}`}
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                        onClick={() => {
                          addName(text);
                        }}
                      >
                        <LinkText>Relatorios</LinkText>
                      </Link>
                    </NavigationTextContent>
                    <Divider />

                    {/*  <NavigationTextContent>
                      <NavLink
                        exact
                        to={`/faturas/${text.id}`}
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                        onClick={() => {
                          addName(text);
                        }}
                      >
                        <LinkText>Faturas</LinkText>
                      </NavLink>
                    </NavigationTextContent>
                    <Divider />
 */}
                    <NavigationTextContent>
                      <NavLink
                        exact
                        to={`/Artes/${text.id}`}
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                        onClick={() => {
                          addName(text);
                        }}
                      >
                        <LinkText>Artes</LinkText>
                      </NavLink>
                    </NavigationTextContent>
                  </MuiAccordionDetails>
                </MuiAccordion>
              </Swipeable>
            </div>
          ))}
        </List>

        <Fab
          color="primary"
          aria-label="add"
          className={classes.addButton}
          onClick={handleModal}
        >
          <Add />
        </Fab>
        {/* 
        <Button className={classes.refreshButton} onClick={firebaseData}>
          <Refresh htmlColor={"#ffffff"}></Refresh>
        </Button> */}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
}
