import { Link } from 'react-router-dom'
import styles from './product_Card.module.css'

const Product_Card = ({item}) => {
  return (
    <article className={styles.ProductCard}>
        <Link to={"/productos/" + item.id}>
        <img className={styles.ProductCardImg} src={item.imagen} alt={`product N ${item.id}`} style={{ width: '150px' }} />
        <h1 className={styles.ProductCardTitle}>{item.nombre}</h1>
        {/* <h2 className="Product-Card-Subtitle">{item.id}</h2> */}
        <h3 className={styles.ProductCardDescription}>{item.descripcion}</h3>
      </Link>
      <button >
       Ver detalles
        </button>
    </article>
  )
}

export default Product_Card