import { useEffect, useState } from "react";
import { Box, Button, FormControl, TextField } from "@mui/material";
import swal from "sweetalert";

function CrearCaracteristica() {
  const [token, setToken] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    image: "",
  });

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("userData")).token);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);
    const imageToBase64 = (image) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(image);
      });
    };

    const caracteristicaData = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      image: await imageToBase64(formData.image),
    };

    try {
      const response = await fetch("http://3.144.46.39:8080/caracteristicas", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(caracteristicaData),
      });

      if (response.status == 400) {
        const res = await response.text();
        console.log("Error al crear el caracteristica: " + res);
        //  mostar cartel de error de acuerdo a la respuesta
        //  la api responde con 400 cuando el nombre ya existe

        swal({
          icon: "error",
          title:"Error al crear el caracteristica:",
          text: res,
          closeOnClickOutside: false,
          closeOnEsc: false,
          button: "Aceptar",
        })
      }
      if (response.ok) {
        console.log("Caracteristica creado correctamente.");
        // mostrar cartel de caracteristica agregado
        swal({
          icon: "success",
          title:"Caracteristica creado correctamente.",
          closeOnClickOutside: false,
          closeOnEsc: false,
          button: "Aceptar",
        })
        // limpiar formulario y estados
        setFormData({
          nombre: "",
          descripcion: "",
        });
      }
    } catch (error) {
      console.error("Error en la solicitud.");
      // atajando otros errores para que no explote
      swal({
        icon: "error",
        title: "Error en la solicitud.",
        text: error.message,
        closeOnClickOutside: false,
        closeOnEsc: false,
        button: "Aceptar",
      })
    }
  };

  return (
    <div className="form">
      <Box component="form" onSubmit={handleSubmit}>
        <h2>Agregar Característica</h2>
        <FormControl sx={{ m: 1, minWidth: 850 }}>
          <TextField
            label="Nombre:"
            variant="outlined"
            required
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />

          <TextField
            label="Descripcion:"
            variant="outlined"
            required
            type="text"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
          />

          <div>
            {formData.image && (
              <div>
                <img
                  className="uploadimg"
                  src={URL.createObjectURL(formData.image)}
                  alt={`Imagen`}
                />
              </div>
            )}
            <input type="file" onChange={(e) => handleImageChange(e)} />
          </div>

          <Button sx={{ minWidth: 850 }} type="submit">
            Enviar
          </Button>
        </FormControl>
      </Box>
    </div>
  );
}

export default CrearCaracteristica;
