import { useState } from 'react';
import { 
  User, 
  Menu, 
  X,
  Home,
  Package,
  Building2,
  Mail
} from 'lucide-react';

import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Encabezado.css';


const Encabezado = () => {


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isAuthenticated } = useAuth();



  const toggleMenu = () => {

    setIsMenuOpen(!isMenuOpen);

  };



  const closeMenu = () => {

    setIsMenuOpen(false);

  };




  return (

    <header className="encabezado">


      <div className="encabezado-contenedor">





        <Link 
          to="/" 
          className="encabezado-logo"
          onClick={closeMenu}
        >


          <div className="logo-icono">

            <img 
              src="/src/assets/logo.png" 
              alt="Electronova"
            />

          </div>



          <div className="logo-texto">

            <span className="logo-electronova">

              ELECTRONOVA

            </span>

          </div>


        </Link>







        <div className="encabezado-acciones">







          <nav 
            className={`navegacion-principal ${
              isMenuOpen ? 'abierto' : ''
            }`}
          >




            <div className="menu-header-mobile">


              <div className="menu-logo">


                <img 
                  src="/src/assets/logo.png"
                  alt="Electronova"
                />


                <span>
                  ELECTRONOVA
                </span>


              </div>




              <button 
                className="menu-close"
                onClick={closeMenu}
              >

                <X size={26}/>


              </button>



            </div>








            <NavLink 
              to="/"
              end
              onClick={closeMenu}
            >

              <Home size={20}/>

              <span>
                Inicio
              </span>


            </NavLink>







            <NavLink 
              to="/productos"
              onClick={closeMenu}
            >


              <Package size={20}/>


              <span>
                Productos
              </span>


            </NavLink>








            <NavLink 
              to="/nosotros"
              onClick={closeMenu}
            >


              <Building2 size={20}/>


              <span>
                Empresa
              </span>


            </NavLink>








            <NavLink 
              to="/contacto"
              onClick={closeMenu}
            >


              <Mail size={20}/>


              <span>
                Contacto
              </span>


            </NavLink>







            <div className="menu-admin-mobile">


              {
                isAuthenticated ? (


                  <Link
                    to="/admin/dashboard"
                    className="btn-login-header"
                    onClick={closeMenu}
                  >

                    <User size={22}/>

                    Panel Admin


                  </Link>



                ) : (



                  <Link
                    to="/login"
                    className="btn-login-header"
                    onClick={closeMenu}
                  >


                    <User size={22}/>

                    Acceso Admin


                  </Link>


                )

              }



            </div>





          </nav>









          {
            isMenuOpen && (

              <div 
                className="menu-overlay"
                onClick={closeMenu}
              >

              </div>

            )

          }









          <div className="acciones-iconos">







            <div className="admin-desktop">



              {

                isAuthenticated ? (



                  <Link
                    to="/admin/dashboard"
                    className="btn-login-header"
                  >

                    <User size={22}/>


                    <span className="mostrar-desktop">

                      Panel Admin

                    </span>



                  </Link>




                ) : (




                  <Link
                    to="/login"
                    className="btn-login-header"
                  >


                    <User size={22}/>



                    <span className="mostrar-desktop">

                      Acceso Admin

                    </span>


                  </Link>



                )


              }



            </div>









            <button

              className="btn-icono mostrar-mobile"

              onClick={toggleMenu}

            >



              {

                isMenuOpen

                ? <X size={26}/>

                : <Menu size={26}/>


              }



            </button>





          </div>







        </div>






      </div>





    </header>

  );


};



export default Encabezado;