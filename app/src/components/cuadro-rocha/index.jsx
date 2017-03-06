import React, { Component, PropTypes } from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Filtro from './Filtro'
import Title from './Title'
import Proyecto from './Proyecto'
import Day from './Day'


const MyQuery = gql`query { hello rocha }`

@graphql(MyQuery)

class CuadroRochaIndex extends Component {

  constructor() {
    super()
  }
  render() {

    console.log( this.props.data )

      return (         
        <div>
          <Title />
          <Filtro 
                obj={this.props.obj.form}
                buscar={this.props.obj.buscar} />
           
          <div class="module-cuadro-rocha">
            <Day obj={this.props.obj.calendario} />
            <div class="item">

            <Proyecto obj={this.props.obj} /> 

            </div>

          </div>

        </div>
      )

  }

}


export default CuadroRochaIndex