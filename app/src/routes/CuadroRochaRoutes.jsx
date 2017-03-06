import React, { Component, PropTypes } from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

// Create the client as outlined above
const client = new ApolloClient()



import CuadroRochaIndex from '../components/cuadro-rocha'

import CuadroRochaStore from '../stores/CuadroRochaStore'

import CuadroRochaActions from '../actions/CuadroRochaActions'

@ReactMixin.decorate(Reflux.connect(CuadroRochaStore, 'obj'))


/*
const hello = gql`
  query hello {
    hello
  }
`
const cuadroHello = graphql(hello,{
  hello: 'hello',
  cliente: 'holi',
  store: 'chau'
})(CuadroRocha)
*/


class CuadroRochaRoutes extends Component {

  constructor() {
    super()
  }


  render() {
      return (
        <ApolloProvider client={client}>
          <CuadroRochaIndex obj={this.state.obj} />       
        </ApolloProvider>
      )
  }

}

export default CuadroRochaRoutes

