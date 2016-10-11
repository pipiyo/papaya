import React from 'react'
import { Link } from 'react-router'

import Logo from './Logo'


class Header extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <header className="header" id="header">
            <Logo logo="bundle/css/images/logos/logo.png"/>

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
      )

  }

}

export default Header