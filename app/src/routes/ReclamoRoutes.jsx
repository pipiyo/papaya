import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import ReclamoActions from '../actions/ReclamoActions'
import ReclamoStore from '../stores/ReclamoStore'

import ReclamoIndex from '../components/reclamo/form-reclamo'

@ReactMixin.decorate(Reflux.connect(ReclamoStore, 'obj'))
export default class ReclamoRoutes extends React.Component {

	constructor() {
	super()
	}

	addReclamo(event) {
		event.preventDefault()
    	event.persist()
		ReclamoActions.addReclamo(event);
	}

	render() {
	  return (
	    <ReclamoIndex 
	    addReclamo={this.addReclamo.bind(this)} 
	    fecha={this.state.obj.item.fecha}
	    />       
	  )
	}

}
