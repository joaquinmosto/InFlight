import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./detail.module.css";
import BotonGaleria from "./BotonGaleria";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "./bg-dark.css";
import dayjs from "dayjs";
import { FormControl, InputLabel, Select } from "@mui/material";
import { FaCalendar } from "react-icons/fa";
import { useGlobalState } from "../../utils/Context";

import ListaRating from "./rating/ListaRating";
import { useRef } from "react";

const Detail = () => {
  const params = useParams();
  const [values, setValues] = useState(new Date());
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [producto, setProducto] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [cursosf, setCursosf] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [descripcion, setDescripcion] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [politicas, setPoliticas] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [horas, setHoras] = useState([]);
  const [presupuesto, setPresupuesto] = useState(0);
  const [reservas, setReservas] = useState([]);
  const [puntuado, setPuntuado] = useState(false);
  const [rating, setRating] = useState(0);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const { setRedirectProduct, setReserva } = useGlobalState();
  const datePickerRef = useRef();
  const horasDisp = ["09:00", "10:00", "11:00", "12:00"];

  /* MODAL */
  const [listaPuntuaciones, setListaPuntuaciones] = useState([]);

  const url = "http://3.144.46.39:8080/puntuaciones";

  function promediar(lista) {
    let sumatoria = 0;
    lista.forEach((element) => {
      sumatoria += element.calificacion;
    });
    return lista.length > 0 ? (sumatoria / lista.length).toFixed(1) : 0;
  }

  async function fetchDataModal() {
    const response = await axios.get(url);
    const data = response.data;
    const filtradoPorProducto = data.filter(
      (element) => element.idProducto == params.id
    );
    setPuntuado(
      filtradoPorProducto.some(
        (puntuacion) =>
          puntuacion.username ===
          JSON.parse(localStorage.getItem("userData"))?.username
      )
    );
    setListaPuntuaciones(filtradoPorProducto);
    setRating(promediar(filtradoPorProducto));
  }

  /* MODAL */

  function isReserved(strDate) {
    return reservas.some(([start, end]) => strDate >= start && strDate <= end);
  }
  /* const form = useRef();

  const sendEmail = (serviceId) => {
    emailjs
      .sendForm(
        serviceId,
        "template_uqu2sgv",
        form.current,
        "ZGHqjA6dS6ZEt59AV",
        {
          user_name: localStorage.getItem("userData").firstname,
          user_email: localStorage.getItem("userData").username,
          product_name: producto.nombre,
          precio: presupuesto,
        }
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };*/

  const roundedRating = Math.round(rating);

  const closePopup = () => {
    setPopupOpen(false);
  };

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

  useEffect(() => {
    /* lista de puntuaciones */
    fetchDataModal();

    const c = cursos.filter((curso) => dayjs(curso.fechaInicio) >= values);
    if (categoria === "Licencias") {
      setMes(months[new Date(values).getMonth()].toUpperCase());
      setCursosf(c);
    }
  }, [values]);

  function obtenerFechas(res) {
    let resFechas = [];
    res.forEach((r) => {
      resFechas = r.map((f) => [
        new DateObject(f.fecha_inicio).format(),
        new DateObject(f.fecha_fin).format(),
      ]);
    });

    setReservas(resFechas);
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    setToken(data ? data : "");
    axios.get("http://3.144.46.39:8080/productos/" + params.id).then((res) => {
      setProducto(res.data);
      setImagenes(res.data.imagenes);
      setDescripcion(res.data.descripcion);
      setDetalles(res.data.detalles);
      setPoliticas(res.data.politicas);
      setCursos(res.data.cursos);
      setCategoria(res.data.categoria.nombre);
      obtenerFechas(
        res.data.cursos?.map((c) => c.reservas).filter((r) => r.length > 0)
      );

      setValues(new Date());
      let precio = 0;
      res.data.detalles.forEach((detalle) => {
        precio += detalle.precio * detalle.cantidad;
      });
      setPresupuesto(precio);
    });
  }, []);

  function reservar(id, fechaInicio, fechaFin) {
    const data = {
      user: token.username,
      producto: producto.id,
      nombre_producto: producto.nombre,
      id_curso: cursos[0]?.id ? cursos[0].id : "",
      fecha_inicio: "",
      fecha_fin: "",
      hora_inicio: "",
      hora_fin: "",
      precio: presupuesto,
      cantidad: 1
    };

    if (categoria === "Hospedajes") {
      if (valores.length == 0) {
        alert("debes seleccionar las fechas de ChekIn checkOut");
        return;
      }

      valores?.map((x) => {
        data.fecha_inicio = x[0].format("YYYY-MM-DD");
        data.fecha_fin = x[1].format("YYYY-MM-DD");
      });
    }

    if (categoria === "Horas Libres") {
      if (values.length == 0 || horas.length == 0) {
        alert("Debes seleccionar las fecha y hora para reservar");
        return;
      }
      data.fecha_inicio = values.format("YYYY-MM-DD");
      data.fecha_fin = values.format("YYYY-MM-DD");
      data.hora_inicio = horas;
    }

    if (categoria === "Licencias") {
      data.fecha_inicio = fechaInicio;
      data.fecha_fin = fechaFin;
    }

    setReserva(data);
    navigate("/reserva");
  }

  function selectHora(event) {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    //console.log(value);
    setHoras(value);
  }
  /*calendarPosition={"mainPosition: bottom"}*/
  function calendario() {
    switch (categoria) {
      case "Licencias":
        return (
          <>
            <h4 style={{ marginTop: "20px" }}> BUSCAR POR MES DE INICIO:</h4>
            <div style={{ position: "relative", width: "100%" }}>
              <DatePicker
                placeholder="BUSCAR POR MES DE INICIO:"
                months={months}
                month="hide"
                className="bg-dark"
                onlyMonthPicker
                value={values}
                onChange={setValues}
                minDate={new Date()}
                style={{
                  background: "transparent",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "15px", // Ajusta el tamaño de fuente según tu preferencia
                  color: "white",
                  width: "100%",
                  height: "2rem",
                  paddingLeft: "35px", // Espacio para el icono
                }}
              />
              <FaCalendar
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "15px", // Ajusta la posición del icono según tus preferencias
                  transform: "translateY(-50%)",
                  fontSize: "1rem", // Ajusta el tamaño del icono según tus preferencias
                }}
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
                  <DatePicker
                    ref={datePickerRef}
                    weekDays={weekDays}
                    months={months}
                    className="bg-dark"
                    value={values}
                    onChange={setValues}
                    minDate={new DateObject().add(1, "day")}
                    //maxDate={new Date(cursos[0].fechaFin)}
                    mapDays={({ date }) => {
                      const strDate = date.format();
                      if (isReserved(strDate))
                        return {
                          disabled: true,
                        };
                    }}
                    style={{
                      background: "transparent",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      fontSize: "15px", // Ajusta el tamaño de fuente según tu preferencia
                      color: "white",
                      width: "100%",
                      height: "2rem",
                      paddingLeft: "35px", // Espacio para el icono
                    }}
                  >
                    <button
                      className="button-primary-distinto"
                      onClick={() => setValues()}
                    >
                      Clear
                    </button>
                    <button
                      className="button-primary"
                      onClick={() => datePickerRef.current.closeCalendar()}
                    >
                      Close
                    </button>
                  </DatePicker>
                  <FaCalendar
                    style={{
                      position: "absolute",
                      top: "45%",
                      left: "15px", // Ajusta la posición del icono según tus preferencias
                      transform: "translateY(-50%)",
                      fontSize: "1rem", // Ajusta el tamaño del icono según tus preferencias
                    }}
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
              <DatePicker
                ref={datePickerRef}
                numberOfMonths={2}
                weekDays={weekDays}
                months={months}
                className="bg-dark"
                value={valores}
                multiple
                range
                placeholder="ChekIn-CheckOut"
                minDate={new Date()}
                maxDate={new Date(cursos[0].fechaFin)}
                onChange={setValores}
                mapDays={({ date }) => {
                  const strDate = date.format();
                  //console.log(strDate)
                  if (isReserved(strDate))
                    return {
                      disabled: true,
                    };
                }}
                style={{
                  background: "transparent",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "15px", // Ajusta el tamaño de fuente según tu preferencia
                  color: "white",
                  width: "230px",
                  height: "2rem",
                  paddingLeft: "35px", // Espacio para el icono
                }}
              >
                <button
                  className="button-primary-distinto"
                  onClick={() => setValores([])}
                >
                  Clear
                </button>
                <button
                  className="button-primary"
                  onClick={() => datePickerRef.current.closeCalendar()}
                >
                  Close
                </button>
              </DatePicker>

              <FaCalendar
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "15px", // Ajusta la posición del icono según tus preferencias
                  transform: "translateY(-50%)",
                  fontSize: "1rem", // Ajusta el tamaño del icono según tus preferencias
                }}
              />
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
    let mostrarBoton = false;
    let tituloBoton = "Reservar";
    let mostrarLogin = true;
    if (token) {
      precio = "$ " + presupuesto;
      mostrarLogin = false;
      switch (categoria) {
        case "Licencias":
          titulo = "VALOR:";
          //noLogin = " ";
          break;
        case "Horas Libres":
          titulo = "PRECIO POR HORA:";
          break;
        case "Hospedajes":
          titulo = "PRECIO POR DÍA:";
          //noLogin ="Debes reservar Licencias/horas para poder reservar hospedaje";
          break;
        default:
          mostrarBoton = true;
          titulo = "PRECIO:";
          tituloBoton = "Comprar";
          break;
      }
    }

    return (
      <>
        <p>{titulo}</p>
        <p>{precio}</p>
        {mostrarBoton && (
          <button
            className="button-primary"
            to={"/reserva"}
            onClick={() => reservar()}
          >
            {tituloBoton}
          </button>
        )}
        {mostrarLogin && (
          <Link
            className="button-primary"
            to={"/login"}
            onClick={() => setRedirectProduct(producto.id)}
          >
            Iniciar sesión
          </Link>
        )}
      </>
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
    <>
      {/*console.log("Render")*/}
      <div className={styles.barra}>
        {imagenes.slice(1, 5).map((im) => (
          <div key={im?.ruta} className={styles.cont_min}>
            <img
              src={im?.ruta + "_tn.jpg"}
              alt=""
              className={styles.imagen_min}
            />
          </div>
        ))}
        <BotonGaleria images={imagenes} />
      </div>
      <div className={styles.detail_contenedor}>
        <div className={styles.imagen}>
          <img src={imagenes[0]?.ruta} alt="" className={styles.imagen2} />
        </div>

        <div className={styles.botonGaleria}>
          <span className={styles.titulo}>
            {producto?.nombre?.toString().toUpperCase()}
          </span>
        </div>
        <div className={styles.caracteristicasdescripcion}>
          <div className={styles.caracteristicas}>
            <div className={styles.detalles}>
              <h5 className={styles.textcaract}>CARACTERISTICAS </h5>
              {detalles?.map((detalle) => (
                <div key={detalle.id} className={styles.iconos}>
                  <img src={detalle.image} alt="" className={styles.iconos2} />
                  {/* Si el detalle.cantidad es 1 quiere decir que no tiene una caractristica númerica como puede ser el caso de las */}
                  {detalle.cantidad != 1 ? (
                    <p>
                      &nbsp;&nbsp; {detalle.cantidad} {detalle.descripcion}
                    </p>
                  ) : (
                    <p>&nbsp;&nbsp;{detalle.descripcion}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.descripcion}>
            <button
              onClick={() => navigate("/home")}
              className={styles.botonatras}
            >
              ↩
            </button>
            <img
              src="/imagen-descripcion.png"
              className={styles.imagendescripcion}
            />
            <p className={styles.p}>{descripcion}</p>
          </div>
        </div>
        <div className={styles.presupuesto}>
          <div className={styles.montos}>{montos()}</div>
          <div className={styles.calendario}>
            {
              // Seccion calendario
              calendario()
            }
            {token &&
              (categoria == "Horas Libres" || categoria == "Hospedajes") && (
                <button
                  className="button-primary"
                  to={"/reserva"}
                  onClick={() => reservar()}
                >
                  Iniciar reserva
                </button>
              )}
          </div>
        </div>

        <div className={styles.inicioCursos}>
          {categoria == "Licencias" &&
            (cursosf.length > 0 ? (
              <h4>PROXIMOS INICIOS DESDE {mesSeleccionado}:</h4>
            ) : (
              <h4>NO HAY INICIOS A PARTIR DE LA FECHA SELECCIONADA</h4>
            ))}
          {categoria == "Licencias" &&
            cursosf?.map((curso) => (
              <div key={curso.id} className={styles.contenedorResultados}>
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
                  {token ? (
                    <button
                      className="button-primary"
                      to={"/reserva"}
                      onClick={() =>
                        reservar(curso.id, curso.fechaInicio, curso.fechaFin)
                      }
                    >
                      Reservar
                    </button>
                  ) : (
                    <Link
                      className="button-primary"
                      to={"/login"}
                      onClick={() => setRedirectProduct(producto.id)}
                    >
                      Iniciar sesión
                    </Link>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <ListaRating
          promedio={rating}
          roundedRating={roundedRating}
          puntuado={puntuado}
          listaPuntuaciones={listaPuntuaciones}
          isOpen={isPopupOpen}
          onClose={closePopup}
          idProducto={params.id}
        />

        <div className={styles.contenedorPoliticas}>
          {politicas?.map((politica) => (
            <div key={politica.id} className={styles.politica}>
              <h5>{politica.titulo}</h5>
              <span>{politica.descripcion}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Detail;
