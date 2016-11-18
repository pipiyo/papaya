import React from 'react'
import Reflux from 'reflux'

import InformeRochaIndex from '../components/informe-rocha'

export default class InformeRoutes extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div>
          <InformeRochaIndex />  
        </div>  
      )
  }

}
