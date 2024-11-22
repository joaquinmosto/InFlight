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
import dayjs from "dayjs";

export default function ListadoVentas() {
  const apiUrl = "http://localhost:8080/productos";

  const [cursos, setCursos] = useState([]);
  const [horas, setHoras] = useState([]);
  const [Hospedajes, setHospedajes] = useState([]);
  const [otros, setOtros] = useState([]);

  useEffect(() => {
    axios.get(apiUrl).then((res) => {
      let count = 0;
      //   Cursos
      const listCursos = [];
      res.data
        .filter(
          (producto) =>
            (producto.categoria === "Licencias") & (producto.cursos.length > 0)
        )
        .forEach((cu) => {
          cu.cursos.forEach((c) => {
            listCursos.push({
              id: count,
              nombre: cu.nombre,
              fechaInicio: dayjs(c.fechaInicio).format("DD-MM-YYYY"),
              fechaFin: dayjs(c.fechaFin).format("DD-MM-YYYY"),
              cupos: c.cupos,
              reservas: c.reservas,
              modalidad: "",
            });
            count++;
          });
        });

      setCursos(listCursos);

      // horas libres
      const listHoras = [];

      res.data
        .filter(
          (producto) =>
            (producto.categoria === "Horas Libres") &
            (producto.cursos.length > 0)
        )
        .forEach((cu) => {
          cu.cursos.forEach((c) => {
            listHoras.push({
              id: count,
              nombre: cu.nombre,
              fecha: dayjs(c.fechaInicio).format("DD-MM-YYYY"),
              inicio: c.horaInicio,
              fin: c.horaFin,
              cupos: c.cupos,
              reservas: c.reservas,
            });
            count++;
          });
        });
      setHoras(listHoras);
      // hospedajes
      const listHosp = [];

      res.data
        .filter(
          (producto) =>
            (producto.categoria === "Hospedajes") & (producto.cursos.length > 0)
        )
        .forEach((cu) => {
          cu.cursos.forEach((c) => {
            listHosp.push({
              id: count,
              nombre: cu.nombre,
              inicio: dayjs(c.fechaInicio).format("DD-MM-YYYY"),
              fin: dayjs(c.fechaFin).format("DD-MM-YYYY"),
              cupos: c.cupos,
              reservas: c.reservas,
            });
            count++;
          });
        });

      setHospedajes(listHosp);
      setOtros(
        res.data.filter(
          (producto) =>
            (producto.categoria !== "Hospedajes") &
            (producto.categoria !== "Horas Libres") &
            (producto.categoria !== "Licencias")
        )
      );
    });
  }, []);

  return (
    <>
      <h2>RESERVAS CURSOS</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="left">Fecha Inicio</TableCell>
              <TableCell align="left">Fecha Fin</TableCell>
              <TableCell align="left">Modalidad</TableCell>
              <TableCell align="left">Cupos</TableCell>
              <TableCell align="left">Reservas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cursos.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.nombre}</TableCell>
                <TableCell align="left">{row.fechaInicio}</TableCell>
                <TableCell align="left">{row.fechaFin}</TableCell>
                <TableCell align="left">{row.modalidad}</TableCell>
                <TableCell align="left">{row.cupos}</TableCell>
                <TableCell align="left">{row.reservas}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h2>RESERVAS HORAS LIBRES</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="left">Fecha</TableCell>
              <TableCell align="left">Hora Inicial</TableCell>
              <TableCell align="left">Hora Fin</TableCell>
              <TableCell align="left">Horas Totales</TableCell>
              <TableCell align="left">Reservas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {horas.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.nombre}</TableCell>
                <TableCell align="left">{row.fecha}</TableCell>
                <TableCell align="left">{row.inicio}</TableCell>
                <TableCell align="left">{row.fin}</TableCell>
                <TableCell align="left">{row.cupos}</TableCell>
                <TableCell align="left">{row.reservas}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h2>RESERVAS HOSPEDAJE</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="left">Plazas por día</TableCell>
              <TableCell align="left">Desde</TableCell>
              <TableCell align="left">Hasta</TableCell>
              <TableCell align="left">Cantidad de Reservas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Hospedajes.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.nombre}</TableCell>
                <TableCell align="left">{row.cupos}</TableCell>
                <TableCell align="left">{row.inicio}</TableCell>
                <TableCell align="left">{row.fin}</TableCell>
                <TableCell align="left">{row.reservas}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
