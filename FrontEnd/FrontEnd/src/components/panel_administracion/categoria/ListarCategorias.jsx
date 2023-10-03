//import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
//import { ThemeProvider, createTheme, useTheme } from "@mui/material";

export default function ListarCategorias() {
  const apiUrl = "http://3.144.46.39:8080/categorias";
  const [token, setToken] = useState("")
  const [listCategoriaState, setListCategoriaState] = useState([]);

  useEffect(() => {
    axios.get(apiUrl).then((res) => setListCategoriaState(res.data));
    setToken(JSON.parse(localStorage.getItem("userData")).token);
  }, []);
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }
  function eliminar(id, nombre) {
    if (
      confirm(
        `Está seguro que desea eliminar la categoria ${nombre}`
      )
    ) {
      axios.delete(`http://3.144.46.39:8080/categorias/${id}`,config);
      setListCategoriaState(listCategoriaState.filter((p) => p.id != id));
    }
  }
  // const darkTheme = createTheme({
  //   palette: {
  //     mode: "dark",
  //   },
  // });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Descripción</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listCategoriaState.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.nombre}</TableCell>
              <TableCell align="left">{row.descripcion}</TableCell>
              <TableCell align="right" sx={{ display: "flex", gap: "3px" }}>
                <button
                  className="eliminate-btn"
                  onClick={() => {
                    eliminar(row.id, row.nombre);
                  }}
                >
                  Eliminar
                </button>
                <button className="edit-btn">Editar</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
