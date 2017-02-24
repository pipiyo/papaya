import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'

class ValeItem extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div>
          <div className="module-form">
            <div className="item-form title">
                <h4>Recibir vale</h4>
            </div>

            <div className="item-form">
                <label>Numero OC</label>
                <input required readOnly id="codigo" type="text"  onChange={this.props.renderInput} value={this.props.obj.input.codigo} />
            </div>

          </div>
        </div>  
      )

  }

}

export default ValeItem