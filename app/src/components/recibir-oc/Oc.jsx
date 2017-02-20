import React from 'react'
import OcItem from './OcItem'
import OcProducto from './OcProducto'

class Form extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <form autoComplete="off" onSubmit="">
          <fieldset> 
            <OcItem 
            renderInput={this.props.renderInput} 
            obj={this.props.obj} 
            />
          </fieldset> 

          <OcProducto 
            obj={this.props.obj}
            renderInputOc={this.props.renderInputOc}
            renderInputOcTotal={this.props.renderInputOcTotal}   
          />
          <div className="module-form button top">
            <div className="item-form button">
                <input type="submit" value="Enviar"/>
            </div>
          </div> 
        </form> 
      )

  }

}

export default Form