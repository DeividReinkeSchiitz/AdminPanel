import { Button, TextField } from "@material-ui/core";
import styled, { css, keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: row;
  background-color: #eceef8;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex: 1;

  flex-direction: column;
  justify-content: space-between;

  margin-top: 50px;

  @media only screen and (max-width: 750px) {
    display: none;
  }
`;

export const Title = styled.h1`
  font-size: 40px;
  font-weight: 300;
  font-family: "Roboto";

  align-self: center;
  justify-content: center;
`;

export const LoginImage = styled.img`
  width: 90%;
  height: 80%;
`;

export const LoginImageRight = styled.img`
  height: 40vh;
  z-index: 0;
  position: absolute;
  bottom: 0;
  right: 0;
  display: none;

  @media only screen and (max-width: 750px) {
    display: inline;
  }

  @media only screen and (max-width: 330px) {
    display: none;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.6;

  padding: 70px 40px;
  background: #6c63ff;

  @media only screen and (max-width: 750px) {
    flex: 1;
  }
`;

const hide = keyframes`
  0%{
    transform:translatex(0vw);
  }
  15%{
    opacity:0;
  }
  50%{
    opacity:0;
    transform:translatex(120vw);
  }
  85%{
    opacity:0;
  }
  100%{
    transform:translatex(0vw);
  }
`;

const show = keyframes`
  0%{
    transform:translatex(0vw);
  }
  15%{
    opacity:0;
  }
  50%{
    opacity:0;
    transform:translatex(120vw);
  }
  85%{
    opacity:0;
  }
  100%{
    transform:translatex(0vw);
  }

`;

interface TitleProps {
  animationName?: "hide" | "show";
}

export const LoginTitle = styled.span<TitleProps>`
  display: fixed;
  font-family: Roboto;
  font-weight: bold;
  font-size: 54px;
  color: #fff;

  animation-name: ${(props) => eval(props.animationName || "") || "none"};
  animation-duration: 500ms;
  animation-timing-function: ease-in;
  animation-fill-mode: forwards;
`;

const fieldCss = css`
  background-color: #fff;
`;

export const EmailInput = styled(TextField)`
  margin-top: 30px;
  ${fieldCss}
`;

export const SubmitButton = styled(Button)`
  height: 45px;
  margin-bottom: 7px;
`;

const fadeInAnimation = keyframes`  
  from { opacity: 0; height:0px;  }
  to {  opacity: 1;  height: 55px;  }

`;

const fadeOutAnimation = keyframes`  
  from { opacity: 1;  height:55px; margin-top:30px; }
  to {opacity: 0; height:0px; margin-top:0px; }
`;

interface PasswordProps {
  animationName?: "fadeInAnimation" | "fadeOutAnimation";
}

export const PasswordInput = styled(TextField) <PasswordProps>`
  ${fieldCss}
  animation-name: ${(props) => eval(props.animationName || "") || "none"};
  animation-duration: 500ms;
  animation-timing-function: ease-in;
  animation-fill-mode: forwards;
`;

export const AlertError = styled.span`
  font-family: Roboto;
  color: #c0392b;
  margin-top: 20px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

export const Register = styled.span`
  font-weight: bold;
  color: white;
  font-size: 16px;
  padding: 15px;

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const SkipButton = styled.span`
  color: white;
  font-size: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0 30px 20px;
  text-decoration: underline;

  :hover {
    cursor: pointer;
  }
`;

export const AdviceSpan = styled.span`
  color: white;
  font-weight: 25;
`;
