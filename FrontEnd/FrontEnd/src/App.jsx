import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./routes/home/Home";
import Reserva from "./routes/reserva/Reserva"
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Administracion from "./routes/administracion/Administracion";
import Detail from "./routes/detail/Detail";
import PaginaNoEncontrada from "./routes/paginaNoEncontrada/PaginaNoEncontrada";
import { ThemeProvider, createTheme } from "@mui/material";
import Login from "./routes/login/Login";
import ProfileDetail from "./routes/profileDetail/ProfileDetail";
import Register from "./routes/register/Register";



function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: 'rgba(255, 255, 255, 0.7)',
        main: 'rgba(255, 255, 255, 0.7)',
        dark: 'rgba(255, 255, 255, 0.7)',
        contrastText: 'rgba(255, 255, 255, 0.7)',
      }
    },
  })
  
  const location = useLocation()

  return (
    <>
      <ThemeProvider theme={theme}>
        {location.pathname !== '/login' && location.pathname !== '/register' && <Header />}
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path={`/productos/:id`} element={<Detail />} />
          <Route path="/administracion" element={<Administracion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:username" element={<ProfileDetail/>} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
        {location.pathname !== '/login' && location.pathname !== '/register' && <Footer />}
        
      </ThemeProvider>
    </>
  );
}

export default App;


