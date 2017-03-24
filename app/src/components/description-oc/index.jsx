import React from 'react'
import Title from './Title'
import Oc from './Oc'
import OcProducto from './OcProducto'

class DescriptionOcIndex extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <Title />
          <Oc obj={this.props.obj} />
          <OcProducto
            scrollWin={this.props.scrollWin}
            obj={this.props.obj} 
           />
        </div>
      )

  }

}

export default DescriptionOcIndex