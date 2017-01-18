import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import UpdateProductoActions from '../actions/UpdateProductoActions'
import UpdateProductoStore from '../stores/UpdateProductoStore'

import UpdateProductoIndex from '../components/update-producto'

@ReactMixin.decorate(Reflux.connect(UpdateProductoStore, 'obj'))
export default class UpdateProductoRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
    UpdateProductoActions.searchProducto(this.props.params.id);
  }
  componentWillReceiveProps(nextProps, nextState){
    UpdateProductoActions.searchProducto(nextProps.params.id);
  }
  componentDidMount(){
  	UpdateProductoActions.selectOption(document.getElementById("categoria"), this.state.obj.input.categoria,true)
    UpdateProductoActions.selectOption(document.getElementById("formato"), this.state.obj.input.formato,true)
    UpdateProductoActions.selectOption(document.getElementById("um"), this.state.obj.input.um,true)
  }
  componentDidUpdate(){
    UpdateProductoActions.selectOption(document.getElementById("categoria"), this.state.obj.input.categoria,true)
    UpdateProductoActions.selectOption(document.getElementById("formato"), this.state.obj.input.formato,true)
    UpdateProductoActions.selectOption(document.getElementById("um"), this.state.obj.input.um,true)
  }
  renderInput(event){
    UpdateProductoActions.renderInput(event.target.id,event.target.value)
  }
  updateProducto(event) {
    event.preventDefault()
    event.persist()
    UpdateProductoActions.updateProducto(event,this.props.params.bodega); 
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


