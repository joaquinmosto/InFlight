import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Box, Container, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert"
import styles from "./modal.module.css" 
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [emailError, setEmailError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const form = useRef();

  const handleLink = () =>{
    setCategorySelected("Todos")
  }

  const sendEmail = (serviceId) => {
    
    emailjs.sendForm(serviceId, 'template_uqu2sgv', form.current, 'ZGHqjA6dS6ZEt59AV', {
      user_name: firstname,
      user_email: username
    })
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  //Cuando tenga los requerimientos en las cantidad de caracteres, lo voy a modificar acá
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateName(name) {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return regex.test(name) && name.trim().length >=3;
  }

  function validateLastName(lastName) {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return regex.test(lastName) && lastName.trim().length >= 3;
  }
  

  function validatePassword(password) {
    return password.trim().length >= 3;
  }

  async function submit(e) {
    e.preventDefault();

    if (!validateEmail(username)) {
      setEmailError("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    setEmailError("");

    if (!validateName(firstname)) {
      setFirstnameError("El nombre debe constar de al menos 3 carácteres y estar compuesto exclusivamente por letras.");
      return;
    }
    setFirstnameError("");

    if (!validateLastName(lastname)) {
      setLastnameError("El apellido debe constar de al menos 3 carácteres y estar compuesto exclusivamente por letras.");
      return;
    }
    setLastnameError("");

    if (!validatePassword(password)) {
      setPasswordError("La contraseña debe tener al menos 3 carácteres.");
      return;
    }
    setLastnameError("");

    try {
      const response = await axios.post("http://3.144.46.39:8080/auth/register", {
        username,
        firstname,
        lastname,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        console.log(response.status === 200);
        swal({
          icon: "success",
          title:"Usuario creado correctamente",
          closeOnClickOutside: false,
          closeOnEsc: false,
          button: "Aceptar",
        })
        sendEmail("service_qgdsv24");
        swal({
          title: "Confirmación de correo electrónico",
          icon: "info",
          text: "¡Bienvenido a bordo!\n\n" +
          "Muchas gracias por unirte a InFlight, en estos momentos te acabamos de mandar un email con tu información de usuario, por favor, revisa que todo esté correcto.\n\n" +
          "En caso de no haber recibido el correo haz click en el botón \"Reenviar correo\", si ya lo recibiste haz click en el botón \"Continuar\".\n\n" +
          "Si hay algún inconveniente o error con el correo de confirmación o con la información de registro, puedes comunicarte con nosotros al siguiente correo: inflight.academy@gmail.com",
          closeOnClickOutside: false,
          closeOnEsc: false,
          buttons: {
            reenviar: {
              text: "Reenviar correo",
              value: "false",
              closeModal: false
            },
            continuar: {
              text: "Continuar",
              value: "true",
              className: styles.ContinuarBtn,
            }
          },
        }).then((value) => {
          console.log("the value is " + value);
          if(value === "true"){
            window.location.href = "/login";
          } else if(value === "false"){
            sendEmail("service_gh12r4y");
            swal({
              icon: "success",
              text: "Se ha reenviado el correo exitosamente. \n\n" +
              "Si hay algún inconveniente o error con el correo de confirmación o con la información de registro, puedes comunicarte con nosotros al siguiente correo: inflight.academy@gmail.com",
              closeOnClickOutside: false,
              closeOnEsc: false,
              buttons: {continuar: {
                text: "Continuar",
                value: "true",
              }
            }}).then((value) => {
              if(value === "true"){
                window.location.href = "/login";
          }})
          }
        })
      }
    } catch (error) {
      if (error?.response?.status === 403) {
        setEmailError("Este email ya se encuentra registrado");
      } else {
        console.log(error);
        swal({
          icon: "error",
          title: "Error al intentar crear el usuario: ",
          text: error.message,
          closeOnClickOutside: false,
          closeOnEsc: false,
          button: "Aceptar",
        })
      }
    }
  }

  return (
    // <div className="main" style={{
    //   display: "flex",
    //   justifyContent: "flex-end",
      
    // }}>
    //   <div className={styles.imgDiv} style={{
    //     width: "100%",
    //     height: "100vh",
        
    //   }}>
    //   <img src="/avion1.jpeg" alt="avion"/>
    //           </div>
    //   <Box
    //     component="form"
    //     ref={form}
    //     onSubmit={submit}
    //     className={styles.form}
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       gap: "15px",
    //       padding: "20px",
    //       backgroundColor: "#3A3A3A",
    //       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          
    //     }}
    //     noValidate
    //     autoComplete="off"
    //   >
    //     <Container sx={{
    //       alignItems: "center",
    //       justifyContent: "center",
    //       textAlign: "center",
    //     }}>
    //     <Link to={"/home"} onClick={handleLink}> 
    //       <img src="logoazul-degrade.png" style={{ width: "50px", height: "auto", marginTop: "35px" }} />
    //     </Link>
    //       <h4 style={{ fontSize: "40px"}}>Panel de Registro</h4>
    //     </Container>
    <div className={styles.main}>
      <div className={styles.imgDiv} >
        <img src="/avion1.jpeg" alt="avión" className={styles.imgAvion} />
      </div>
      <Box
        component="form"
        ref={form}
        onSubmit={submit}
        className={styles.formRegistro}
        noValidate
        autoComplete="off"
      >
        <Container className={styles.conct}>
          <Link to={"/home"} onClick={handleLink}> 
            <img src="logoazul-degrade.png" className={styles.logo} alt="logo" />
          </Link>
          <h4 className={styles.titulo}>Registrate aqui!</h4>
        </Container>
        <div className={styles.formulario}>
        <TextField
         className={styles.imputs}
          id="username"
          label="Email"
          //variant="standard"
          name='user_email'
          value={username}
          error={emailError !== ""}
          helperText={emailError}
          onChange={(e) => {
            setUsername(e.target.value);
            setEmailError("");
          }}
        />
        <TextField
          className={styles.imputs}
          id="firstname"
          label="Nombre"
          //variant="standard"
          name='user_name'
          value={firstname}
          error={firstnameError !== ""}
          helperText={firstnameError}
          onChange={(e) => {
            setFirstnameError("");
            setFirstname(e.target.value);
          }}
        />
        <TextField
          className={styles.imputs}
          id="lastname"
          label="Apellido"
          //variant="standard"
          value={lastname}
          error={lastnameError !== ""}
          helperText={lastnameError}
          onChange={(e) => {
            setLastnameError("");
            setLastname(e.target.value);
          }}
        />
        <TextField
          className={styles.imputs}
          id="password"
          value={password}
          error={passwordError !== ""}
          helperText={passwordError}
          onChange={(e) => {
            setPasswordError("");
            setPassword(e.target.value);
          }}
          label="Contraseña"
          //variant="standard"
          type="password"
        />
        </div>
        <div className={styles.btnLogin}>
        <button type="submit" className="button-primary" style={{
          height: "auto"
        }}>
          Crear cuenta
        </button>
        <Link to={"/login"} className={styles.login} style={{
          fontSize: "13px"
        }}>¿Ya tienes una cuenta? Inicia sesión aquí</Link>
        </div>
      </Box>
    </div>
  );
}

export default Register;


 