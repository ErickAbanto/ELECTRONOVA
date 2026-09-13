import { useEffect, useState } from "react";
import api from "./services/api";


function App(){

  const [mensaje, setMensaje] = useState("");


  useEffect(()=>{

    api.get("/")
      .then((respuesta)=>{

        setMensaje(respuesta.data.mensaje);

      })
      .catch((error)=>{

        console.log("Error conectando con backend:", error);

      });


  },[]);


  return (

    <>
      <h1>
        ELECTRONOVA
      </h1>

      <h2>
        {mensaje}
      </h2>

    </>

  );

}


export default App;