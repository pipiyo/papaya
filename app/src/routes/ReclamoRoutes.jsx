import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import ReclamoActions from '../actions/ReclamoActions'
import ReclamoStore from '../stores/ReclamoStore'

import ReclamoIndex from '../components/reclamo/form-reclamo'

@ReactMixin.decorate(Reflux.connect(ReclamoStore, 'data'))
export default class ReclamoRoutes extends React.Component {

	constructor() {
	super()
	}

	addReclamo(ev) {
		ev.preventDefault()
		let servicio = {
		  "reclamo": ev.target.elements['reclamo'].value,
		  "area": ev.target.elements['area'].value,
		  "area1": ev.target.elements['area1'].value,
		  "rocha": ev.target.elements['rocha'].value,
		  "razon": ev.target.elements['razon'].value,
		  "fechaInicio": ev.target.elements['fechaInicio'].value,
		  "fechaEntrega": ev.target.elements['fechaEntrega'].value,
		  "dias": ev.target.elements['dias'].value,
		  "descripcion": ev.target.elements['descripcion'].value,              
		}
		ReclamoActions.addReclamo(servicio);

		if(ev.target.elements['area']){ev.target.elements['area'].options[0].selected = "selected"}
		if(ev.target.elements['area1']){ev.target.elements['area1'].options[0].selected = "selected"}
	    if(ev.target.elements['razon']){ev.target.elements['razon'].options[0].selected = "selected"}
	    if(ev.target.elements['fechaInicio']){ev.target.elements['fechaInicio'].value = ""}
	    if(ev.target.elements['fechaEntrega']){ev.target.elements['fechaEntrega'].value = ""}
	    if(ev.target.elements['descripcion']){ev.target.elements['descripcion'].value = ""}
	    if(ev.target.elements['rocha']){ev.target.elements['rocha'].value = ""}
	    if(ev.target.elements['dias']){ev.target.elements['dias'].value = ""}
	    if(ev.target.elements['reclamo']){ev.target.elements['reclamo'].value = ""}
	}

	render() {
	  return (
	    <ReclamoIndex mensaje={this.state.data} addReclamo={this.addReclamo.bind(this)} />       
	  )
	}

}
