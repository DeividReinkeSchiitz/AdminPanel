import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@material-ui/core";
import React, { useState } from "react";
import { ColumnReportsI, ReportsI } from "../../common/types";
import { PaperContainer } from "./styles";


const columns: ColumnReportsI[] = [
  { id: "fileName", label: "Nome", minWidth: 100 },
  {
    id: "shortDescription",
    label: "Descrição Curta",
    minWidth: 200,
    align: "center",
  },
  { id: "createdAt", label: "Criado em", minWidth: 100, align: "center" },
  { id: "extend", label: "Mais", minWidth: 100, align: "right" },
];
interface propsI {
  reports: ReportsI[];
}

export default function ReportsTable(props: propsI) {
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

  const TableBodyRenderer = () => (
    <>
      {props.reports
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((report) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={report.fileName}>
              {columns.map((column) => {
                let value = report[column.id];
                if (typeof value === "boolean") {
                  value = JSON.stringify(value);
                }
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.format && typeof value === "number"
                      ? column.format(value)
                      : value}
                  </TableCell>
                );
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
        count={props.reports.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </PaperContainer>
  );
}
