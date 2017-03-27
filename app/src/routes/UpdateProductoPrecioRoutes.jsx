import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import UpdateProductoPrecioActions from '../actions/UpdateProductoPrecioActions'
import UpdateProductoPrecioStore from '../stores/UpdateProductoPrecioStore'

import UpdateProductoIndex from '../components/update-producto-precio'

@ReactMixin.decorate(Reflux.connect(UpdateProductoPrecioStore, 'obj'))
export default class UpdateProductoPrecioRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
    UpdateProductoPrecioActions.searchProducto(this.props.params.id);
  }
  renderInput(event){
    UpdateProductoPrecioActions.renderInput(event.target.id,event.target.value)
  }
  updateProducto(event) {
    event.preventDefault()
    event.persist()
    UpdateProductoPrecioActions.updateProducto(event,this.props.params.bodega); 
  }
  render() {
  	if(this.state.obj) {
      return (
        <UpdateProductoIndex
        obj={this.state.obj}
        renderInput={this.renderInput.bind(this)}
        updateProducto={this.updateProducto.bind(this)}  
        />       
      )
  	}else{
  		return (
          <div><h1>Cargando</h1></div>     
        )
  	}
  }

}


