import { Splide, SplideSlide } from "@splidejs/react-splide";
//import "@splidejs/react-splide/css";
import '@splidejs/splide/css/skyblue';
import styles from './Galeria.module.css'

export default function Galeria(props) {
    const images = props.images
    
  return (
    <>
      <Splide aria-label="Galeria">
        {images.map((im) =>
        <SplideSlide key={im.id} className={styles.cont}>
          <img className={styles.imgGaleria}
            src={im.ruta}
            alt={"Imagen "+im.id}
          />
        </SplideSlide>
        )}
        <div className="splide__progress">
          <div className="splide__progress__bar" />
        </div>
        <button className="splide__toggle" type="button">
          <span className="splide__toggle__play">Play</span>
          <span className="splide__toggle__pause">Pause</span>
        </button>
      </Splide>
    </>
  );
}

