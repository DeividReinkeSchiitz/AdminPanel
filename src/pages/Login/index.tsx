import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Image from "../../assets/image/LoginImage.svg";
import firebase from "../../config/firebaseConfig";
import GlobalStyles from "../../styles/GlobalStyles";
import {
  AdviceSpan, AlertError, Container,




  EmailInput,






  FormContainer, ImageContainer,




  LoginContainer,
  LoginImage,

  LoginImageRight, LoginTitle, PasswordInput, SubmitButton, Title
} from "./styles";



const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [inputErrors, setInputErrors] = useState({
    email: false,
    password: false,
  });

  const [isLoginForm, setIsLoginForm] = useState(true);

  const history = useHistory();

  const addInputValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: "email" | "password"
  ) => {
    setInputValues({
      ...inputValues,
      [key]: e.target.value,
    });
  };

  const validate = (): boolean => {
    //VERIFY IF SOME INPUTS ARE EMPTY
    let currentInputErrors = inputErrors;
    let haveError = false;

    for (const [key, value] of Object.entries(inputValues)) {
      currentInputErrors = {
        ...currentInputErrors,
        [`${key}`]: !Boolean(value),
      };

      if (!Boolean(value)) {
        haveError = true;
      }
    }
    setInputErrors(currentInputErrors);
    return !haveError;
  };

  const submitButtonPressed = async (event?: any) => {
    event.preventDefault();

    const isValidate = await validate();
    try {
      if (!isValidate) return;

      const { email, password } = inputValues;

      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);

      const user = await firebase.auth().signInWithEmailAndPassword(email, password);

      if (user) {
        await localStorage.setItem("userAuthenticated", "true");
        history.push("/Home");
      } else {
        await localStorage.setItem("userAuthenticated", "false");
      }
    } catch (error) {
      setErrorMessage(error);
      setInputErrors({ ...inputErrors, email: true });
    } finally {
    }
  };

  return (
    <>
      <>
        <GlobalStyles />
        <Container>
          <ImageContainer>
            <Title></Title>
            <LoginImage src={Image} />
          </ImageContainer>

          <LoginContainer>
            <LoginTitle>Login</LoginTitle>
            <FormContainer onSubmit={submitButtonPressed}>
              <EmailInput
                error={inputErrors.email}
                label="deividrs34@gmail.com"
                variant="filled"
                type="email"
                value={inputValues.email}
                onChange={(e) => addInputValue(e, "email")}
                style={{ marginTop: 30 }}
              />
              <PasswordInput
                error={inputErrors.password}
                label="12345678"
                variant="filled"
                type="password"
                value={inputValues.password}
                onChange={(e) => addInputValue(e, "password")}
                style={{ marginTop: 30 }}
              />

              <PasswordInput
                animationName={
                  isLoginForm ? "fadeOutAnimation" : "fadeInAnimation"
                }
                error={inputErrors.password}
                label="Confirmar Password"
                variant="filled"
                type="password"
                value={inputValues.password}
                onChange={(e) => addInputValue(e, "password")}
                style={{
                  marginTop: 30,
                }}
              />
              <SubmitButton
                type="submit"
                onClick={submitButtonPressed}
                variant="contained"
                style={{ marginTop: 30 }}
              >
                Entrar
              </SubmitButton>
            </FormContainer>

            <AdviceSpan>
              Somente administradores possuem uma conta vinculada.
            </AdviceSpan>
            {/*   <Register
              onClick={() => {
                setIsLoginForm(!isLoginForm);
              }}
            >
              {isLoginForm ? "Cadastar" : "Entrar"}
            </Register> */}

            <LoginImageRight src={Image} />
            <AlertError>{errorMessage}</AlertError>

            {/*  <SkipButton
              onClick={async () => {
                window.location.replace("/Home");
                await localStorage.setItem("userAuthenticated", "true");
              }}
            >
              Skip
            </SkipButton> */}
          </LoginContainer>
        </Container>
      </>
    </>
  );
};

export default Login;
