import React from 'react'
import OcItem from './OcItem'
import OcProducto from './OcProducto'
import TitleRecibo from './TitleRecibo'
import TitleDevolucion from './TitleDevolucion'
import OcRecibo from './OcRecibo'
import OcDevolucion from './OcDevolucion'
class Oc extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <form autoComplete="off" onSubmit={this.props.updateOc}>
          <fieldset> 
            <OcItem 
            renderInput={this.props.renderInput} 
            obj={this.props.obj} 
            addOc={this.props.addOc}
            />
          </fieldset> 

          <OcProducto
            scrollWin={this.props.scrollWin} 
            obj={this.props.obj}
            renderInputOc={this.props.renderInputOc}
            renderInputOcTotal={this.props.renderInputOcTotal}   
          />
          <div className="module-form button top">
            <div className="item-form button">
                <input type="submit" value="Enviar"/>
            </div>
          </div> 
          <TitleRecibo />
          <OcRecibo
            scrollWin={this.props.scrollWin} 
            obj={this.props.obj}
            renderInputOc={this.props.renderInputOc}
            renderInputOcTotal={this.props.renderInputOcTotal}   
          />
          <TitleDevolucion />
          <OcDevolucion
            scrollWin={this.props.scrollWin} 
            obj={this.props.obj}
            renderInputOc={this.props.renderInputOc}
            renderInputOcTotal={this.props.renderInputOcTotal}   
          />
        </form> 
      )

  }

}

export default Oc