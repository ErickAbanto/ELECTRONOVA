import { useState } from 'react';


const GaleriaProducto = ({ producto }) => {


  const [indiceActivo, setIndiceActivo] = useState(0);




  if (!producto) return null;





  const getAbsUrl = (url) => {


    if (!url) {

      return "https://via.placeholder.com/600";

    }



    if (

      url.startsWith('http') ||

      url.startsWith('data:image')

    ) {

      return url;

    }



    return `${import.meta.env.VITE_API_URL}${url}`;


  };








  const imagenes =

    producto.imagenes && producto.imagenes.length > 0

    ?

    producto.imagenes

    :

    [

      {

        ubicacion: producto.imagenPrincipal

      }

    ];







  const indiceValido =

    indiceActivo < imagenes.length

    ?

    indiceActivo

    :

    0;








  const cambiarImagen = (index) => {


    setIndiceActivo(index);


  };








  return (

    <div className="detalle-galeria">





      <div className="imagen-principal-contenedor">



        <img


          src={

            getAbsUrl(

              imagenes[indiceValido]?.ubicacion

            )

          }



          alt={producto.nombre}



          className="imagen-principal-detalle"



          loading="lazy"



          onError={(e)=>{


            e.currentTarget.src =
            "https://via.placeholder.com/600";


          }}


        />



      </div>









      {
        imagenes.length > 1 && (



          <div className="miniaturas-contenedor">



            {

            imagenes.map((img,index)=>(



              <button


                key={index}


                type="button"



                className={

                  `miniatura-item ${

                    index === indiceValido

                    ?

                    "activa"

                    :

                    ""

                  }`

                }



                onClick={()=>

                  cambiarImagen(index)

                }



                aria-label={`Ver imagen ${index + 1}`}



              >





                <img


                  src={

                    getAbsUrl(

                      img.ubicacion

                    )

                  }



                  alt={`${producto.nombre} vista ${index + 1}`}



                  loading="lazy"



                  onError={(e)=>{


                    e.currentTarget.src =
                    "https://via.placeholder.com/100";


                  }}


                />




              </button>



            ))

            }



          </div>



        )

      }







    </div>


  );


};



export default GaleriaProducto;