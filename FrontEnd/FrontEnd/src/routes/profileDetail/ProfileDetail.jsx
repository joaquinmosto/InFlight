// const ProfileDetail = () => {
//     const userData = JSON.parse(localStorage.getItem('userData'));
//     return (
//         <>
//         <main style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#1E1E1E' }}>
//       <article style={{ backgroundColor: 'grey', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'space-between', width: '80%' }}>
//         <p style={{ margin: '0', flex: 1 }}>Nombre</p>
//         <p style={{ margin: '0', flex: 1 }}>Apellido</p>
//         <p style={{ margin: '0', flex: 1 }}>Email</p>
//       </article>
//       <article style={{ backgroundColor: 'grey', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'space-between', width: '80%' }}>
//         <p style={{ margin: '0', flex: 1 }}>{userData.firstname}</p>
//         <p style={{ margin: '0', flex: 1 }}>{userData.lastname}</p>
//         <p style={{ margin: '0', flex: 1 }}>{userData.username}</p>
//       </article>
//     </main>
//         </>
//     )
// }

// export default ProfileDetail

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { useState } from "react";
// import { useEffect } from "react";
// import axios from "axios";

// const ProfileDetail = () => {

//   const userData = JSON.parse(localStorage.getItem("userData"));
//   const [favoriteProducts, setFavoriteProducts] = useState([]);

//   useEffect(() => {
//     // Realiza la solicitud para obtener los productos favoritos del usuario
//     const fetchFavoriteProducts = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/favoritos/${userData.email}`
//         );
//         setFavoriteProducts(response.data);
//       } catch (error) {
//         console.error("Error al obtener los productos favoritos:", error);
//       }
//     };

//     if (userData) {
//       fetchFavoriteProducts();
//     }
//   }, [userData]);

//   return (
//       <main style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#1E1E1E' }}>
//       <article style={{ backgroundColor: 'grey', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'space-between', width: '80%' }}>
//         <p style={{ margin: '0', flex: 1 }}>Nombre</p>
//         <p style={{ margin: '0', flex: 1 }}>Apellido</p>
//         <p style={{ margin: '0', flex: 1 }}>Email</p>
//       </article>
//       <article style={{ backgroundColor: 'grey', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'space-between', width: '80%' }}>
//         <p style={{ margin: '0', flex: 1 }}>{userData.firstname}</p>
//         <p style={{ margin: '0', flex: 1 }}>{userData.lastname}</p>
//         <p style={{ margin: '0', flex: 1 }}>{userData.username}</p>
//       </article>

//       {/* Sección para mostrar los productos favoritos */}
//       <section>
//         <h2>Tus productos favoritos</h2>
//         <div style={{ display: "flex", flexWrap: "wrap" }}>
//           {favoriteProducts.map((favorite) => (
//             <div
//               key={favorite.id}
//               style={{
//                 backgroundColor: "grey",
//                 border: "1px solid #ccc",
//                 padding: "20px",
//                 borderRadius: "5px",
//                 boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
//                 margin: "10px",
//               }}
//             >
//               {/* Aquí debes mostrar la información del producto */}
//               {/* Por ejemplo: */}
//               <p>Producto ID: {favorite.producto}</p>
//               {/* Agrega más detalles según tu modelo de datos */}
//             </div>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default ProfileDetail;

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { redirect } from "react-router";
import { Link } from "react-router-dom";
//import { ThemeProvider, createTheme, useTheme } from "@mui/material";

const ProfileDetail = () => {
  const [listFavoritos, setListFavoritos] = useState([]);
  const [userData, setUserData] = useState([]);
  
  const loadData = async ()=>{
    const data = await JSON.parse(localStorage.getItem("userData"));
    if (data) {
      setUserData(data);
      const apiUrl = `http://localhost:8080/favoritos/${data.username}`;
      axios.get(apiUrl).then((res) => setListFavoritos(res.data));
    } else {
      redirect("/home")
    }
   
  }
  useEffect(() => {
    loadData()    
  }, []);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  function eliminar(id, productoNombre) {
    if (
      confirm(`Está seguro que desea eliminar de favoritos a ${productoNombre}`)
    ) {
      axios.delete(`http://localhost:8080/favoritos/${id}`, config);
      setListFavoritos(listFavoritos.filter((p) => p.id != id));
    }
  }
  // const darkTheme = createTheme({
  //   palette: {
  //     mode: "dark",
  //   },
  // });

  return (
    <>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#1E1E1E",
          marginTop: "70px",
        }}
      >
        <article
          style={{
            backgroundColor: "rgb(30,30,30)",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "space-between",
            width: "80%",
            height: "20px",
            alignItems: "center",
          }}
        >
          <p style={{ margin: "0", flex: 1 }}>Nombre</p>
          <p style={{ margin: "0", flex: 1 }}>Apellido</p>
          <p style={{ margin: "0", flex: 1 }}>Email</p>
        </article>
        <article
          style={{
            backgroundColor: "rgb(30,30,30)",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "space-between",
            width: "80%",
          }}
        >
          <p style={{ margin: "0", flex: 1 }}>{userData.firstname}</p>
          <p style={{ margin: "0", flex: 1 }}>{userData.lastname}</p>
          <p style={{ margin: "0", flex: 1 }}>{userData.username}</p>
        </article>

        <TableContainer
          component={Paper}
          style={{
            marginTop: "70px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "80%",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Id Producto</TableCell>
                <TableCell align="left">Nombre Producto</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listFavoritos.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  {/* <TableCell align="left">{row.id}</TableCell> */}
                  <TableCell align="left">{row.producto}</TableCell>
                  <TableCell align="left">{row.nombreproducto}</TableCell>

                  <TableCell align="right" sx={{ display: "flex", gap: "1rem" }}>
                    <button
                      className="eliminate-btn"
                      onClick={() => {
                        eliminar(row.id, row.nombreproducto);
                      }}
                    >
                      Eliminar de favoritos
                    </button>
                    <Link to={`/productos/${row.producto}`}>
                  <button className="edit-btn">
                      Ver producto
                    </button>
                </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </>
  );
};

export default ProfileDetail;
