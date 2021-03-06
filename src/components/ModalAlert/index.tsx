/* eslint-disable no-useless-escape */
import { Backdrop, Fade } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../config/firebaseConfig";
import {
  ButtonsContainer, CancelButton, Container,
  CurrentModal,




  Description, RemoveButton,



  TitleContainer, TitleMember
} from "./styles";



interface ModalComponentI {
  handleModal: () => any;
  open: boolean;
  refresh: () => any;
  id: string;
  name: string;
}

const ModalComponent = (props: ModalComponentI) => {
  const history = useHistory();

  /*   
  const removeUser = async () => {
    try {
      //REMOVE FIRESTORE DATA
      const dbf = firebase.firestore();
      await dbf.collection("users").doc(props.id).delete();

      // REMOVE STORAGE DATA
      const dbs = firebase.storage();

      const storageRef = dbs.ref("users");

      const users = await storageRef.listAll();
      users.prefixes.map(async (user) => {
        if (user.name !== props.id) return;

        const dirs = await user.listAll();
        dirs.prefixes.map(async (dir) => {
          const files = await dir.listAll();

          files.items.map(async (file) => {
            await file.delete();
          });
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      props.refresh();
      props.handleModal();
      history.push("/Home");
    }
  }; */

  const removeUser = async () => {
    try {
      const db = firebase.firestore();

      await db.collection("users").doc(props.id).update({
        disabled: true,
      });

      const apiUrl = "";

      await axios.post(apiUrl, {
        uid: props.id,
      });
    } catch (error) {
      console.log(error);
    } finally {
      props.refresh();
      props.handleModal();
      history.push("/Home");
    }
  };

  return (
    <div>
      <CurrentModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open} style={{ outline: "none" }}>
          <Container>
            <TitleContainer>
              <TitleMember>
                Tem certeza que deseja remover o usuario: {props.name}?
              </TitleMember>
            </TitleContainer>

            <Description>
              Ap??s a remo????o todos os dados do cliente ser??o exluidos, incluindo
              os arquivos e informa????es remanescentes.
            </Description>
            <ButtonsContainer>
              <RemoveButton onClick={removeUser}>
                <span>Remover</span>
              </RemoveButton>

              <CancelButton onClick={() => props.handleModal()}>
                <span>Cancelar</span>
              </CancelButton>
            </ButtonsContainer>
          </Container>
        </Fade>
      </CurrentModal>
    </div>
  );
};

export default ModalComponent;
