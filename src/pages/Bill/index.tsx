import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BillFile from "../../assets/image/bill.svg";
import { BillI } from "../../common/types";
import BillTable from "../../components/BillTable";
import ExtendMenu from "../../components/ExtendMenu";
import firebase from "../../config/firebaseConfig";
import {
  BillText, Container,



  ContainerCount, ContainerRow, Header,





  ImageFileSearch, Title,

  UploadButton
} from "./styles";



interface ParamsI {
  id: string;
}

const noChange = false;
const ReportPage: React.FC = () => {
  const params = useParams<ParamsI>();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [bills, setBills] = useState<BillI[]>([]);

  const getData = async () => {
    try {
      var user = firebase.auth().currentUser;
      if (!user) return;

      // DATA FROM FIRESTORE
      const db = firebase.firestore();

      const currentUser = await db.collection("users").doc(params.id);
      const billsCollection = currentUser.collection("bills");

      const currentBills = await billsCollection.get();
      let billsData: BillI[] = [];

      currentBills.forEach((bill) => {
        const data: any = bill.data();

        billsData.push({
          ...data,
          id: bill.id,
          extend: (
            <ExtendMenu
              docId={bill.id}
              fileName={data?.fileName}
              userId={params.id}
              updateData={getData}
              downloadUrl={data.downloadUrl}
              collection="bills"
            />
          ),
        });
      });

      setBills(billsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [, params.id]);

  useEffect(() => {
    const db = firebase.firestore();
    const currentBills = db
      .collection("users")
      .doc(params.id)
      .collection("bills");

    currentBills.onSnapshot((doc) => {
      if (!doc.metadata.hasPendingWrites) {
        getData();
      }
    });
  }, [noChange]);

  return (
    <Container>
      <Header>
        <ContainerRow>
          <Title>Faturas</Title>
          <ContainerCount>
            <span>{bills.length}</span>
          </ContainerCount>
        </ContainerRow>

        <Link
          to={`/NovaFatura/${params.id}`}
          style={{
            textDecoration: "none",
            color: "#fff",
          }}
        >
          <UploadButton onClick={handleOpen}>
            <AddIcon />
            <BillText>Nova Fatura</BillText>
          </UploadButton>
        </Link>
      </Header>

      <BillTable bills={bills} userId={params.id} updateData={getData} />
      <ImageFileSearch src={BillFile} />
    </Container>
  );
};

export default ReportPage;
