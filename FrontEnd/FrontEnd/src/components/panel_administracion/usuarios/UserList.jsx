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
import {
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import swal from "sweetalert";

export default function UserList() {
  const apiUrl = "http://localhost:8080/users";
  const [listUserState, setListUserState] = useState([]);
  const [token, setToken] = useState("")

  useEffect(() => {
    axios.get(apiUrl).then((res) => setListUserState(res.data));
    setToken(JSON.parse(localStorage.getItem("userData")).token);
  }, []);
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }
  function handleInputChange(idx, value, itemAnt) {
    const index = listUserState.indexOf(itemAnt);
    const modcat = { username: idx, role: value } 
    axios
      .put(apiUrl + "/modrol", modcat,config)
      .then((res) => {
        if (res.status == 200) {
          let new_list = [...listUserState];
          new_list[index].role = value;
          setListUserState(new_list);
        }
      })
      .catch((error) => {
        swal({
          icon: "error",
          title: "Error al actualizar la user",
          text: error.message,
          closeOnClickOutside: false,
          closeOnEsc: false,
          button: "Aceptar",
        })
      });
  }

  function eliminar(id, nombre) {
    if (
      confirm(
        `Está seguro que desea eliminar el usuario ${nombre}`
      )
    ) {
      axios.delete(`http://localhost:8080/users/${id}`,config);
      setListUserState(listUserState.filter((p) => p.id != id));
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Apellido</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Rol</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {listUserState.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.firstname}</TableCell>
              <TableCell align="left">{row.lastname}</TableCell>
              <TableCell align="left">{row.username}</TableCell>
              <TableCell align="left">
                {
                  <FormControl
                    variant="standard"
                    sx={{ minWidth: 100 }}
                    size="small"
                  >
                    <Select
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      key={row.id + "-" + "user"}
                      name={row.id + "-" + "user"}
                      id={row.id + "-" + "user"}
                      value={row.role}
                      onChange={(e) =>
                        handleInputChange(row.username, e.target.value, row)
                      }
                    >
                      <MenuItem value="">
                        <em>Sin User</em>
                      </MenuItem>
                        <MenuItem value="USER">USER</MenuItem>
                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                    </Select>
                  </FormControl>
                }
              </TableCell>
              <TableCell align="right" sx={{ display: "flex", gap: "3px" }}>
                <button
                  className="eliminate-btn"
                  onClick={() => {
                    eliminar(row.id, row.username);
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
