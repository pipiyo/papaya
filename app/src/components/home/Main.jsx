import React from 'react'
import Nav from './Nav'
import { Link } from 'react-router'

class Main extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div className="main" id="main">
          <Nav nombre="Jeancarlo"/>

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
      )

  }

}

export default Main