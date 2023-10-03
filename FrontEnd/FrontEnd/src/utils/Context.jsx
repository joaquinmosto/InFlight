import { createContext, useContext, useState } from "react";

const GlobalState = createContext();

const Context = ({ children }) => {
  const [categorySelected, setCategorySelected] = useState("TODOS");
  const [loggedState, setLoggedState] = useState(false);
  const [productState, setProductState] = useState([]);
  const [valueDate, setValueDate] = useState([]);
  const [redirectProduct, setRedirectProduct] = useState(undefined);
  const [allFavorites, setAllFavorites] = useState([]);
  const [reserva, setReserva] = useState([]);

  return (
    <GlobalState.Provider
      value={{
        categorySelected,
        setCategorySelected,
        loggedState,
        setLoggedState,
        productState,
        setProductState,
        valueDate,
        setValueDate,
        allFavorites,
        setAllFavorites,
        redirectProduct,
        setRedirectProduct,
        reserva, 
        setReserva
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalState);

export default Context;
