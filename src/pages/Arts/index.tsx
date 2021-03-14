import { Menu, MenuItem } from "@material-ui/core";
import { Add, ExpandMore } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import artMonster from "../../assets/image/artMonter.svg";
import { ArtDataI, ArtsFirebaseI } from "../../common/types";
import ArtList from "../../components/ArtList";
import firebase from "../../config/firebaseConfig";
import UserIdContext from "../../Context/userIdContext";
import {
  ArtText,
  ButtonTitle, Container,

  ContainerRow, Header,






  ImageFileSearch, Title,

  UploadButton
} from "./styles";



interface ParamsI {
  id: string;
}

const noChange = false;
const Arts: React.FC = () => {
  const params = useParams<ParamsI>();
  const [currentYear, setCurrentYear] = useState(0);
  const [artData, setArtData] = useState<ArtDataI | null>(null);
  const [years, setYears] = useState<number[]>([]);
  const [numberOfArts, setNumberOfArts] = useState<number>(0);
  const handleClose = (year: number) => {
    setCurrentYear(year);
  };

  const getData = async () => {
    let biggestYear = 0;
    try {
      const user = firebase.auth().currentUser;
      if (!user) return;

      const db = firebase.firestore();

      const currentUser = await db.collection("users").doc(params.id);
      const artCollection = currentUser.collection("arts");

      const currentArts = await artCollection.get();

      let currentArtsData: ArtDataI = {};
      let currentYears: number[] = [];
      let currentNumberOfArts: number = 0;

      currentArts.forEach((art) => {
        currentNumberOfArts++;
        const {
          description,
          month,
          type,
          status,
          week,
          year,
          createdAt,
          downloadUrl,
          fileName,
        } = art.data() as ArtsFirebaseI;

        currentYears.push(Number(year));
        if (Number(year) > biggestYear) {
          biggestYear = Number(year);
        }

        if (currentArtsData[year] === undefined) {
          currentArtsData[year] = {
            Janeiro: {},
            Fevereiro: {},
            Março: {},
            Abril: {},
            Maio: {},
            Junho: {},
            Julho: {},
            Agosto: {},
            Setembro: {},
            Outubro: {},
            Novembro: {},
            Dezembro: {},
          };
        }

        if (currentArtsData[year][month] === undefined) {
          currentArtsData[year][month] = {
            schedule: [],
            "Semana 1": [],
            "Semana 2": [],
            "Semana 3": [],
            "Semana 4": [],
          };
        }

        if (type === "Arte") {
          if (currentArtsData[year][month][week] === undefined) {
            currentArtsData[year][month][week] = [];
          }

          currentArtsData[year][month][week]?.push({
            description,
            status,
            createdAt,
            downloadUrl,
            week,
            id: art.id,
            fileName,
          });
        } else {
          if (currentArtsData[year][month]["schedule"] === undefined) {
            currentArtsData[year][month]["schedule"] = [];
          }

          currentArtsData[year][month]["schedule"]?.push({
            description,
            status,
            type,
            createdAt,
            downloadUrl,
            week,
            id: art.id,
            fileName,
          });
        }
      });

      currentYears = currentYears.filter(function (item, pos) {
        return currentYears.indexOf(item) == pos;
      });

      setYears(currentYears);
      setCurrentYear(biggestYear);
      setArtData(currentArtsData);
      setNumberOfArts(currentNumberOfArts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const db = firebase.firestore();
    const currentArts = db
      .collection("users")
      .doc(params.id)
      .collection("arts");

    //get Data again when something in arts change
    currentArts.onSnapshot((doc) => {
      if (!doc.metadata.hasPendingWrites) {
        getData();
      }
    });
  }, [noChange]);

  useEffect(() => {
    getData();
  }, [params.id]);

  useEffect(() => {
    setCurrentYear(currentYear);
  }, [artData]);

  return (
    <Container>
      <CurrentHeader
        setYear={setCurrentYear}
        currentYear={currentYear}
        handleClose={handleClose}
        years={years}
        numberOfArts={numberOfArts}
        id={params.id}
      />

      <UserIdContext.Provider value={params.id}>
        {artData && <ArtList months={artData[`${currentYear}`]} />}
      </UserIdContext.Provider>

      {/*      <div
        style={{
          width: "150vw",
          marginLeft: -200,
          height: "150vh",
          background: "#f6f7fb",
          position: "absolute",
          zIndex: -1,
        }}
      ></div>
 */}
      <ImageFileSearch src={artMonster} />
    </Container>
  );
};

interface HeaderPropsI {
  currentYear: number;
  handleClose: (year: number) => void;
  years: number[];
  id: string;
  numberOfArts: number;
  setYear: (year: number) => void;
}
const CurrentHeader = (props: HeaderPropsI) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Header>
      <ContainerRow>
        <Title>Artes {props.currentYear === 0 ? "" : props.currentYear}</Title>

        <ButtonTitle onClick={handleClick}>
          <ExpandMore />
        </ButtonTitle>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => {
            setAnchorEl(null);
          }}
        >
          {props.years.map((year) => (
            <MenuItem
              key={year}
              onClick={(e) => {
                props.setYear(year);
              }}
            >
              {year}
            </MenuItem>
          ))}
        </Menu>

        {/*         <ContainerCount>
          <span>{props.numberOfArts}</span>
        </ContainerCount> */}
      </ContainerRow>

      <Link
        to={`/NovaArte/${props.id}`}
        style={{
          textDecoration: "none",
          color: "#fff",
        }}
      >
        <UploadButton onClick={() => { }}>
          <Add />
          <ArtText>Nova Arte</ArtText>
        </UploadButton>
      </Link>
    </Header>
  );
};

export default Arts;
