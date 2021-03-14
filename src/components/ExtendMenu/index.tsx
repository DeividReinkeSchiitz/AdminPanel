import { Button, Menu } from "@material-ui/core";
import { DeleteOutline, MoreHoriz, Tv } from "@material-ui/icons";
import React from "react";
import firebase from "../../config/firebaseConfig";
import { MenuItemComponent, MenuText } from "./styles";


interface PropsI {
  fileName: string;
  userId: string;
  docId: string;
  updateData: () => void;
  downloadUrl: string;
  collection: "reports" | "bills" | "arts";
  style?: any;
}

const ExtendMenu = (props: PropsI) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteFile = async () => {
    const ref = `users/${props.userId}/${props.collection}/${props.fileName}`;
    const db = await firebase.storage();
    const storageRef = await db.ref(ref);

    await storageRef.delete();
  };

  const deleteContent = async () => {
    const db = firebase.firestore();

    await db
      .collection("users")
      .doc(props.userId)
      .collection(props.collection)
      .doc(props.docId)
      .delete();
  };

  const deleteCurrentData = async () => {
    try {
      await deleteFile();
      await deleteContent();
    } catch (error) {
      alert(error);
    } finally {
      props.updateData();
      handleClose();
    }
  };

  const openFile = () => {
    window.open(props.downloadUrl, "_blank");
    handleClose();
  };

  return (
    <div style={{ marginRight: -14, ...props?.style }}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHoriz htmlColor="rgba(0,0,0,0.6)" />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{}}
      >
        <MenuItemComponent onClick={deleteCurrentData}>
          <DeleteOutline htmlColor={"#c0392b"} />
          <MenuText red>Deletar</MenuText>
        </MenuItemComponent>

        <MenuItemComponent onClick={openFile}>
          <Tv htmlColor={"rgba(0,0,0,0.6)"} />
          <MenuText>Abrir</MenuText>
        </MenuItemComponent>
      </Menu>
    </div>
  );
};

export default ExtendMenu;
