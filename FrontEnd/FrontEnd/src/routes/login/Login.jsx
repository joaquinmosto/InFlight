import axios from "axios";
import {  useReducer } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useGlobalState } from "../../utils/Context";
import { Box, Container, TextField } from "@mui/material";
import styles from "./login.module.css";


const Login = (props) => {
  
  const {setCategorySelected, redirectProduct} = useGlobalState()
  const apiUsers = "http://localhost:8080/auth/login";

  const initialLoginStates = {
    username: "",
    password: "",
    usernameError: "",
    passwordError: "",
    credentialError:""
  };

  const reducer = (state, action) => {
           switch (action.type) {
             case 'SET_USERNAME':
               return { ...state, username: action.payload};
             case 'SET_PASSWORD':
               return { ...state, password: action.payload};
             case 'SET_USERNAME_ERROR':
               return { ...state, usernameError: action.payload};
             case 'SET_PASSWORD_ERROR':
               return { ...state, passwordError: action.payload};
               case 'SET_CREDENTIAL_ERROR':
                return { ...state, credentialError: action.payload};
             
             default:
               return state;
           }
         };

         const [loginStates, dispatch] = useReducer(reducer, initialLoginStates);
             const validEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
           const handleSubmit = async (e) => {
             e.preventDefault()
             dispatch({ type: 'SET_USERNAME_ERROR', payload: '' });
             dispatch({ type: 'SET_PASSWORD_ERROR', payload: '' });
             
             if(loginStates.username === ""){
                 dispatch({ type: 'SET_USERNAME_ERROR', payload: 'Error: Este campo es obligatorio' });
                 dispatch({ type: 'SET_CREDENTIAL_ERROR', payload: '' });
             }else if(!validEmail.test(loginStates.username)){
                 dispatch({ type: 'SET_USERNAME_ERROR', payload: 'Error: El formato de correo es inválido' });
                 dispatch({ type: 'SET_CREDENTIAL_ERROR', payload: '' });
             }
             else if(loginStates.password === ""){
                 dispatch({ type: 'SET_PASSWORD_ERROR', payload: 'Error: Este campo es obligatorio' });
                 dispatch({ type: 'SET_CREDENTIAL_ERROR', payload: '' });
           }
           else{
             try {
                 const response = await axios.post(apiUsers, {
                     username: loginStates.username,
                     password: loginStates.password,
                   }, {
                     headers: {
                       'Content-Type': 'application/json'
                     }
                   });
             if (response.status === 200) {
               localStorage.setItem('userData', JSON.stringify(response.data))
               redirectProduct ? window.location.href = `/productos/${redirectProduct}`: window.location.href = "/home"
             } 
           } catch (error) {
            if(error.response.status === 403){
              dispatch({ type: 'SET_CREDENTIAL_ERROR', payload: 'Error: El nombre de usuario o la contraseña son incorrectos o no existen' });
            
             }
           }
         }
         }

         const handleLink = () =>{
          setCategorySelected("Todos")
        }

         const errorMessage = {
          color: "red", // Rojo suave en formato hexadecimal
          backgroundColor: "#FFD9D9", // Rojo claro en formato hexadecimal
          fontSize: "14px",
          padding: "8px",
          borderRadius: "5px",
          marginTop: "10px"
         }
         return (
          <>
            <div
              className={styles.containerGeneral}> 
              <div className={styles.imgDiv}>
              <img src="/avion1.jpeg" alt="avion" className={styles.imgAvion} />
              </div>
              <div
                className={styles.loginContainer}
             
              >
                <section className={styles.contenedorForm}
                style={{
                  marginTop: "40px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}> 
                
                <Link to={"/home"} onClick={handleLink}> 
                <img src="/logoazul-degrade.png" alt="logoazul" className={styles.logoAzul}
                />
                </Link>
                
                <h2 className={styles.nose}>
                  Iniciar Sesion
                </h2>
                {loginStates.credentialError && (
                  <div className="error-message" style={errorMessage}>{loginStates.credentialError}</div>
                )}
                <form
                  className={styles.form}
                  method="post"
                  
                >  
                  <div className={styles.formGroup}>
                    
                    {loginStates.usernameError && (
                      <div className="error-message" style={errorMessage}>{loginStates.usernameError}</div>
                    )}
                    <input
                      className={styles.input1}
                      onChange={(e) =>
                        dispatch({ type: "SET_USERNAME", payload: e.target.value })
                      }
      
                      placeholder="Ingrese su email" // Placeholder actualizado
                    />
                  </div>
                  <div className={styles.formGroup} >
                    
                    {loginStates.passwordError && (
                      <div className="error-message" style={errorMessage}>{loginStates.passwordError}</div>
                    )}
                    <input
                      type="password"
                      className={styles.input2}
                      onChange={(e) =>
                        dispatch({ type: "SET_PASSWORD", payload: e.target.value })
                      }
                      
                      placeholder="Ingrese su contraseña"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className={styles.loginbtn}
                  >
                    Iniciar Sesión
                  </button>
                </form>
                <Link className={styles.sinCuenta}
                  to={"/register"}
                  
                >
                  ¿No tienes una cuenta? Regístrate aquí
                </Link>
                
                </section>
              </div>
            </div>
          </>
        );
        };

export default Login;






