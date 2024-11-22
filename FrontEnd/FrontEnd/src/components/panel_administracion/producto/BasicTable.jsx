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
  Box,
  Button,
  FormControl,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import swal from "sweetalert";
import {
  DesktopDatePicker,
  DesktopTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function BasicTable() {
  const apiUrlCat = "http://localhost:8080/categorias";
  const urlCursos = "http://localhost:8080/productos/add_curso";
  const [listCategoriaState, setListCategoriaState] = useState([]);
  const [token, setToken] = useState("");
  const [open, setOpen] = useState(false);

  const style = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "50%",
    maxHeight: "50%",
    bgcolor: "#353838",
    /* border: '1px solid #000', */
    borderRadius: "20px",
    p: 4,
  };
  const [formData, setFormData] = useState({
    cursos: [
      {
        fechaInicio: "",
        fechaFin: "",
        cupos: "",
        modalidad: "",
        horaInicio: "",
        horaFin: "",
      },
    ],
  });

  const handleOpen = (id) => {
    const name = "id";
    setOpen(true);
    const newId = [...formData.cursos];
    newId[0][name] = id;

    setFormData({
      ...formData,
      cursos: newId,
    });
    //console.log(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputCursosChange = (event) => {
    const { name, value } = event.target;
    const newCupos = [...formData.cursos];
    newCupos[0][name] = value;

    setFormData({ ...formData, cursos: newCupos });
  };

  const handleDateCursadaChange = (event, name) => {
    let value = dayjs(event).format("YYYY-MM-DD");

    const newCursada = [...formData.cursos];
    newCursada[0][name] = value;

    setFormData({ ...formData, cursos: newCursada });
  };

  const handleTime = (event, name) => {
    //console.log(dayjs(event).format("HH:mm"));

    const newCursada = [...formData.cursos];
    newCursada[0][name] = dayjs(event).format("HH:mm");

    setFormData({ ...formData, cursos: newCursada });
  };

  useEffect(() => {
    axios.get(apiUrlCat).then((res) => setListCategoriaState(res.data));
    setToken(JSON.parse(localStorage.getItem("userData")).token);
  }, []);
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  function handleInputChange(idx, value, itemAnt) {
    const index = listProductState.indexOf(itemAnt);
    const id_cat = listCategoriaState.find((i) => i.nombre == value).id;
    const modcat = { id: idx, categoria: { id: id_cat } };
    axios
      .put(apiUrl + "/modcat", modcat, config)
      .then((res) => {
        if (res.status == 200) {
          let new_list = [...listProductState];
          new_list[index].categoria = value;
          setListProductState(new_list);
        }
      })
      .catch((error) => {
        swal({
          icon: "error",
          title: "Error al actualizar la categoria",
          text: error.message,
          closeOnClickOutside: false,
          closeOnEsc: false,
          button: "Aceptar",
        });
      });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(formData.cursos[0]);
    axios
      .put(urlCursos, formData.cursos[0], config)
      .then((res) => {
        if (res.status === 200) {
          swal({
            icon: "success",
            title: "Registro agregado correctamente",
            closeOnClickOutside: false,
            closeOnEsc: false,
            button: "Aceptar",
          });
          //console.log("enviado");
          handleClose();
        }
      })
      .catch((error) => {
        console.log(error);
        swal({
          icon: "error",
          title: "Error al Agregar disponibilidad",
          text: error.message,
          closeOnClickOutside: false,
          closeOnEsc: false,
          button: "Aceptar",
        });
      });
  }

  const apiUrl = "http://localhost:8080/productos";

  const [listProductState, setListProductState] = useState([]);

  useEffect(() => {
    axios.get(apiUrl).then((res) => setListProductState(res.data));
  }, []);

  useEffect(() => {
    //console.log(formData?.cursos);
    /* console.log(formData?.detalles); */
  }, [formData?.cursos]);

  function eliminar(id, nombre) {
    if (confirm(`Está seguro que desea eliminar el producto ${nombre}`)) {
      axios.delete(`http://localhost:8080/productos/${id}`, config);
      setListProductState(listProductState.filter((p) => p.id != id));
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="left">Categoría</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listProductState?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.nombre}</TableCell>
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
                        key={row.id + "-" + "categoria"}
                        name={row.id + "-" + "categoria"}
                        id={row.id + "-" + "categoria"}
                        value={row.categoria}
                        onChange={(e) =>
                          handleInputChange(row.id, e.target.value, row)
                        }
                      >
                        <MenuItem value="">
                          <em>Sin Categoría</em>
                        </MenuItem>
                        {listCategoriaState.map((cat) => (
                          <MenuItem
                            key={row.id + "-" + cat.id}
                            value={cat.nombre}
                          >
                            {cat.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  }
                </TableCell>
                <TableCell align="right" sx={{ display: "flex", gap: "3px" }}>
                  <button
                    className="eliminate-btn"
                    onClick={() => {
                      eliminar(row.id, row.nombre);
                    }}
                  >
                    Eliminar
                  </button>
                  {listCategoriaState?.filter(
                    (c) => c.nombre === row.categoria
                  )[0]?.reservable && (
                    <button
                      /* onClick={handleOpen} */ onClick={() =>
                        handleOpen(row.id)
                      }
                      className="edit-btn"
                    >
                      Nuevas Fechas
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        /* sx={{ filter: "alpha(opacity=50)", opacity: "0.5" }} */
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <h3>Cursada</h3>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <DesktopDatePicker
                  sx={{ width: "39%" }}
                  label="Fecha de inicio"
                  name="fechaInicio"
                  value={formData.cursos.fechaInicio}
                  onChange={(event) =>
                    handleDateCursadaChange(event, "fechaInicio")
                  }
                />
                <DesktopDatePicker
                  sx={{ ml: 1, width: "39%" }}
                  label="Fecha de fin"
                  name="fechaFin"
                  value={formData.cursos.fechaFin}
                  onChange={(event) =>
                    handleDateCursadaChange(event, "fechaFin")
                  }
                />
              </div>
              <div
                style={{
                  display: "flex",
                  paddingTop: "8px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  sx={{ minWidth: "39%" }}
                  label="cupos"
                  variant="outlined"
                  type="number"
                  value={formData.cursos.cupos}
                  onChange={(e) => handleInputCursosChange(e)}
                  name="cupos"
                />
                <TextField
                  sx={{ ml: 1, width: "39%" }}
                  label="Modalidad"
                  variant="outlined"
                  type="text"
                  value={formData.cursos.modalidad}
                  onChange={(e) => handleInputCursosChange(e)}
                  name="modalidad"
                />
              </div>
              <div
                style={{
                  paddingTop: "8px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <DesktopTimePicker
                  sx={{ width: "39%" }}
                  label="Horario de Inicio"
                  views={["hours", "minutes"]}
                  onChange={(value) => handleTime(value, "horaInicio")}
                />
                <DesktopTimePicker
                  sx={{ ml: 1, width: "39%" }}
                  label="Horario de Finalización"
                  views={["hours", "minutes"]}
                  onChange={(value) => handleTime(value, "horaFin")}
                />
              </div>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 850 }}>
              <Button type="submit">Agregar cursada</Button>
            </FormControl>
          </LocalizationProvider>
        </Box>
      </Modal>
    </>
  );
}
