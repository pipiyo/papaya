import React from 'react'
import ReactDOM from 'react-dom' 
import Area from './User'

class User extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div className="user-item">
          <a>Perfil</a>
          <a>Salir</a>
        </div>
      )

  }

}

export default User