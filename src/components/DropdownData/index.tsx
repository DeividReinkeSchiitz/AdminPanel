import React, { useState, useEffect } from "react";
import { Menu, FormControlLabel } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import axios from "axios";

import {
  ButtonStyled,
  Container,
  ContainerInfo,
  IOSSwitch,
  MenuItemStyled,
  StyledTextField,
  FormContainer,
} from "./styles";
import { cnpjMask, cpfMask } from "../../common/functions/mask";
import firebase from "../../config/firebaseConfig";
interface PropsI {
  data: {
    name: string;
    email: string;
    cpf: string;
    service: string;
    cost: string;
    id: string;
    serviceActive?: boolean;
    serviceBegin: string;
    serviceEnd: string;
    notificationToken: string;
  };
}

export default function DropdownData({ data }: PropsI) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [serviceActiveded, setServiceActiveded] = useState<boolean | undefined>(
    data.serviceActive
  );
  const [serviceEnd, setServiceEnd] = useState<string>(data.serviceEnd);
  const [serviceBegin, setServiceBegin] = useState<string>(data.serviceBegin);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeStatusAndNotify = async (checked: boolean) => {
    try {
      const db = firebase.firestore();
      const user = await db.collection("users").doc(data.id);

      await user.update({
        serviceActive: checked,
      });

      if (!checked) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeDataEnd = async () => {
    try {
      const db = firebase.firestore();
      const user = await db.collection("users").doc(data.id);

      await user.update({
        serviceEnd,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changeDataBegin = async () => {
    try {
      const db = firebase.firestore();
      const user = await db.collection("users").doc(data.id);

      await user.update({
        serviceBegin,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    changeDataEnd();
  }, [serviceEnd]);

  useEffect(() => {
    changeDataBegin();
  }, [serviceBegin]);

  if (data?.name) {
    return (
      <Container>
        <ButtonStyled onClick={handleClick}>
          <ContainerInfo>
            <span>{data?.name}</span>
            <span>{data?.email}</span>
          </ContainerInfo>

          <ExpandMore htmlColor="#fff" />
        </ButtonStyled>
        <Menu
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItemStyled disableRipple>
            <span>{data.cpf.length > 14 ? "CNPJ" : "CPF"}</span>
            <span>
              {data.cpf.length > 14 ? cnpjMask(data.cpf) : cpfMask(data.cpf)}
            </span>
          </MenuItemStyled>
          <MenuItemStyled disableRipple>
            <span>Serviço </span>
            <span>{data.service}</span>
          </MenuItemStyled>

          <MenuItemStyled disableRipple>
            <span>Custo </span>
            <span>{data.cost} R$</span>
          </MenuItemStyled>

          <MenuItemStyled disableRipple>
            <span>Inicio </span>
            <FormContainer noValidate>
              <StyledTextField
                id="date"
                type="date"
                value={serviceBegin}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setServiceBegin(e.target.value);
                }}
              />
            </FormContainer>
          </MenuItemStyled>

          <MenuItemStyled disableRipple>
            <span>Fim </span>
            <FormContainer noValidate>
              <StyledTextField
                id="date"
                type="date"
                value={serviceEnd}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setServiceEnd(e.target.value);
                }}
              />
            </FormContainer>
          </MenuItemStyled>

          <MenuItemStyled disableRipple>
            <span>Serviço {serviceActiveded ? "Ativado" : "Desativado"} </span>
            <FormControlLabel
              style={{
                marginRight: -10,
              }}
              control={
                <IOSSwitch
                  checked={serviceActiveded}
                  onChange={(event, checked) => {
                    setServiceActiveded(!serviceActiveded);
                    changeStatusAndNotify(checked);
                  }}
                  name="checkedB"
                />
              }
              label=""
            />
          </MenuItemStyled>
        </Menu>
      </Container>
    );
  } else {
    return <></>;
  }
}
