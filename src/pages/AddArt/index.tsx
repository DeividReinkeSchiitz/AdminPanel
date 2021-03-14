import {
  Button,


  FormControl, InputLabel,
  MenuItem,

  Select
} from "@material-ui/core";
import { PictureAsPdf } from "@material-ui/icons";
import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { InputValuesI } from "../../common/types";
import firebase from "../../config/firebaseConfig";
import {
  ArrawBack,












  ArtImage, ButtonBack, Container,





  ContainerButton,






  DataContainer, DeleteIcon, FindText, FormContainer, Header,







  PdfContainer,


  SpanError, SubmitButton, Title,








  UploadContainer, UploadSpan,





  useStyles
} from "./styles";


interface ParamsI {
  id: string;
}

interface InputErrors {
  month?: boolean;
  year?: boolean;
  week?: boolean;
  type?: boolean;
}

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const weeks = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];

const years = [
  2018,
  2019,
  2020,
  2021,
  2022,
  2023,
  2024,
  2025,
  2026,
  2027,
  2028,
  2029,
  2030,
];

const types = ["Arte", "Cronograma Semanal", "Cronograma Mensal"];

const AddArt: React.FC = (props) => {
  const params = useParams<ParamsI>();
  const history = useHistory();
  const classes = useStyles();

  const [inputValues, setInputValues] = useState<InputValuesI>({});
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [file, setFile] = useState<any>("");
  const [displayError, setDisplayError] = useState("");
  const [inputErrors, setInputErrors] = useState<InputErrors>({});

  const handleUpload = async (event: any) => {
    setDisplayError("");
    setFile(event.target.files[0]);
  };

  const CleanFile = () => {
    setFile("");
  };

  const addInputValue = (
    e: string | unknown,
    key: "month" | "year" | "week" | "type"
  ) => {
    setDisplayError("");
    setInputValues({ ...inputValues, [key]: e });
  };

  const uploadFile = async (count: number) => {
    if (inputValues.type?.includes("Arte") && file.name.includes("pdf")) {
      setDisplayError("Por favor, não inclua PDF's como arte");
      return;
    }
    if (
      inputValues.type?.includes("Cronograma") &&
      !file.name.includes("pdf")
    ) {
      setDisplayError("Por favor, inclua somente PDF's como arte");
      return;
    }
    try {
      const myFile: any = file;

      const fileExt = myFile.name.slice(
        myFile.name.lastIndexOf("."),
        myFile.name.length
      );

      const fileName =
        count === 0
          ? myFile.name
          : myFile.name.replace(fileExt, `(${count})${fileExt}`);

      const ref = `users/${params.id}/arts/${fileName}`;
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
      let date = JSON.stringify(new Date()).slice(1, 11);

      // DATA FROM FIRESTORE
      const db = firebase.firestore();

      let currentData = {
        createdAt: date.replaceAll("-", "/"),
        description: "",
        downloadUrl: downloadUrl,
        month: inputValues.month,
        type: inputValues.type,
        week: inputValues.week || "null",
        year: inputValues.year,
        status: "Pendente",
        fileName,
      };

      const user = db.collection("users").doc(params.id);
      await user.collection("arts").add(currentData);

      //send notification to the client
      setButtonDisabled(false);
    } catch (error) {
      console.log(error);
    } finally {
      history.push(`/Artes/${params.id}`);
    }
  };

  const validate = async () => {
    let haveError = false;
    if (!file) {
      setDisplayError(" * Por favor, selecione o arquivo que queira adicionar");
    } else {
      setDisplayError("");
    }
    //VERIFY IF SOME INPUTS ARE EMPTY
    let currentInputErrors = inputErrors;

    for (const [key, value] of Object.entries(inputValues)) {
      if (key === "week" && inputValues.type?.includes("Cronograma")) {
        continue;
      }
      currentInputErrors = {
        ...currentInputErrors,
        [`${key}`]: !Boolean(value),
      };

      if (!Boolean(value)) {
        haveError = true;
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
      await uploadFile(0);
    }
  };

  return (
    <Container>
      <Header>
        <Link
          to={`/Artes/${params.id}`}
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
        <Title>Adicionar Nova Arte</Title>
      </Header>

      <FormContainer noValidate autoComplete="off">
        <DataContainer>
          <div
            style={{
              flex: 0.7,
              justifyContent: "space-between",
              alignItems: "space-between",
              height: "100%",
            }}
          >
            {/*  Months Dropdown  */}
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Mes</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={inputValues.month || ""}
                defaultValue={""}
                onChange={(e) => {
                  addInputValue(e.target.value, "month");
                }}
              >
                {months.map((month) => (
                  <MenuItem value={month} key={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/*  Years Dropdown  */}
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Ano</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={inputValues.year || ""}
                onChange={(e) => {
                  addInputValue(e.target.value, "year");
                }}
              >
                {years.map((year) => (
                  <MenuItem value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/*  Types Dropdown  */}
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={inputValues.type || ""}
                onChange={(e: any) => {
                  if (e.target.value?.includes("Mensal")) {
                    setInputValues({
                      ...inputValues,
                      week: "null",
                    });
                  }

                  addInputValue(e.target.value, "type");
                }}
              >
                {types.map((type) => (
                  <MenuItem value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/*  Weeks Dropdown  */}
            <FormControl
              className={classes.formControl}
              disabled={inputValues.type?.includes("Mensal")}
            >
              <InputLabel id="demo-simple-select-label">Semana</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={inputValues.week || ""}
                onChange={(e) => {
                  addInputValue(e.target.value, "week");
                }}
              >
                {weeks.map((week) => (
                  <MenuItem value={week} key={week}>
                    {week}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <UploadContainer>
            {file?.name &&
              !file?.name?.includes("pdf") &&
              !inputValues.type?.includes("Cronograma") && (
                <ArtImage
                  background-size="cover"
                  src={URL.createObjectURL(file)}
                />
              )}
          </UploadContainer>
        </DataContainer>

        {file?.name && file?.name?.includes("pdf") && (
          <PdfContainer>
            <PictureAsPdf
              style={{ width: 50, height: 50 }}
              htmlColor="#F44336"
            />
            <UploadSpan>{file.name || "Nome_do_Arquivo.pdf"}</UploadSpan>
            <DeleteIcon onClick={CleanFile} />
          </PdfContainer>
        )}

        {displayError && <SpanError>{displayError}</SpanError>}
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
        accept="application/pdf, image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleUpload}
      />
      <label
        htmlFor="raised-button-file"
        style={{
          marginLeft: "20px",
        }}
      >
        <Button
          variant="text"
          component="span"
          style={{
            marginLeft: "55%",
          }}
        >
          <FindText>Escolher Arquivo</FindText>
        </Button>
      </label>
    </ContainerButton>
  );
};

export default AddArt;
