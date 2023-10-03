import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import "./BannerWithInput.css";

export default function BannerWithInput() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState("next");

  const images = [
    {
      image: "banner4.jpg",
      title: "Horas de vuelo libres",
      button: "Reservar",
      url: "/productos/153"
    },
    {
      image: "banner3.jpg",
      title: "Uniforme de Invierno",
      button: "¡Lo quiero!",
      url: "/productos/159"
    },
    {
      image: "banner1.png",
      title: "HABILITACIÓN AIRBUS A320",
      button: "¡Últimos cupos!",
      url: "/productos/81"
    },
    {
      image: "banner2.png",
      title: "Tripulante de cabina de pasajeros",
      button: "¡Quiero inscribirme!",
      url: "/productos/67"
    }
    
  ];

  const handlePrevImage = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTransitionDirection("prev");

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
        setIsTransitioning(false);
      }, 500);
    }
  };

  const handleNextImage = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTransitionDirection("next");

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 500);
    }
  };


  const tiempoIntervalo = 4000;

  useEffect(() => {
    const cambiarImagenAutomaticamente = () => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setTransitionDirection("next");

        setTimeout(() => {
          setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
          );
          setIsTransitioning(false);
        }, 500);
      }
    };

    
    const intervalo = setInterval(cambiarImagenAutomaticamente, tiempoIntervalo);

    return () => clearInterval(intervalo);
  }, [currentImageIndex, isTransitioning]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
      }}
    >
      <img
        className={isTransitioning ? `image-${transitionDirection}` : "image-active"}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
        alt="avion"
        src={images[currentImageIndex].image}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h1
          style={{
            fontFamily: "Roboto, sans-serif",
            color: "white",
            padding: "10px",
            border: "none",
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "50px"
          }}
        >
          {images[currentImageIndex].title.toUpperCase()}
        </h1>
        <Link
          to={images[currentImageIndex].url}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "2px solid rgb(0, 137, 254)",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            textDecoration: "none"
          }}
          

        >
          {images[currentImageIndex].button}
        </Link>
      </div>

      <button
        onClick={handlePrevImage}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          padding: "5px 10px",
          background: "transparent",
          height: "90%",
          color: "rgba(0, 137, 254, 1)",
          cursor: "pointer",
          fontSize: "50px",
          border: "none",
          transition: "background-color 0.3s ease"
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(0, 137, 254, 0.05)")} // Cambiar el color de fondo al hacer hover
        onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")} // Restaurar el color de fondo al salir del hover

      >
        &#8249;
      </button>
      <button
        onClick={handleNextImage}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          padding: "5px 10px",
          background: "transparent",
          height: "90%",
          color: "rgba(0, 137, 254, 1)",
          cursor: "pointer",
          fontSize: "50px",
          border: "none",
          transition: "background-color 0.3s ease"
        }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(0, 137, 254, 0.05)")} // Cambiar el color de fondo al hacer hover
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")} // Restaurar el color de fondo al salir del hover
      >
        &#8250;
      </button>
    </Box>
  );
}
