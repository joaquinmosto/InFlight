
import { useState } from "react";
import styles from "./ModalRating.module.css";
import { AiFillStar,AiOutlineStar } from "react-icons/ai";
import { useGlobalState } from "../../../utils/Context";
import axios from "axios";


function Modal({ isOpen, onClose, listaPuntuaciones, idProducto, puntuado }) {
  if (!isOpen) return null;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { loggedState} = useGlobalState();
  
  

  
  const fechaActual = new Date();

  const year = fechaActual.getFullYear();
  const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
  const day = String(fechaActual.getDate()).padStart(2, '0');

  const fechaActualFormateada = `${day}/${month}/${year}`;

  const handleClickRating = (starIndex) => {
    setRating(starIndex); 
  };

  const handleCommentChange = (event) => {
    
    setComment(event.target.value);
  };
  const url = 'http://localhost:8080/puntuaciones';
  console.log("puntuado", puntuado)
  function crearCalificacion() {
    axios
      .post(url, {
        username: JSON.parse(localStorage.getItem("userData")).username,
        idProducto: idProducto,
        calificacion: rating,
        comentario: comment,
        fechaCalificacion: fechaActualFormateada
      })
      .then(() => {
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSubmit = (event) => {

    event.preventDefault();
    /* hacer post para enviar calificación */
      crearCalificacion();

  };
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        {listaPuntuaciones.length != 0 ? 
        <h3>Calificaciones de los usuarios</h3> 
        : <h3>Calificar</h3>}
        <ul>
          {listaPuntuaciones.map((rating, index) => (
            <li key={index}>
            <p>Puntuación: {rating.calificacion}</p>
            <h4>{rating.comentario}</h4>
            <div className={styles.div}><p>{rating.username}</p> <p>{rating.fechaCalificacion}</p></div>
          </li>
          ))}
        </ul>
        {loggedState /* && fechaActualFormateada >= ---fechaDeFinDeReserva--- */?<div className={styles.ratingBox}>
            
            {!puntuado ? 
            <form className={styles.stars}>
              <div>

              {[1, 2, 3, 4, 5].map((starIndex) => (
                <span
                key={starIndex}
                onClick={() => handleClickRating(starIndex)}
                className={styles.star}
                >
                {starIndex <= rating ? <AiFillStar /> : <AiOutlineStar />}
                </span>
              ))}
              </div>
                <p>Tu puntuación: {rating} estrellas</p>
                <textarea placeholder="Deja un comentario..." value={comment} onChange={handleCommentChange}></textarea>
                <button onClick={handleSubmit} className="edit-btn">Enviar</button>
            </form> :
            <h2>Ya has puntuado</h2>
            }
            
          </div>
            : <h4>Debes haber terminado de utilizar el producto para poder votarlo</h4>}
            <br />
            <button onClick={onClose} className="eliminate-btn">Cerrar</button>
      </div>
    </div>
  );
}

export default Modal;