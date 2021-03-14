import {
  SwipeableList,
  SwipeableListItem
} from "@sandstreamdev/react-swipeable-list";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import React, { useState } from "react";
import ModalAlert from "../ModalAlert";
import { DeleteIcon, SwipeableRight } from "./styles";



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
