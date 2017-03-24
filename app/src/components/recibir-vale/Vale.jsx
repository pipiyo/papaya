import React from 'react'
import ValeItem from './ValeItem'
import ValeProducto from './ValeProducto'

class Vale extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <form autoComplete="off" onSubmit={this.props.updateVale}>
          <fieldset> 
            <ValeItem 
            renderInput={this.props.renderInput} 
            obj={this.props.obj} 
            />
          </fieldset> 

          <ValeProducto 
            scrollWin={this.props.scrollWin}
            obj={this.props.obj}
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

export default Vale