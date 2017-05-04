import React from 'react'
import UpdateLineaActions from '../../actions/UpdateLineaActions'

class Item extends React.Component {
    constructor() {
        super()
    }
    componentDidMount(){
        UpdateLineaActions.selectOption(document.getElementById("activo"), this.props.obj.input.activo,false)
    }
    componentDidUpdate(nextProps,nextState){
        UpdateLineaActions.selectOption(document.getElementById("activo"), nextProps.obj.input.activo,false)
    }
    render() {
      return (
        <div>
          <div className="module-form">
            <div className="item-form title">
                <h4>Actualizar Linea</h4>
            </div>

            <div className="item-form">
                <label>Nombre</label>
                <input required id="nombre" type="text" value={this.props.obj.input.nombre} onChange={this.props.renderInput} />
            </div>

            <div className="item-form">
              <label>Activo</label>
              <select id="activo">
                <option value="">Seleccioné</option>
                <option value="0">Si</option>
                <option value="1">No</option>
              </select>
            </div>

          </div>

          <div className="module-form button">
            <div className="item-form button">
                <input type="submit" value="Enviar"/>
            </div>
          </div> 
        </div>  
      )

    }

}

export default Item