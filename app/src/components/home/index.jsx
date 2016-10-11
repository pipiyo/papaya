import React from 'react'
import { Link } from 'react-router'


class Home extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
<div className="frame">
        <header className="header" id="header">
            <div className="logo">
              <h1>
                <img src="css/images/logos/logo.png" alt="logo-empresa"/>
                Wolf
              </h1>
            </div>

            <nav className="nav">
              <ul>
                <li>
                  <div className="icon rocha">
                    <i className="fa fa-rocket" aria-hidden="true"></i>
                  </div>
                  <a href="#">Rochas</a>
                  <ul>
                    <li><a href="#">Nuevo Rocha</a></li>
                    <li><a href="#">Ver Rochas</a></li>
                  </ul>
                </li>
                <li>
                  <div className="icon actividad">
                    <i className="fa fa-coffee" aria-hidden="true"></i>
                  </div>
                  <a href="#">Actividades</a>
                  <ul>
                    <li><a href="#">Nueva Actividad</a></li>
                    <li><a href="#">Informe Abastecimiento</a></li>
                    <li><a href="#">Informe Producción</a></li>
                  </ul>
                </li>
                <li>
                  <div className="icon abastecimiento">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  </div>
                  <a href="#">Abastecimiento</a>
                </li>
                <li>
                  <div className="icon comercial">
                    <i className="fa fa-suitcase" aria-hidden="true"></i>
                  </div>
                  <a href="#">Comercial</a>
                </li>
                <li>
                  <div className="icon dam">
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </div>
                  <a href="#">Dam</a>
                </li>
                <li>
                  <div className="icon desarrollo">
                    <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
                  </div>
                  <a href="#">Desarrollo</a>
                </li>
                <li>
                  <div className="icon despacho">
                    <i className="fa fa-truck" aria-hidden="true"></i>
                  </div>
                  <a href="#">Despacho</a>
                </li>
                <li>
                  <div className="icon gerencia">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </div>
                  <a href="#">Gerencia</a>
                </li>
                <li>
                  <div className="icon instalaciones">
                    <i className="fa fa-wrench" aria-hidden="true"></i>
                  </div>
                  <a href="#">Instalaciones</a>
                </li>
                <li>
                  <div className="icon prevencion">
                    <i className="fa fa-fire-extinguisher" aria-hidden="true"></i>
                  </div>
                  <a href="#">Prevención</a>
                </li>
                <li>
                  <div className="icon produccion">
                    <i className="fa fa-gavel" aria-hidden="true"></i>
                  </div>
                  <a href="#">Producción</a>
                </li>
                <li>
                  <div className="icon reclamo">
                    <i className="fa fa-book" aria-hidden="true"></i>
                  </div>
                  <a href="#">Reclamos</a>
                </li>
                <li>
                  <div className="icon sillas">
                    <i className="fa fa-cog" aria-hidden="true"></i>
                  </div>
                  <a href="#">Sillas</a>
                </li>
                <li>
                  <div className="icon sistema">
                    <i className="fa fa-bolt" aria-hidden="true"></i>
                  </div>
                  <a href="#">Sistema</a>
                </li>
              </ul>
            </nav>
        </header>

        <div className="main" id="main">
          <nav className="nav-config">
            <div className="name-user">
              <h2>Cristóbal Maturana</h2>
            </div>
            <div className="img-user">
              <img src="css/images/fondos/cristobal.jpg" alt="usuario"/>
            </div>
          </nav>

          <div className="content">
            <div className="breadcrumb">
              <ul>
                <li><a href="#">Pagina 1</a></li>
                <li><a href="#">Pagina 2</a></li>
                <li><a href="#">Pagina 3</a></li>
              </ul>
            </div>
          </div>
        </div>
</div>

      )

  }

}

export default Home