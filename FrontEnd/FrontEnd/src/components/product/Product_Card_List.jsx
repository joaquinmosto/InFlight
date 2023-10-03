/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./product_Card_List.css";

const Product_Card_List = ({ item, onEliminar }) => {
  return (
    <>
      <article className="Product-Card-List-Item">
        <Link className="link" to={"/productos/" + item.id}>
          <div className="column-list">
            <img src={item.imagen} alt={`Product N ${item.id}`} />
          </div>
          <div className="column-list">
            <h2>ID</h2>
            <p className="label-id">{item.id}</p>
          </div>
          <div className="column-list">
            <h2>Nombre</h2>
            <p className="label-name">{item.nombre}</p>
          </div>
        </Link>
        <div className="column-list">
          <h2>Acciones</h2>
          <button className="edit-btn">Editar</button>
          <button
            className="eliminate-btn"
            onClick={() => {
              onEliminar(item.id);
            }}
          >
            Eliminar
          </button>
        </div>
      </article>
    </>
  );
};

export default Product_Card_List;
