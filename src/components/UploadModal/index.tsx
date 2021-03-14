import { Backdrop, Button, Fade } from "@material-ui/core";
import { CloudUpload, PictureAsPdf, Save } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import firebase from "../../config/firebaseConfig";
import {
  ButtonsContainer, CancelButton,






  CollapseSuccess, Container,






  ContainerButton, CurrentModal,








  DeleteIcon, DescriptionInput,






  FindText, PdfContainer,


  SpanError, SubmitButton, TitleMember,





  UploadSpan
} from "./styles";


interface propsI {
  open: boolean;
  handleOpen: () => any;
  id: string;
  updateData: () => void;
}

const UploadModal = (props: propsI) => {
  const [file, setFile] = useState<any>(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [open, setOpen] = useState(false);
  const [dispayError, setDispayError] = useState(false);

  const handleUpload = (event: any) => {
    setDescriptionError(false);
    setDispayError(false);
    setFile(event);
  };

  const uploadFile = async (count: number) => {
    try {
      const myFile: any = file.target.files[0];

      const fileExt = myFile.name.slice(
        myFile.name.lastIndexOf("."),
        myFile.name.length
      );

      const fileName =
        count === 0
          ? myFile.name
          : myFile.name.replace(fileExt, `(${count})${fileExt}`);

      const ref = `users/${props.id}/reports/${fileName}`;
      var storageRef = firebase.storage().ref(ref);

      const onResolve = async () => {
        uploadFile(count + 1);
      };

      const onReject = async () => {
        const snapshot = await storageRef.put(myFile);
        const downloadUrl = await snapshot.ref.getDownloadURL();

        await uploadContent(fileName, downloadUrl);
      };

      // way to know if a file already exist
      await storageRef.getDownloadURL().then(onResolve, onReject);
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(true);

      props.updateData();
      setDescription("");
      setFile(null);
      setDispayError(false);
      setDescriptionError(false);
      setOpen(false);
      props.handleOpen();
    }
  };

  const uploadContent = async (fileName: string, downloadUrl: any) => {
    // Informations about the current file added in firestore
    let date = new Date().toLocaleString();
    date = date.slice(0, date.indexOf(","));

    let currentFileData = {
      createdAt: date,
      shortDescription: description,
      fileName: fileName,
      downloadUrl: downloadUrl,
    };

    const db = firebase.firestore();

    const user = await db.collection("users").doc(props.id);
    await user.collection("reports").add(currentFileData);

  };

  const addButtonPressed = () => {
    if (description === "") {
      setDescriptionError(true);
      setButtonDisabled(false);
      return;
    }
    if (file == null) {
      setDispayError(true);
      setButtonDisabled(false);
      return;
    }

    uploadFile(0);
  };

  const CleanFile = () => {
    setFile(null);
  };

  useEffect(() => {
    setButtonDisabled(false);
  }, [open]);
  return (
    <div>
      <CurrentModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open} style={{ outline: "none" }}>
          <>
            <Container>
              <TitleMember>Escolha o Arquivo</TitleMember>
              <DescriptionInput
                error={descriptionError}
                id="outlined-basic"
                label="Descrição"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <SpanError style={{ display: dispayError ? "inline" : "none" }}>
                * Por favor, selecione o arquivo que queira adicionar
              </SpanError>
              {file?.target?.files[0]?.name && (
                <PdfContainer>
                  <PictureAsPdf style={{ width: 50, height: 50 }} />
                  <UploadSpan>
                    {file?.target?.files[0]?.name || "Nome_do_Arquivo.pdf"}
                  </UploadSpan>
                  <DeleteIcon onClick={CleanFile} />
                </PdfContainer>
              )}
              <ButtonsContainer>
                <CancelButton
                  variant="contained"
                  size="small"
                  onClick={() => props.handleOpen()}
                >
                  <span>X</span>
                </CancelButton>
                <UploadButton handleUpload={handleUpload} />

                <SubmitButton
                  disabled={buttonDisabled}
                  variant="contained"
                  size="small"
                  startIcon={<CloudUpload htmlColor="#fff" scale={0.5} />}
                  onClick={() => {
                    setButtonDisabled(true);
                    addButtonPressed();
                  }}
                >
                  <span>Salvar</span>
                </SubmitButton>
              </ButtonsContainer>
            </Container>

            <CollapseSuccess in={open}>
              <Alert>Documento Adicionado com sucesso</Alert>
            </CollapseSuccess>
          </>
        </Fade>
      </CurrentModal>
    </div>
  );
};

interface HandleButtonI {
  handleUpload: (event: any) => void;
}

const UploadButton = ({ handleUpload }: HandleButtonI) => {
  return (
    <ContainerButton>
      <input
        accept="application/pdf"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleUpload}
      />
      <label
        htmlFor="raised-button-file"
        style={{
          height: "100%",
          width: "100%",
          marginRight: "10px",
        }}
      >
        <Button
          variant="contained"
          component="span"
          style={{
            background: "#3f51b5",
            height: "100%",
            width: "100%",
          }}
        >
          <Save htmlColor="#fff" />
          <FindText>Escolher</FindText>
        </Button>
      </label>
    </ContainerButton>
  );
};

export default UploadModal;
