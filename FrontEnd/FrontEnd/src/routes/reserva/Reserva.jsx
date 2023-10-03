import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./reserva.module.css";
import { Calendar, DateObject } from "react-multi-date-picker";
import "../detail/bg-dark.css";
import dayjs from "dayjs";
import { FormControl, InputLabel, Select, TextField } from "@mui/material";
import { useGlobalState } from "../../utils/Context";
import { useNavigate } from "react-router-dom";


export default function Reserva() {
  const [values, setValues] = useState(new Date());
  const [token, setToken] = useState("");
  const [producto, setProducto] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [cursosf, setCursosf] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [descripcion, setDescripcion] = useState([]);
  const [detalles, setDetalles] = useState([]);
  //const [politicas, setPoliticas] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [horas, setHoras] = useState([]);
  const [presupuesto, setPresupuesto] = useState(0);
  const [reservas, setReservas] = useState([]);
  const [cantidad, setCantidad] = useState(0);
  const { reserva } = useGlobalState();
  const navigate = useNavigate();
  const [precioTotal, setPrecioTotal] = useState(1);

  // para el formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [pais, setPais] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");

  const [nombreError, setNombreError] = useState("");
  const [apellidoError, setApellidoError] = useState("");
  const [paisError, setPaisError] = useState("");
  const [localidadError, setLocalidadError] = useState("");
  const [dniError, setDniError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");

  const horasDisp = ["09:00", "10:00", "11:00", "12:00"];

  function isReserved(strDate) {
    return reservas.some(([start, end]) => strDate >= start && strDate <= end);
  }

  const [valores, setValores] = useState([]);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const weekDays = ["LU", "MA", "MI", "JU", "VI", "SA", "DO"];

  const [mesSeleccionado, setMes] = useState(
    months[new Date().getMonth()].toUpperCase()
  );

  function calcularTotal() {
    let cant = 1;
    if (categoria == "Horas Libres") {
      cant = horas.length;
    }
    if (categoria == "Uniformes" || categoria == "Merchandising") {
      cant = cantidad;
    }
    setPrecioTotal(presupuesto * cant);
  }

  function dias(dias){
    let total = reserva.precio

    if (dias.length>1){
      dias = [dias.pop()]
    }
    let cant = 1
    if(dias.length==1){

      cant = dayjs(dias[0][1])?.diff(dayjs(dias[0][0]), "d")
      cant = cant>1?cant:1
      total =total * (cant)

    }

    setValores(dias)
    setPrecioTotal(total)
  }

  useEffect(() => {
    const c = cursos.filter((curso) => dayjs(curso.fechaInicio) >= values);
    if (categoria === "Licencias") {
      setMes(months[new Date(values).getMonth()].toUpperCase());

      setCursosf(c);
    }
  }, [values]);

  function obtenerFechas(res) {
    if (res.length > 0) {
      let resFechas = [];
      res.forEach((r) => {
        resFechas = r.map((f) => [
          new DateObject(f.fecha_inicio).format(),
          new DateObject(f.fecha_fin).format(),
        ]);
      });
      setReservas(resFechas);
    }
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    setToken(data ? data : "");
    const config = {
      headers: {
        authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .get("http://3.144.46.39:8080/usuario/" + data.username, config)
      .then((res) => {
        setNombre(res.data.firstname || "");
        setApellido(res.data.lastname || "");
        setPais(res.data.pais || "");
        setLocalidad(res.data.localidad || "");
        setDni(res.data.dni || "");
        setTelefono(res.data.telefono || "");
      });

    axios
      .get("http://3.144.46.39:8080/productos/" + reserva.producto)
      .then((res) => {
        setProducto(res.data);
        setImagenes(res.data.imagenes);
        setDescripcion(res.data.descripcion);
        setDetalles(res.data.detalles);
        //setPoliticas(res.data.politicas);
        setCursos(res.data.cursos);
        const cat = res.data.categoria.nombre;
        setCategoria(cat);
        obtenerFechas(
          res.data.cursos?.map((c) => c.reservas).filter((r) => r.length > 0)
        );
        if (cat == "Horas Libres") {
          setValues(new DateObject(reserva.fecha_inicio));
          setHoras(reserva.hora_inicio);
        }
        if (cat == "Licencias") {
          setValues(new DateObject(reserva.fecha_inicio));
        }

        if (cat == "Hospedajes") {
          dias([
            [
              reserva.fecha_inicio,
              reserva.fecha_fin
            ]
          ]);
        }
        setPresupuesto(reserva.precio);
        if(cat != "Hospedajes"){setCantidad(1);}
      });
  }, []);
 
  useEffect(() => {
    calcularTotal();
  }, [cantidad, horas]);

  function reservar() {
    let data = reserva;

    const config = {
      headers: {
        authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
    };
    if (categoria === "Hospedajes") {
      if (valores.length == 0) {
        alert("debes seleccionar las fechas de ChekIn checkOut");
        return;
      }
      valores?.map((x) => {
        data.fecha_inicio = x[0].format("YYYY-MM-DD");
        data.fecha_fin = x[1].format("YYYY-MM-DD");
        data.precio = precioTotal;
      });
    }
    if (categoria === "Horas Libres") {
      if (values.length == 0 || horas.length == 0) {
        alert("Debes seleccionar las fecha y hora para reservar");
        return;
      }
      data.fecha_inicio = values.format("YYYY-MM-DD");
      data.fecha_fin = values.format("YYYY-MM-DD");
      data.hora_inicio = horas[0];
      data.precio = precioTotal;
      data.cantidad = horas.length;
    }

    if (categoria === "Licencias") {

      const cursoSeleccionado = cursosf.filter(
        (curso) => curso.fechaInicio == values.format("YYYY-MM-DD"))
      
        if(cursoSeleccionado.length ==0){
        alert("Debes seleccionar un curso")
        return;
      }


      data.id_curso = cursoSeleccionado[0].id
      data.fecha_inicio = cursoSeleccionado[0].fechaInicio;
      data.fecha_fin = cursoSeleccionado[0].fechaFin;
      data.precio = precioTotal;
    }

    if (categoria == "Merchandising" || categoria == "Uniformes") {
      data.cantidad = cantidad;
      data.precio = precioTotal;
    }
    let msj = "";
    const userData = {
      username: token.username,
      firstname: nombre,
      telefono: telefono,
      dni: dni,
      localidad: localidad,
      lastname: apellido,
      pais: pais,
    };

    axios.put("http://3.144.46.39:8080/usuario", userData, config);

    axios.post("http://3.144.46.39:8080/reservas", data, config).then((res) => {
      msj = res.data;

      alert("Reserva realizada", msj);

      navigate("/profile/" + token.id);
    });
  }

  function selectHora(event) {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }

    setHoras(value);
  }

  function calendario() {
    switch (categoria) {
      case "Licencias":
        return (
          <>
            <h4 style={{ marginTop: "20px" }}> CONFIRMAR FECHA DE INICIO:</h4>
            <div style={{ position: "relative", width: "100%" }}>
              <Calendar
                placeholder="CONFIRMAR FECHA DE INICIO:"
                months={months}
                month="hide"
                className="bg-dark"
                onlyMonthPicker
                value={values}
                onChange={setValues}
                minDate={new Date()}
              />
            </div>
          </>
        );

      case "Horas Libres":
        return (
          <>
            <h5 style={{ marginTop: "40px" }}>
              {" "}
              SELECCIONA EL DIA Y LA HORA DE COMIENZO DE LA PRACTICA:
            </h5>
            <div className={styles.diayhora}>
              <div className={styles.calendarioHoras}>
                <div style={{ position: "relative" }}>
                  <Calendar
                    weekDays={weekDays}
                    months={months}
                    className="bg-dark"
                    value={values}
                    onChange={setValues}
                    mapDays={({ date }) => {
                      const strDate = date.format();
                      if (isReserved(strDate))
                        return {
                          disabled: true,
                        };
                    }}
                    minDate={new DateObject().add(1, "day")}
                  />
                </div>
              </div>
              <FormControl>
                <InputLabel
                  shrink
                  htmlFor="selecthoras"
                  sx={{ marginTop: "20px" }}
                >
                  Hora
                </InputLabel>
                <Select
                  sx={{
                    width: 90,
                    backgroundColor: "#212529",
                    marginTop: "20px",
                  }}
                  multiple
                  native
                  value={horas}
                  onChange={selectHora}
                  label="Horas disponibles"
                  inputProps={{
                    id: "selecthoras",
                  }}
                >
                  {horasDisp.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </div>
          </>
        );
      case "Hospedajes":
        return (
          <>
            <h4 style={{ marginTop: "30px" }}>
              {" "}
              SELECCIONA LAS FECHAS DEL HOSPEDAJE:
            </h4>
            <div style={{ position: "relative", width: "100%" }}>
              <Calendar
                numberOfMonths={2}
                weekDays={weekDays}
                months={months}
                className="bg-dark"
                value={valores}
                multiple
                range
                minDate={new Date()}
                maxDate={new Date(cursos[0].fechaFin)}
                onChange={(e)=>dias(e)}
                mapDays={({ date }) => {
                  const strDate = date.format();
                  if (isReserved(strDate))
                    return {
                      disabled: true,
                    };
                }}
              >
                <button
                  className="button-primary"
                  onClick={() => dias([])}
                >
                  Clear
                </button>
              </Calendar>
              {/*
              <FaCalendar
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "15px", // Ajusta la posición del icono según tus preferencias
                  transform: "translateY(-50%)",
                  fontSize: "1rem", // Ajusta el tamaño del icono según tus preferencias
                }}
              />*/}
            </div>
          </>
        );
      default:
        break;
    }
  }

  function montos() {
    let titulo = "PRECIO:";
    let precio = "Debes estar logueado para ver el precio y reservar.";
    let mostrarCantidad = false;

    if (token) {
      precio = "$ " + presupuesto;

      switch (categoria) {
        case "Licencias":
          titulo = "VALOR:";
          break;
        case "Horas Libres":
          titulo = "PRECIO POR HORA:";
          break;
        case "Hospedajes":
          titulo = "PRECIO POR DÍA:";
          break;
        default:
          titulo = "PRECIO:";
          mostrarCantidad = true;
          break;
      }
    }

    return (
      <>
        <p>{titulo}</p>
        <p>{precio}</p>
        {mostrarCantidad && (
          <TextField
            label="Cantidad"
            variant="outlined"
            required
            type="number"
            placeholder="Cantidad"
            name={"cantidad"}
            value={cantidad}
            onChange={(e) =>
              setCantidad(e.target.value >= 1 ? e.target.value : 1)
            }
          />
        )}
      </>
    );
  }

  function mostrarTotal() {
    let titulo = "PRECIO TOTAL:";
    let precio = "";
    let tituloBoton = "Reservar";

    if (token) {
      precio = "$ " + presupuesto;

      switch (categoria) {
        case "Licencias":
          titulo = "VALOR TOTAL:";
          break;
        case "Horas Libres":
          precio = "$ " + precioTotal;
          break;
        case "Hospedajes":
          precio = "$ " + precioTotal;
          break;
        default:
          precio = "$ " + precioTotal;
          tituloBoton = "Comprar";
          break;
      }
    }

    return (
      <div className={styles.montoTotal}>
        
        <p>{titulo} {precio}</p>
        <p></p>
        
        <button className="button-primary" onClick={reservar}>
          {tituloBoton}
        </button>
      </div>
    );
  }

  function calcularDuracion(fechaInicio, fechaFin) {
    const inicio = dayjs(fechaInicio);
    const fin = dayjs(fechaFin);

    return fin.diff(inicio, "M") == 0
      ? fin.diff(inicio, "d") + " DÍAS"
      : fin.diff(inicio, "M") + " MESES";
  }

  return (
    <div className={styles.raiz}>
      {/*console.log("Render")*/}

      <div className={styles.cuerpo}>
        <div className={styles.encabezado}>
          <div className={styles.textos}>
            <span className={styles.titulo}>
              {producto?.nombre?.toString().toUpperCase()}
            </span>
            <p className={styles.pp}>{descripcion}</p>
            <div className={styles.presupuesto}>
              <div className={styles.calendario}>{calendario()}</div>
              <div className={styles.montos}>{montos()}</div>
            </div>
          </div>

          <div className={styles.galeria}>
            <div >
              <img className={styles.imagen} src={imagenes[0]?.ruta} alt="" />
            </div>

            <div className={styles.barra}>
              {imagenes.slice(1, 4).map((im) => (
                <div key={im?.ruta} className={styles.cont_min}>
                  <img
                    src={im?.ruta + "_tn.jpg"}
                    alt=""
                    className={styles.imagen_min}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.caracteristicas}>
          
          <div className={styles.detalles}>
            {detalles?.map((detalle) => (
              <div key={detalle.id} className={styles.iconos}>
                <img src={detalle.image} alt="" className={styles.iconos2} />
                {detalle.cantidad != 1 ? (
                  <p className={styles.pCaracteristicas}>
                    &nbsp;&nbsp; {detalle.cantidad} {detalle.descripcion}
                  </p>
                ) : (
                  <p>&nbsp;&nbsp;{detalle.descripcion}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.inicioCursos}>
          {categoria == "Licencias" &&
            (cursosf.length > 0 ? (
             
              <h4>SELECCIONA EL CURSO:</h4>
            ) : (
              <h4>NO HAY INICIOS A PARTIR DE LA FECHA SELECCIONADA</h4>
            ))}
          {categoria == "Licencias" &&
            cursosf?.map((curso) => (
              <div
                key={curso.id}
                className={
                  dayjs(curso.fechaInicio).format("DD/MM/YYYY") ==
                  values.format("DD/MM/YYYY")
                    ? styles.resultadoSeleccionado
                    : styles.contenedorResultados
                }
              >
                <div className={styles.resultados}>
                  <span>FECHA DE INICIO</span>
                  <span>{dayjs(curso.fechaInicio).format("DD/MM/YYYY")}</span>
                </div>
                <div className={styles.resultados}>
                  <span>DURACION</span>
                  <span>
                    {calcularDuracion(curso.fechaInicio, curso.fechaFin)}
                  </span>
                </div>
                <div className={styles.resultados}>
                  <span>MODALIDAD</span>
                  <span>{curso.modalidad}</span>
                </div>
                <div className={styles.resultados}>
                  {
                    <button
                      onClick={() =>
                        setValues(new DateObject(curso.fechaInicio))
                      }
                      className="button-primary"
                    >
                      Seleccionar
                    </button>
                  }
                </div>
              </div>
            ))}
        </div>
        {/*
        <div className={styles.contenedorPoliticas}>
          {politicas?.map((politica) => (
            <div key={politica.id} className={styles.politica}>
              <h5>{politica.titulo}</h5>
              <span>{politica.descripcion}</span>
            </div>
          ))}
        </div>
        */}
        <div className={styles.formulario}>
          <TextField
            className={styles.inputs}
            id="username"
            label="Email"
            //variant="standard"
            name="user_email"
            value={token.username}
          />
          <TextField
            className={styles.inputs}
            id="nombre"
            label="Nombre"
            //variant="standard"
            value={nombre}
            error={nombreError !== ""}
            helperText={nombreError}
            onChange={(e) => {
              setNombreError("");
              setNombre(e.target.value);
            }}
          />
          <TextField
            className={styles.inputs}
            id="apellido"
            label="Apellido"
            //variant="standard"
            value={apellido}
            error={apellidoError !== ""}
            helperText={apellidoError}
            onChange={(e) => {
              setApellidoError("");
              setApellido(e.target.value);
            }}
          />
          <TextField
            className={styles.inputs}
            id="pais"
            label="Pais"
            //variant="standard"
            value={pais}
            error={paisError !== ""}
            helperText={paisError}
            onChange={(e) => {
              setPaisError("");
              setPais(e.target.value);
            }}
          />
          <TextField
            className={styles.inputs}
            id="localidad"
            label="Localidad"
            //variant="standard"
            value={localidad}
            error={localidadError !== ""}
            helperText={localidadError}
            onChange={(e) => {
              setLocalidadError("");
              setLocalidad(e.target.value);
            }}
          />

          <TextField
            className={styles.inputs}
            id="dni"
            label="DNI o Pasaporte"
            //variant="standard"
            value={dni}
            error={dniError !== ""}
            helperText={dniError}
            onChange={(e) => {
              setDniError("");
              setDni(e.target.value);
            }}
          />
          <TextField
            className={styles.inputs}
            id="telefono"
            label="Telefono"
            //variant="standard"
            value={telefono}
            error={telefonoError !== ""}
            helperText={telefonoError}
            onChange={(e) => {
              setTelefonoError("");
              setTelefono(e.target.value);
            }}
          />
        </div>
        {mostrarTotal()}
      </div>
    </div>
  );
}
