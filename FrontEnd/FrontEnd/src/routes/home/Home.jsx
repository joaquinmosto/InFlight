import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./home.module.css";
import ImgMediaCard from "../../components/cardStyled/ImgMediaCard";
import Banner from "../../components/banner/Banner";
import { useGlobalState } from "../../utils/Context";
import ImgMediaSkeleton from '../../components/cardStyled/ImgMediaSkeleton'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SearchPanel from "../../components/searchPanel/SearchPanel";

const apiUrl = "http://3.144.46.39:8080/productos";
const apiUrlCat = "http://3.144.46.39:8080/categorias";
const apiUrlPunt = "http://3.144.46.39:8080/puntuaciones/promedio";

const Home = () => {
  const { categorySelected, setCategorySelected } = useGlobalState();
  const { productState, setProductState } = useGlobalState();
  const { valueDate } = useGlobalState();
  /* const {allFavorites, setAllFavorites} = useGlobalState(); */

  /*const theme = useTheme();*/
  /* console.log(theme.palette.mode); */

  const [startIndex, setStartIndex] = useState(0);
  const [filtrado, setFiltrado] = useState([]);
  const [buscado, setBuscado] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearched, setIsSearched] = useState(false);
  const [allFavorites, setAllFavorites] = useState(null);
  const [username, setUsername] = useState("");
  const [esCategoriaReservable, setCategoriaReservable] = useState(true)
  //con este estado manejo la disponibilidad de la funcion handleFavorito
  const [procesandoFetch, setProcesandoFetch] = useState(false)

  const [idFavoritos, setIdFavoritos] = useState([])
  const [puntuaciones, setPuntuaciones] = useState([])
  const handleFavorito = (id) => {
    //chequeo que no haya un fetch en proceso
    if (procesandoFetch) return;
    
    const actualizado = idFavoritos.filter(item => item !== id)

    if (actualizado.length < idFavoritos.length) {
      const idFavorito = allFavorites.filter(item => item.producto === id)[0].id

      setProcesandoFetch(true)
      axios.delete('http://3.144.46.39:8080/favoritos/' + idFavorito)
        .then(response => {
          setProcesandoFetch(false)
          setIdFavoritos(actualizado)
          setAllFavorites(allFavorites.filter(favorito => favorito.producto !== id))
        })
        .catch(error => {
          setProcesandoFetch(false)
          console.error(error);
        });

    } else {
      const objeto = {
        usuario: username,
        producto: id
      }

      let urlFavs = 'http://3.144.46.39:8080/favoritos'
      setProcesandoFetch(true)
      const response = fetch(urlFavs, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objeto),
      }).then(response => response.json())
        .then(favorito => {
          setProcesandoFetch(false)
          setIdFavoritos([...idFavoritos, id])
          setAllFavorites([...allFavorites, favorito])
        })
        .catch(error => {
          setProcesandoFetch(false)
          console.error(error);
        });
    }

  }

  const aleatorizeProducts = (array) => {
    const aleatorizedProducts = [...array];
    for (let i = aleatorizedProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [aleatorizedProducts[i], aleatorizedProducts[j]] = [aleatorizedProducts[j], aleatorizedProducts[i]];
    }
    return aleatorizedProducts;
  };

  const limitViewProducts = (array) => {
    const arrayLimitedViewProducts = [];
    for (let i = 0; i < array.length; i += 10) {
      arrayLimitedViewProducts.push(array.slice(i, i + 10));
    }
    return arrayLimitedViewProducts;
  };

  const handleCategoryButton = (categoria) => {
    setCategoriaReservable(categoria.reservable)
    setCategorySelected(categoria.nombre);
    setIsSearched(false);
    setFiltrado(
      categoria.nombre === "TODOS"
        ? productState
        : productState.filter((item) => item.categoria === categoria.nombre)
    );
  };

  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear(); 
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  async function findCategories() {
    const response = await axios.get(apiUrlCat);
    const data = response.data;
    /* const datos = data.map((item) => item.nombre); */
    setCategories(data);
  }

  const handleSearch = () => {

    if (valueDate.length === 0) {
      //No deben ocurrir cambios en el código
    }
    else if (valueDate.length === 1) {
      setBuscado(filtrado.filter((item) => {
        return item.cursos.some((cursada) => {
          return (
            cursada.fechaInicio >= valueDate[0]
          );
        });
      }));
      setIsSearched(true)
    }
    else if(valueDate.length === 2 && valueDate[0] === "") {
      const currentDate = new Date()
      setBuscado(filtrado.filter((item) => {
        return item.cursos.some((cursada) => {
          return (
            cursada.fechaInicio >= formatDateToYYYYMMDD(currentDate) &&
            cursada.fechaFin <= valueDate[1]
          );
        });
      }));
      setIsSearched(true)
    }
    else {
      /* console.log("Esto es el filtrado del buscador: ", filtrado); */
      const filtradoYBuscado = filtrado.filter((item) => {
        return item.cursos.some((cursada) => {
          return (
            cursada.fechaInicio >= valueDate[0] &&
            cursada.fechaFin <= valueDate[1]
            //cursada.fechaFin <= valueDate[1]
          );
        });
      })
      setBuscado(filtradoYBuscado);
      setIsSearched(true)
    }
  }
  
  // eslint-disable-next-line no-inner-declarations
  async function fetchData() {
    const response = await axios.get(apiUrl);
    const data = response.data;

    const user = localStorage.getItem("userData") ?
      JSON.parse(localStorage.getItem("userData")).username :
      "";
    setUsername(user);

    if (user !== "") {
      const response2 = await axios.get('http://3.144.46.39:8080/favoritos/' + user);
      setAllFavorites(response2.data);
      setIdFavoritos(response2.data.map(item => item.producto))
    }

    setProductState(aleatorizeProducts(response.data));
    setFiltrado(aleatorizeProducts(data));
    aleatorizeProducts(data);

    setCategorySelected("TODOS")
  }

  async function fetchPuntuaciones() {
    const response = await axios.get(apiUrlPunt);
    const data = response.data;

    setPuntuaciones(data)
    
  }
  useEffect(() => {

    try {
      findCategories();
      fetchData();
      fetchPuntuaciones();
    } catch (error) {
      console.log(error);
    }
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, []);


  let limitedViewProducts = limitViewProducts(filtrado);
  if (isSearched) {
    limitedViewProducts = limitViewProducts(buscado);
  }

  const handleNextClick = () => {

    startIndex + 1 < limitedViewProducts.length &&
      setStartIndex(startIndex + 1);
    if (startIndex != limitedViewProducts.length - 1) {
      window.scrollTo(0, 0);
    }
  };

  const handlePrevClick = () => {
    startIndex - 1 >= 0 && setStartIndex(startIndex - 1);
    if (startIndex != 0) {
      window.scrollTo(0, 0);
    }

  };

  const handleStartClick = () => {
    if (startIndex != 0) {
      setStartIndex(0);
      window.scrollTo(0, 0);
    }
  };
  const handleFinishClick = () => {

    if (startIndex != limitedViewProducts.length - 1) {
      setStartIndex(limitedViewProducts.length - 1);
      window.scrollTo(0, 0);
    }
  };

  return (

    <main className={styles.main}>
      <Banner />
      <SearchPanel esCategoriaReservable={esCategoriaReservable} categories={categories} handleCategoryButton={handleCategoryButton} categorySelected={categorySelected} handleSearch={handleSearch} setStartIndex={setStartIndex} />
      <div className={styles.contenedor}>
        <p className={styles.results}>
          {categorySelected.toUpperCase()} ({isSearched ? buscado.length : filtrado.length})
        </p>
        {loading === true && (<div className={styles.SectionProductCard}>
          {limitedViewProducts[startIndex]?.map((item) => (
            <ImgMediaSkeleton key={item.id} />
          ))}
        </div>)}

        {isSearched && (buscado.length === 0 ? <div className={styles.SectionNothingFind}>
          <h2> LO SIENTO, NO HEMOS ENCONTRADO NINGÚN RESULTADO : </h2>
        </div> : <div className={styles.SectionProductCard}>
          {limitedViewProducts[startIndex]?.map((item) => (
            <ImgMediaCard puntuacion={puntuaciones.find(puntuacion => puntuacion.producto_id === item.id)} logueado={allFavorites !== null} item={item} key={item.id} favorito={idFavoritos.includes(item.id)} handleFavorito={handleFavorito} />
          ))}
        </div>)}
        {categorySelected === "TODOS" && loading === false && isSearched === false && <div className={styles.SectionProductCard}>
          {limitedViewProducts[startIndex]?.map((item) => (
            <ImgMediaCard puntuacion={puntuaciones.find(puntuacion => puntuacion.producto_id === item.id)} logueado={allFavorites !== null} item={item} key={item.id} favorito={idFavoritos.includes(item.id)} handleFavorito={handleFavorito} />
          ))}
        </div>}
        {categorySelected != "TODOS" && loading === false && isSearched === false && (
          <div className={styles.SectionProductCard}>
            {limitedViewProducts[startIndex]?.map((item) => (
              <ImgMediaCard puntuacion={puntuaciones.find(puntuacion => puntuacion.producto_id === item.id)} logueado={allFavorites !== null} item={item} key={item.id} favorito={idFavoritos.includes(item.id)} handleFavorito={handleFavorito} />
            ))}
          </div>
        )}
      </div>

      <section className={styles.NavigateButtons}>
        <button onClick={handleStartClick} className="button-primary">
          Inicio
        </button>
        <button onClick={handlePrevClick} className="button-primary">
          <FiChevronLeft />
        </button>
        <strong>{startIndex + 1}</strong>
        <button onClick={handleNextClick} className="button-primary">
          <FiChevronRight />
        </button>
        <button onClick={handleFinishClick} className="button-primary">
          Final
        </button>
      </section>
    </main>
  );
};

export default Home;



