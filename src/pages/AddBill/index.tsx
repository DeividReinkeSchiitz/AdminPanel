import { Button } from "@material-ui/core";
import { PictureAsPdf } from "@material-ui/icons";
import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import SwitchStatus from "../../components/SwitchStatus";
import firebase from "../../config/firebaseConfig";
import {
  ArrawBack,


  BillCodeField, ButtonBack, Container,








  ContainerButton,





  DeleteIcon, DueDateField,


  FindText, FormContainer, Header,




  NameField,





  PdfContainer,



  SpanError, SubmitButton,


  SwitchContainer, Title,




  UploadSpan
} from "./styles";


interface ParamsI {
  id: string;
}
interface InputValues {
  billCode: string;
  dueDate: string;
  name: string;
  status: boolean;
}

const AddBill: React.FC = (props) => {
  const params = useParams<ParamsI>();
  const history = useHistory();

  const [inputValues, setInputValues] = useState<InputValues>({
    billCode: "",
    dueDate: "",
    name: "",
    status: false,
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [file, setFile] = useState<any>("");
  const [displayError, setDisplayError] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    billCode: false,
    name: false,
    dueDate: false,
    cost: false,
    service: false,
  });

  const handleUpload = (event: any) => {
    setDisplayError(false);
    setFile(event);
  };

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    setInputValues({ ...inputValues, status: value });
  };

  const CleanFile = () => {
    setFile("");
  };

  const addInputValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: "billCode" | "name" | "dueDate" | "cost" | "service"
  ) => {
    setInputValues({ ...inputValues, [key]: e.target.value });
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

      const ref = `users/${params.id}/bills/${fileName}`;
      var storageRef = firebase.storage().ref(ref);

      const onResolve = async () => {
        uploadFile(count + 1);
      };

      const onReject = async () => {
        const snapshot = await storageRef.put(myFile);
        const downloadUrl = await snapshot.ref.getDownloadURL();
        uploadContent(fileName, downloadUrl);
      };

      // way to know if a file already exist
      await storageRef.getDownloadURL().then(onResolve, onReject);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadContent = async (fileName: string, downloadUrl: any) => {
    try {
      let date = new Date().toLocaleString();
      date = date.slice(0, date.indexOf(","));
      // DATA FROM FIRESTORE
      const db = firebase.firestore();

      const currentUser = await db.collection("users").doc(params.id).get();

      const currentUserData = await currentUser.data();

      let currentData = {
        ...inputValues,
        cost: currentUserData?.cost,
        service: currentUserData?.service,
        createdAt: date,
        fileName: fileName,
        downloadUrl: downloadUrl,
      };

      await db
        .collection("users")
        .doc(params.id)
        .collection("bills")
        .add(currentData);
    } catch (error) {
      console.log(error);
    } finally {
      history.push(`/faturas/${params.id}`);
    }
  };

  const validate = async () => {
    let haveError = false;
    if (!file) {
      setDisplayError(true);
    } else {
      setDisplayError(false);
    }
    //VERIFY IF SOME INPUTS ARE EMPTY
    let currentInputErrors = inputErrors;

    for (const [key, value] of Object.entries(inputValues)) {
      if (key !== "status") {
        currentInputErrors = {
          ...currentInputErrors,
          [`${key}`]: !Boolean(value),
        };

        if (!Boolean(value)) {
          haveError = true;
        }
      }
    }

    setInputErrors(currentInputErrors);

    if (haveError || displayError) {
      setButtonDisabled(false);
    }

    return !(haveError || displayError);
  };

  const submitPressed = async () => {
    const isValidate = await validate();
    if (isValidate && file) {
      var user = firebase.auth().currentUser;
      if (!user) return;

      setButtonDisabled(true);
      uploadFile(0);
    }
  };

  return (
    <Container>
      <Header>
        <Link
          to={`/faturas/${params.id}`}
          style={{
            textDecoration: "none",
            color: "#000",
            fill: "#000",
          }}
        >
          <ButtonBack color="primary" aria-label="upload picture">
            <ArrawBack />
          </ButtonBack>
        </Link>
        <Title>Adicionar Nova Fatura</Title>
      </Header>

      <FormContainer noValidate autoComplete="off">
        <SwitchContainer>
          <SwitchStatus
            checked={inputValues?.status || false}
            handleChecked={handleChecked}
          />
        </SwitchContainer>

        <BillCodeField
          error={inputErrors.billCode}
          label="Código da Fatura"
          type="number"
          variant="standard"
          value={inputValues.billCode}
          onChange={(e) => addInputValue(e, "billCode")}
        />
        <NameField
          error={inputErrors.name}
          label="Nome"
          variant="standard"
          value={inputValues.name}
          onChange={(e) => addInputValue(e, "name")}
        />
        <DueDateField
          error={inputErrors.dueDate}
          label="Data de Validade"
          variant="standard"
          type="date"
          value={inputValues.dueDate}
          onChange={(e) => {
            addInputValue(e, "dueDate");
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {displayError && (
          <SpanError>
            * Por favor, selecione o arquivo que queira adicionar
          </SpanError>
        )}

        {file?.target?.files[0]?.name && (
          <PdfContainer>
            <PictureAsPdf
              style={{ width: 50, height: 50 }}
              htmlColor="#F44336"
            />
            <UploadSpan>
              {file.target.files[0].name || "Nome_do_Arquivo.pdf"}
            </UploadSpan>
            <DeleteIcon onClick={CleanFile} />
          </PdfContainer>
        )}

        <UploadButton handleUpload={handleUpload} />

        <SubmitButton onClick={submitPressed} disabled={buttonDisabled}>
          <span>Salvar</span>
        </SubmitButton>
      </FormContainer>
    </Container>
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
          variant="text"
          component="span"
          style={{
            height: "100%",
            width: "50%",
          }}
        >
          <FindText>Escolher Arquivo</FindText>
        </Button>
      </label>
    </ContainerButton>
  );
};

export default AddBill;
