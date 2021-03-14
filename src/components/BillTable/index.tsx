import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@material-ui/core";
import { Loop } from "@material-ui/icons";
import React, { useState } from "react";
import { BillI, ColumnBillI } from "../../common/types";
import firebase from "../../config/firebaseConfig";
import { ChangeStatus, PaperContainer } from "./styles";


const columns: ColumnBillI[] = [
  {
    id: "billCode",
    label: "codigo da fatura",
    minWidth: 100,
    align: "left",
  },
  {
    id: "name",
    label: "Nome",
    minWidth: 100,
    align: "center",
  },
  {
    id: "status",
    label: "status",
    minWidth: 100,
    align: "center",
  },
  {
    id: "createdAt",
    label: "Criado em",
    minWidth: 100,
    align: "center",
  },
  {
    id: "dueDate",
    label: "Vencimento",
    minWidth: 100,
    align: "center",
  },
  { id: "extend", label: "Mais", minWidth: 100, align: "right" },
];
interface propsI {
  bills: BillI[];
  userId: string;
  updateData: () => void;
}

export default function BillTable(props: propsI) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const changeStatusClicked = async (id: string, status: boolean) => {
    const db = firebase.firestore();

    const data = await db
      .collection("users")
      .doc(props.userId)
      .collection("bills")
      .doc(id);

    await data.update({
      status: !status,
    });

    props.updateData();
  };

  const TableBodyRenderer = () => (
    <>
      {props.bills
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((bill, index) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
              {columns.map((column) => {
                let value = bill[column.id];
                if (typeof value === "boolean") {
                  value = value ? "Pago" : "Não Pago";
                  return (
                    <TableCell key={column.id} align={column.align}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignSelf: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          <ChangeStatus
                            onClick={() =>
                              changeStatusClicked(
                                bill.id,
                                value === "Pago" ? true : false
                              )
                            }
                          >
                            <Loop style={{ width: 20, height: 20 }} />
                          </ChangeStatus>
                        </div>

                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </div>
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === "number"
                        ? column.format(value)
                        : value}
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          );
        })}
    </>
  );
  const TableRowRenderer = () => (
    <>
      {columns.map((column) => (
        <TableCell
          key={column.id}
          align={column.align}
          style={{ minWidth: column.minWidth }}
        >
          {column.label}
        </TableCell>
      ))}
    </>
  );

  return (
    <PaperContainer>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableRowRenderer />
            </TableRow>
          </TableHead>

          <TableBody>
            <TableBodyRenderer />
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.bills.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </PaperContainer>
  );
}
