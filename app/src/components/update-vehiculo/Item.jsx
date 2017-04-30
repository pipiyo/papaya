import React from 'react'

class Item extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div>
          <div className="module-form">
            <div className="item-form title">
                <h4>Actualizar vehículo</h4>
            </div>

            <div className="item-form">
                <label>Patente</label>
                <input required id="patente" type="text" value={this.props.obj.input.patente} onChange={this.props.renderInput}   />
            </div>
            <div className="item-form">
                <label>KM</label>
                <input required id="km" type="text" value={this.props.obj.input.km} onChange={this.props.renderInput} />
            </div>

            <div className="item-form">
                <label>M3</label>
                <input required id="m3" type="text" value={this.props.obj.input.m3} onChange={this.props.renderInput} />
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