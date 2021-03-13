import React, { useState } from "react";

import {
  SwipeableList,
  SwipeableListItem,
} from "@sandstreamdev/react-swipeable-list";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import firebase from "../../config/firebaseConfig";

import { SwipeableRight, DeleteText, DeleteIcon } from "./styles";
import ModalAlert from "../ModalAlert";

interface SwipeableI {
  children: any;
  id: string;
  refresh: () => any;
  name: string;
}
const Swipeable = (props: SwipeableI) => {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <SwipeableList>
      <ModalAlert
        name={props.name}
        handleModal={handleModal}
        open={openModal}
        refresh={props.refresh}
        id={props.id}
      />
      <SwipeableListItem
        swipeRight={{
          content: (
            <SwipeableRight>
              <DeleteIcon htmlColor={"#fff"}></DeleteIcon>
            </SwipeableRight>
          ),
          action: () => setOpenModal(true),
        }}
      >
        {props.children}
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Swipeable;
