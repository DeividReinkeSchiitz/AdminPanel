import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { ArtMonthDataI, WeekI, WeeksI } from "../../common/types";
import ImageCard from "../ImageCard";
import { Container, ContainerCount, useStyles } from "./styles";





interface PropsWeeksI {
  month: string;
  weeks: WeeksI;
}
const Weeks = (props: PropsWeeksI) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container>
      <div className={classes.root}>
        {Object.entries(props.weeks).map(([key, values], index) => (
          <div key={index}>
            <Accordion
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              style={{
                background: "transparent",
                overflowX: "hidden",
                boxShadow: "none",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
              >
                <Typography className={classes.TextWeek}>
                  {key.includes("Semana")
                    ? [
                      "S",
                      key.slice(1, key.length - 1),
                      " ",
                      key.slice(key.length - 1),
                    ].join("")
                    : "Cronogramas"}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <ScrollMenu
                  inertiaScrolling
                  menuStyle={{
                    overflowX: "hidden",
                  }}
                  itemStyle={{
                    outline: "none",
                  }}
                  data={values.map((value: WeekI, index: number) => (
                    <ImageCard
                      fileName={value.fileName}
                      id={value.id}
                      key={index}
                      description={value.description}
                      status={value.status}
                      type={value?.type}
                      createdAt={value.createdAt}
                      downloadUrl={value.downloadUrl}
                      week={value.week}
                    />
                  ))}
                />
              </AccordionDetails>
            </Accordion>
            <Divider />
          </div>
        ))}
      </div>
    </Container>
  );
};

interface PropsMonthI {
  months: ArtMonthDataI;
}
const Months = (props: PropsMonthI) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container>
      <div className={classes.root}>
        {Object.entries(props.months).map(
          ([key, value], index) =>
            Object.entries(value)[0] && (
              <div key={index}>
                <Accordion
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                  style={{
                    background: "#f6f7fb",
                    overflowX: "hidden",
                    boxShadow: "none",
                    width: "100%",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls={`panel${index}bh-content`}
                    id={`panel${index}bh-header`}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography className={classes.TextMonth}>
                        {key}
                      </Typography>

                      <ContainerCount>
                        <span>
                          {(value["Semana 1"]?.length ?? 0) +
                            (value["Semana 2"]?.length ?? 0) +
                            (value["Semana 3"]?.length ?? 0) +
                            (value["Semana 4"]?.length ?? 0) +
                            (value.schedule?.length ?? 0)}
                        </span>
                      </ContainerCount>
                    </div>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Weeks month={key} weeks={value} />
                  </AccordionDetails>
                </Accordion>
                <Divider />
              </div>
            )
        )}
      </div>
    </Container>
  );
};

interface PropsArtI {
  months: ArtMonthDataI;
}

const ArtList = (props: PropsArtI) => {
  if (props.months) {
    return (
      <div style={{ marginTop: "30px" }}>
        <Months months={props.months} />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default ArtList;
