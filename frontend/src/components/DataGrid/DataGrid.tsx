import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { GridDataType } from "../../@types/SynopsisData/grid.type";
import "./styles.scss";
import NameTag from "../NameTag/NameTag";

export default function DataGrid({ row }: { row: GridDataType }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableBody>
          <TableRow
            key={"title"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row" width={"25%"}>
              <Typography variant="h5" className="text-color">
                Title
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="body1" color="black">
                {row.title}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow
            key={"authors"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <Typography variant="h5" className="text-color">
                Authors
              </Typography>
            </TableCell>
            <TableCell align="left">
              {row.authors.map((author) => (
                // <Typography key={author}>{author}</Typography>
                <NameTag key={author} data={author} defaultColor="black" />
              ))}
            </TableCell>
          </TableRow>
          <TableRow
            key={"publicationDate"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <Typography variant="h5" className="text-color">
                Publication Date
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="body1" color="black">
                {row.publicationDate.toLocaleDateString()}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow key={"relatedtopics"}>
            <TableCell component="th" scope="row">
              <Typography variant="h5" className="text-color">
                Related Topics
              </Typography>
            </TableCell>
            <TableCell
              align="left"
              sx={{ display: "flex", flexDirection: "row" }}
            >
              {row.relatedtopics.map((topic) => (
                <NameTag key={topic} data={topic} defaultColor="" />
              ))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
