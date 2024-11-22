
import { useState } from "react";
import styles from "./ListaRating.module.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";


function ListaRating({ listaPuntuaciones, idProducto, puntuado, roundedRating, promedio }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');




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
        if (rating) {
            crearCalificacion();
        } else {
            alert("Debes calificar primero")
        }

    };
    return (
        <div >
            <div className={styles.modalContent}>
                <div className={styles.starsPromedio}>
                    {listaPuntuaciones.length != 0 ?
                        <h3>Calificaciones de los usuarios</h3>
                        : <h3>Calificar</h3>}
                    <div className={styles.contenedor}>
                        {[1, 2, 3, 4, 5].map((starIndex) => (
                            <span
                                key={starIndex}

                                className={styles.starProduct}
                                disabled
                            >
                                {starIndex <= roundedRating ? <AiFillStar /> : <AiOutlineStar />}
                            </span>
                        ))}
                        <p>/{promedio}</p>
                    </div>
                </div>

                <ul>
                    {listaPuntuaciones.map((rating, index) => (
                        <li key={index}>
                            <div className={styles.starsPromedio}>
                                <div className={styles.contenedor}>
                                    {[1, 2, 3, 4, 5].map((starIndex) => (
                                        <span
                                            key={starIndex}

                                            className={styles.starProduct}
                                            disabled
                                        >
                                            {starIndex <= Math.round(rating.calificacion) ? <AiFillStar /> : <AiOutlineStar />}
                                        </span>
                                    ))}
                                    <p>/{rating.calificacion}</p>
                                </div>
                            </div>
                            <h4>{rating.comentario}</h4>
                            <div className={styles.div}><p>{rating.username}</p> <p>{rating.fechaCalificacion}</p></div>
                        </li>
                    ))}
                </ul>

                <div className={styles.formulario}>
                    {!puntuado ?
                        <form className={styles.stars}>
                            <h3>Deja tu comentario</h3>
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
            </div>
        </div>
    );
}

export default ListaRating;

