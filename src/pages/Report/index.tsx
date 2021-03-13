import React, { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import {
  Container,
  Header,
  ContainerRow,
  Title,
  ContainerCount,
  UploadButton,
  ImageFileSearch,
} from "./styles";

import firebase from "../../config/firebaseConfig";

import ReportsTable from "../../components/ReportsTable";
import UploadModal from "../../components/UploadModal";
import ExtendMenu from "../../components/ExtendMenu";
import ImageFile from "../../assets/image/fileSearching.svg";
interface ParamsI {
  id: string;
}
interface ReportsI {
  fileName: string;
  shortDescription: string;
  createdAt: string;
  extend: ReactNode;
}

const noChange = false;
const ReportPage: React.FC = () => {
  const params = useParams<ParamsI>();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [reports, setReports] = useState<ReportsI[]>([]);

  const getData = async () => {
    try {
      var user = firebase.auth().currentUser;
      if (!user) return;

      const db = firebase.firestore();

      const reports = await db
        .collection("users")
        .doc(params.id)
        .collection("reports")
        .get();

      let reportsData: ReportsI[] = [];

      reports.forEach((report) => {
        const data:
          | {
              fileName: string;
              shortDescription: string;
              createdAt: string;
              downloadUrl: string;
            }
          | any = report.data();

        reportsData.push({
          ...data,
          extend: (
            <ExtendMenu
              docId={report.id}
              fileName={data?.fileName}
              userId={params.id}
              updateData={getData}
              downloadUrl={data.downloadUrl}
              collection="reports"
            />
          ),
        });
      });

      setReports(reportsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [params.id]);

  useEffect(() => {
    const db = firebase.firestore();
    const currentBills = db
      .collection("users")
      .doc(params.id)
      .collection("reports");

    currentBills.onSnapshot((doc) => {
      if (!doc.metadata.hasPendingWrites) {
        getData();
      }
    });
  }, [noChange]);

  return (
    <Container>
      <UploadModal
        open={open}
        handleOpen={handleOpen}
        id={params.id}
        updateData={getData}
      />
      <Header>
        <ContainerRow>
          <Title>Relatórios</Title>
          <ContainerCount>
            <span>{reports.length}</span>
          </ContainerCount>
        </ContainerRow>

        <UploadButton onClick={handleOpen}>
          <AddIcon />
          <span>Novo Relatório</span>
        </UploadButton>
      </Header>

      <ReportsTable reports={reports} />

      <ImageFileSearch src={ImageFile} />
    </Container>
  );
};

export default ReportPage;
