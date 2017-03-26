import React from 'react'

class subActividad extends React.Component {
	constructor(){
		super()
	}
	render(){
		return(
			<div className="item-form">
                <label>Sub Actividad</label>
                <select data-countsubavtividad="ok" id={`subactividad-${this.props.num}`}>
                  <option value="">Seleccioné</option>
                   	{
	                  this.props.sub.map( (sub) => {
	                    return <option value={sub.CODIGO_SUBSERVICIO} key={sub.CODIGO_SUBSERVICIO}>{sub.CODIGO_PROYECTO} - {sub.SUB_DESCRIPCION}</option>
	                  })
                 	} 
                </select>
            </div>
		)
	}
}

export default subActividad