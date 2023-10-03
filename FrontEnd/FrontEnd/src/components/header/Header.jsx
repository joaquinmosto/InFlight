import { useEffect} from "react";
import { useGlobalState } from "../../utils/Context";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import AccountMenu from "./iconMenu/AccountMenu";

const Header = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { loggedState, setLoggedState } = useGlobalState();
  const { setCategorySelected } = useGlobalState();


  useEffect(() => {
    userData != null ? setLoggedState(true) : setLoggedState(false);
  }, [userData]);

  const handleLink = () => {
    setCategorySelected("Todos");
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
  };


  const handleInitials = () => {
    if (userData) {
      const firstNameInitial = userData.firstname.charAt(0).toUpperCase();
      const lastNameInitial = userData.lastname.charAt(0).toUpperCase();
      return `${firstNameInitial}${lastNameInitial}`
    } return "UserName"
  };


  return (
    <div className={styles.div}>
      <Link className={styles.link} to={"/home"} onClick={handleLink}>
        <div className={styles.contenedor}>
          <img
            className={styles.isologotipo}
            src="/isologotipo1.png"
            alt="iso logotipo"
          />
          <img
            className={styles.logoazul}
            src="/logoazul-degrade.png"
            alt="iso logotipo"
          />
        </div>
      </Link>

      <div className={styles.contenedor}>
        {loggedState ? <AccountMenu handleInitials={handleInitials} handleLogout={handleLogout} role={userData.role} username={userData.username} />
          : (
            <div>
              <Link className="button-primary-distinto" to={"/register"}>
                Crear cuenta
              </Link>
              <Link className="button-primary" to={"/login"}>
                Iniciar sesión
              </Link>
            </div>
          )}
      </div>
    </div>
  );
};

export default Header;