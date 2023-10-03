import { useEffect, useState } from "react";
import PanelAdministracion from "../../components/panel_administracion/PanelAdministracion";

function Administracion(){
const [data, setData] = useState([])
useEffect(() => {
    setData( JSON.parse(localStorage.getItem("userData")))
},[])
    return(
        <div style={{minHeight:'85vh'}}>
            
            
            {data?.role=="ADMIN"?
            <PanelAdministracion /> :
            <div>
            <br />
            <br />
            <h3>Acceso no Autorizado</h3>
            </div>
            }
        </div>
    )
}
export default Administracion;