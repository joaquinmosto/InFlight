import { useEffect, useState } from "react";
import { Box, Button, FormControl, TextField } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import swal from "sweetalert";


function CrearProducto() {
  const apiUrl = "http://localhost:8080/categorias";
  const apiUrlCar = "http://localhost:8080/caracteristicas";

  const [listCategoriaState, setListCategoriaState] = useState([]);
  const [listCaracteristicas, setListCaracteristicas] = useState([]);

  const [token, setToken] = useState("");

  useEffect(() => {
    axios.get(apiUrl).then((res) => setListCategoriaState(res.data));
    axios.get(apiUrlCar).then((res) => setListCaracteristicas(res.data));
    setToken(JSON.parse(localStorage.getItem("userData")).token);
  }, []);

  
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    detalles: [{ descripcion: "", cantidad: "", precio: "" }],
    politicas:[{ titulo: "", descripcion: ""}],
    images: [],
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleItemChange = (index, field, value) => {
    const newDetalles = [...formData.detalles];
    newDetalles[index][field] = value;
    setFormData({
      ...formData,
      detalles: newDetalles,
    });
  };

  const handlePoliticaChange = (index, field, value) => {
    const newPolitica = [...formData.politicas];
    newPolitica[index][field] = value;
    setFormData({
      ...formData,
      politicas: newPolitica,
    });
  };

   const handleImageChange = (event, index) => {
    const newImages = [...formData.images];
    newImages[index] = event.target.files[0];
    setFormData({
      ...formData,
      images: newImages,
    });
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const imageToBase64 = (image) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(image);
      });
    };
    const base64Images = await Promise.all(formData.images.map(imageToBase64));
    const imgs = [];
    base64Images.forEach((img) => {
      imgs.push({ image: img });
    });
    const productoData = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      categoria: {
        id: listCategoriaState.find((i) => i.nombre == formData.categoria).id,
      },
      politicas: formData.politicas,
      detalles: formData.detalles,
      imagenes: imgs,
    };

    try {
      const response = await fetch("http://localhost:8080/productos", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoData),
      });
      
      if (response.status == 400) {
        const res = await response.text();
        console.log("Error al crear el producto: " + res);
        //  mostar cartel de error de acuerdo a la respuesta
        //  la api responde con 400 cuando el nombre ya existe
        swal({
          icon: "error",
          title: "Error al crear el producto:",
          text: res,
          closeOnClickOutside: false,
          closeOnEsc: false,
          button: "Aceptar",
        })
      }
      if (response.status === 403) {
        console.log(response);
        //  mostar cartel de error de acuerdo a la respuesta
        //  la api responde con 403 cuando el token expira
        swal({
          icon: "error",
          title: "Error al crear el producto:",
          text: "Intenta cerrando sesión y volviendo a entrar.",
          closeOnClickOutside: false,
          closeOnEsc: false,
          button: "Aceptar",
        })
      }
      if (response.ok) {
        //console.log("Producto creado correctamente.");
        // mostrar cartel de producto agregado
        swal({
          icon: "success",
          title:"Producto creado correctamente.",
          closeOnClickOutside: false,
          closeOnEsc: false,
          button: "Aceptar",
        })
        // limpiar formulario y estados
        setFormData({
          nombre: "",
          descripcion: "",
          categoria: "",
          detalles: [{ descripcion: "", cantidad: "", precio: "" }],
          politicas:[{ titulo: "", descripcion: ""}],
          images: [],
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
      // sacar esta chanchada
    }
  };
  
  return (
    <div className="form">
      <Box sx={{maxWidth:860, margin: '0 auto'}} component="form" onSubmit={handleSubmit}>
        <h2>Agregar Producto</h2>
        <FormControl sx={{ m: 1, minWidth: 850 }} required>
          <TextField
            fullWidth
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
        <FormControl sx={{ m: 1, minWidth: 850 }} required>
          <TextField
            fullWidth
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
        <FormControl sx={{ m: 1, minWidth: 850 }}>
          <InputLabel id="cat" htmlFor="categoria">
            Categoría
          </InputLabel>
          <Select
            labelId="cat"
            name="categoria"
            id="categoria"
            value={formData.categoria}
            label="Categoria"
            onChange={handleInputChange}
            required
          >
            <MenuItem value="">
              <em>Sin Categoria</em>
            </MenuItem>
            {listCategoriaState.map((cat) => (
              <MenuItem key={cat.id} value={cat.nombre}>
                {cat.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>




        <FormControl sx={{ m: 1, minWidth: 850 }}>
          <div className="form-group">
            <h3>Caracteristicas</h3>

            {formData.detalles.map((detalle, index) => (
              <div key={index}>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <InputLabel id={"car" + index} htmlFor={"car" + index}>
                    Característica
                  </InputLabel>
                  <Select
                    labelId={"car" + index}
                    name={"car" + index}
                    id={"car" + index}
                    value={detalle.descripcion}
                    label="Caracteristica"
                    onChange={(e) =>
                      handleItemChange(index, "descripcion", e.target.value)
                    }
                  >
                    <MenuItem value="">
                      <em>Sin Característica</em>
                    </MenuItem>
                    {listCaracteristicas.map((car) => (
                      <MenuItem key={car.id} value={car.nombre}>
                        {car.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  sx={{ m: 1, minWidth: 55 }}
                  label="Cantidad"
                  variant="outlined"
                  required
                  type="number"
                  placeholder="Cantidad"
                  name={"cantidad" + index}
                  value={detalle.cantidad}
                  onChange={(e) =>
                    handleItemChange(index, "cantidad", e.target.value)
                  }
                />

                <TextField
                  sx={{ m: 1, minWidth: 80 }}
                  label="Precio Unitario"
                  variant="outlined"
                  required
                  type="number"
                  placeholder="Precio Unitario"
                  name={"valor" + index}
                  value={detalle.value}
                  onChange={(e) =>
                    handleItemChange(index, "precio", e.target.value)
                  }
                />
                <Button
                  sx={{ m: 1, maxWidth: 60}}
                  className="button-primary"
                  type="button"
                  onClick={() => {
                    const newDetalles = [...formData.detalles];
                    newDetalles.splice(index, 1);
                    setFormData({ ...formData, detalles: newDetalles });
                  }}
                >
                  Quitar
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  detalles: [
                    ...formData.detalles,
                    { descripcion: "", precio: "" },
                  ],
                })
              }
            >
              Agregar Característica
            </Button>
          </div>

         

        <FormControl sx={{ m: 1, minWidth: 850 }}>
          <div className="form-group">
            <h3>Políticas</h3>

            {formData.politicas.map((politica, index) => (
              <div key={index}>
                <TextField
                  sx={{ m: 1, minWidth: 55 }}
                  label="Titulo"
                  variant="outlined"
                  required
                  type="text"
                  placeholder="Titulo"
                  name={"titulo" + index}
                  value={politica.titulo}
                  onChange={(e) =>
                    handlePoliticaChange(index, "titulo", e.target.value)
                  }
                />

                <TextField
                  sx={{ m: 1, minWidth: 520 }}
                  label="Descripcion"
                  variant="outlined"
                  required
                  type="text"
                  placeholder="Descripcion"
                  name={"descrpcion" + index}
                  value={politica.descripcion}
                  onChange={(e) =>
                    handlePoliticaChange(index, "descripcion", e.target.value)
                  }
                />
                <Button
                  sx={{ m: 1, maxWidth: 60}}
                  className="button-primary"
                  type="button"
                  onClick={() => {
                    const newPoliticas = [...formData.politicas];
                    newPoliticas.splice(index, 1);
                    setFormData({ ...formData, politicas: newPoliticas });
                  }}
                >
                  Quitar
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  politicas: [
                    ...formData.politicas,
                    { titulo:"", descripcion: ""},
                  ],
                })
              }
            >
              Agregar Políticas
            </Button>
          </div>
          </FormControl>

          <div className="form-group">
            <label>Imágenes:</label>
            {formData.images.map((image, index) => (
              <div key={index}>
                {image && (
                  <div>
                    <img
                      className="uploadimg"
                      src={URL.createObjectURL(image)}
                      alt={`Imagen ${index}`}
                    />
                    <button type="button" onClick={() => removeImage(index)}>
                      Quitar Imagen
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, index)}
                />
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                setFormData({ ...formData, images: [...formData.images, null] })
              }
            >
              Agregar imagen
            </Button>
          </div>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 850 }}>
          <Button type="submit">Crear Producto</Button>
        </FormControl>
      </Box>
    </div>
  );
}

export default CrearProducto;
