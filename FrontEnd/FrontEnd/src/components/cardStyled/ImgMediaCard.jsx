import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function ImgMediaCard({ item, favorito, handleFavorito, logueado, puntuacion }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        maxWidth: 450,
        backgroundColor: "#1E1E1E",
        color: "white",
        borderRadius: "20px",
        transition: "transform 0.3s ease",
        overflow: "hidden",
        "&:hover": {
          transform: "scale(1.1)",
          WebkitTransform: "scale(1.1)",
        },
        position: "relative",
      }}

    >
      {logueado &&
        <IconButton aria-label="add to favorites" sx={{ position: 'absolute', top: '1%', right: '0' }} onClick={() => handleFavorito(item.id)} >
          <FavoriteIcon sx={{ fontSize: '1.9rem' }} color={favorito ? "error" : 'default'} />
        </IconButton>
      }

      <CardMedia sx={{ height: 250 }} image={item.imagen + "_tn.jpg"} title={item.nombre} />
      <CardContent sx={{ height: '40%' }}>
        <Typography variant="h5" component="div">
          {item.nombre.toUpperCase()}
        </Typography>
        <Typography>{item.descripcion}</Typography>
        {puntuacion &&
          <div>
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <span
                key={starIndex}
                disabled
              >
                {starIndex <= Math.round(puntuacion?.promedio) ? <AiFillStar /> : <AiOutlineStar />}
              </span>
            ))}
            <span>/{puntuacion?.promedio.toFixed(1)}</span>
          </div>
        }
      </CardContent>
      <CardActions sx={{ margin: "5px", display: 'flex', justifyContent: 'center' }}>

        <Link className="button-primary" to={"/productos/" + item.id}>
          Ver detalles
        </Link>
      </CardActions>
    </Card>
  );
}
