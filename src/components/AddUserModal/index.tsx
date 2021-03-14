/* eslint-disable no-useless-escape */
import { Backdrop, Fade, InputAdornment } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import React, { useState } from "react";
import cnpjValidation from "../../common/functions/cnpjValidation";
import cpfValidation from "../../common/functions/cpfValidation";
import { cnpjMask, cpfMask } from "../../common/functions/mask";
import firebase from "../../config/firebaseConfig";
import {
  Container,
  CostField, CpfField,
  CreateButton, CurrentModal, EmailField,
  FormContainer, NameField,
  PaymentField, ServiceField,
  StyledTextField, TitleMember
} from "./styles";




interface ModalComponentI {
  handleModal: () => any;
  open: boolean;
  refresh: () => any;
}

interface inputI {
  email: string;
  name: string;
  cpf: string;
  cost: number;
  service: string;
  serviceEnd: string;
  serviceBegin: string;
  paymentUrl: string;
}
interface InputErrorsI {
  email?: boolean;
  name?: boolean;
  cpf?: boolean;
  cost?: boolean;
  service?: boolean;
  serviceEnd?: boolean;
  serviceBegin?: boolean;
  paymentUrl?: boolean;
}
const ModalComponent = (props: ModalComponentI) => {
  const [inputValues, setInputValues] = useState<inputI>({
    email: "",
    name: "",
    cpf: "",
    cost: 0,
    service: "",
    serviceEnd: "",
    serviceBegin: "",
    paymentUrl: "",
  });
  const [inputErrors, setInputErrors] = useState<InputErrorsI>({});

  const validate = () => {
    // VALIDATE EMPTY DATA
    let errors = inputErrors;

    for (const [key, value] of Object.entries(inputValues)) {
      errors = {
        ...errors,
        [`${key}`]: !Boolean(value),
      };
    }

    // VALIDATE EMAIL
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputValues?.email)) {
      errors.email = true;
    }

    if (inputValues.cpf.length > 14) {
      //VALIDATE CNPJ
      if (!cnpjValidation(inputValues.cpf)) {
        errors.cpf = true;
      }
    } else {
      //VALIDATE CPF
      if (!cpfValidation(inputValues.cpf)) {
        errors.cpf = true;
      }
    }

    setInputErrors(errors);

    let haveError = false;
    for (const [key, value] of Object.entries(errors)) {
      if (value) {
        haveError = true;
      }
    }

    if (haveError) return true;
  };

  const addNewUser = async () => {
    if (validate()) return;

    try {
      const db = firebase.firestore();
      const id = Math.random() * 100000000000000000000;
      await db
        .collection("users")
        .doc(id.toString())
        .set({
          ...inputValues,
          disabled: false,
          serviceActive: true,
        });

      props.handleModal();
      props?.refresh();

      setInputValues({
        email: "",
        name: "",
        cpf: "",
        cost: 0,
        service: "",
        serviceEnd: "",
        serviceBegin: "",
        paymentUrl: "",
      });
      setInputErrors({});

    } catch (error) {
      console.log(error);
    }
  };

  const addValue = (
    key:
      | "email"
      | "name"
      | "cpf"
      | "cost"
      | "service"
      | "serviceBegin"
      | "serviceEnd"
      | "paymentUrl",
    value: string
  ) => {
    setInputValues({ ...inputValues, [key]: value });
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
            <TitleMember>Adicionar novo membro</TitleMember>
            <FormContainer noValidate autoComplete="off">
              <NameField
                error={inputErrors.name}
                id="outlined-basic"
                label="Nome"
                type="text"
                variant="outlined"
                value={inputValues.name}
                onChange={(e) => addValue("name", e.target.value)}
              />
              <EmailField
                error={inputErrors.email}
                id="outlined-basic"
                type="email"
                label="Email"
                variant="outlined"
                value={inputValues.email}
                onChange={(e) => addValue("email", e.target.value)}
              />
              <CpfField
                error={inputErrors.cpf}
                type="Nome"
                id="outlined-basic"
                label="CPF/CNPJ"
                variant="outlined"
                value={inputValues.cpf.toString()}
                onChange={(e) => {
                  if (inputValues.cpf.length < 14) {
                    addValue("cpf", cpfMask(e.target.value));
                  } else {
                    addValue("cpf", cnpjMask(e.target.value));
                  }
                }}
              />

              <ServiceField
                error={inputErrors.service}
                label="Serviço"
                variant="outlined"
                value={inputValues.service}
                onChange={(e) => addValue("service", e.target.value)}
                type="text"
              />

              <CostField
                label="Custo"
                variant="outlined"
                type={"number"}
                value={inputValues.cost}
                error={inputErrors.cost}
                onChange={(e) => addValue("cost", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
              />
              <PaymentField
                label="Url de Pagamento"
                variant="outlined"
                type={"name"}
                value={inputValues.paymentUrl}
                error={inputErrors.paymentUrl}
                onChange={(e) => addValue("paymentUrl", e.target.value)}
              />
              <StyledTextField
                id="date"
                type="date"
                variant="outlined"
                label="Inicio"
                value={inputValues.serviceBegin}
                error={inputErrors.serviceBegin}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  addValue("serviceBegin", e.target.value);
                }}
              />

              <StyledTextField
                id="date"
                type="date"
                variant="outlined"
                label="Final"
                value={inputValues.serviceEnd}
                error={inputErrors.serviceEnd}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  addValue("serviceEnd", e.target.value);
                }}
              />
            </FormContainer>

            <CreateButton
              variant="contained"
              color="primary"
              size="large"
              startIcon={<Save />}
              onClick={addNewUser}
            >
              Adicionar
            </CreateButton>
          </Container>
        </Fade>
      </CurrentModal>
    </div>
  );
};

export default ModalComponent;
