import React, { useContext, useEffect, useState } from "react";

import {
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";

import ExtendMenu from "../ExtendMenu";
import { CardImage, PendentIcon, CheckedIcon, WrongIcon } from "./styles";
import { WeekI } from "../../common/types";
import UserIdContext from "../../Context/userIdContext";

interface PropsI extends WeekI {
  week: string;
}
const ImgMediaCard = (props: PropsI) => {
  const currentUserId = useContext(UserIdContext);

  const [scheduleName, setScheduleName] = useState("");

  useEffect(() => {
    if (props.type?.includes("Cronograma Mensal")) {
      setScheduleName(props.type);
    }
    if (props.type?.includes("Cronograma Semanal")) {
      setScheduleName("Cronograma " + props.week);
    }
  }, []);

  return (
    <CardImage>
      <CardActionArea disabled disableRipple>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={
            props.type?.includes("Cronograma")
              ? "https://media.kasperskydaily.com/wp-content/uploads/sites/94/2020/03/11181335/36C3-PDF-encryption-featured2.jpg"
              : props.downloadUrl
          }
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.type?.includes("Cronograma")
              ? scheduleName
              : props.createdAt}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {props.description}
          </Typography>
          <CurrentIcon status={props.status} />
        </CardContent>
      </CardActionArea>

      <ExtendMenu
        style={{ marginLeft: "80%" }}
        collection="arts"
        docId={props.id}
        downloadUrl={props.downloadUrl}
        userId={currentUserId}
        fileName={props.fileName}
        updateData={() => {}}
      />
    </CardImage>
  );
};

interface CurrentIconPropsI {
  status: "Pendente" | "Aprovado" | "Reprovado";
}
const CurrentIcon = (props: CurrentIconPropsI) => {
  switch (props.status) {
    case "Pendente":
      return <PendentIcon />;

    case "Aprovado":
      return <CheckedIcon />;

    case "Reprovado":
      return <WrongIcon />;
  }
};
export default ImgMediaCard;
