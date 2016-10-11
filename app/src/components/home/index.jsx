import React from 'react'
import { Link } from 'react-router'


class Home extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
      		  <div>
              	<h1>HOME</h1>
              	<Link to="/servicio">Servicio</Link>

	              {/* add this */}
	        	  {this.props.children}

      		  </div>
      )

  }

}

export default Home