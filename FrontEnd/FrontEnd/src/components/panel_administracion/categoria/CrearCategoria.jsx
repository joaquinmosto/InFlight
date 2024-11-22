import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
} from "@mui/material";
import swal from "sweetalert";

function CrearCategoria() {
  const [checked, setChecked] = useState(false);
  const [token, setToken] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    image: "",
    reservable: checked
  });

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

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

    const categoriaData = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      image: await imageToBase64(formData.image),
      reservable: checked
    };

    try {
      const response = await fetch("http://localhost:8080/categorias", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoriaData),
      });

      if (response.status == 400) {
        const res = await response.text();
        console.log("Error al crear el categoria: " + res);
        //  mostar cartel de error de acuerdo a la respuesta
        //  la api responde con 400 cuando el nombre ya existe
        swal({
          icon: "error",
          title: "Error al crear el categoria: ",
          text: res,
          closeOnClickOutside: false,
          closeOnEsc: false,
          button: "Aceptar",
        });
      }
      if (response.ok) {
        swal({
          icon: "success",
          title: "Categoria creada correctamente.",
          closeOnClickOutside: false,
          closeOnEsc: false,
          button: "Aceptar",
        });
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
      });
    }
  };

  return (
    <div className="form">
      <Box component="form" onSubmit={handleSubmit}>
        <h2>Agregar Categoría</h2>
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
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 850 }}>
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
        </FormControl>
        <FormControlLabel
          sx={{ m: 1, minWidth: 850 }}
          required
          control={<Checkbox 
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}/>}
          label="Incluye Reservas? (Ej: Cursos, Hospedajes)"
        />
        <FormControl sx={{ m: 1, minWidth: 850 }}>
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
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 850 }}>
          <Button sx={{ minWidth: 850 }} type="submit">
            Enviar
          </Button>
        </FormControl>
      </Box>
    </div>
  );
}

export default CrearCategoria;
