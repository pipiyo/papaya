import React from 'react'

class AutocompleteIndex extends React.Component {
  constructor() {
    super()
  }
  render() {
      if(this.props.obj.valores.length > 0 && this.props.name == this.props.obj.input){
      return (        
        <div class="module-autocomplete">
          <ul>
            {
              this.props.obj.valores.map( (valor,i) => {
                return <li key={i}><a onClick={this.props.autocompleteOK} data-datos1={(valor.DATOS1 != null)?valor.DATOS1:null} data-datos2={(valor.DATOS2 != null)?valor.DATOS2:null} data-datos3={(valor.DATOS3 != null)?valor.DATOS3:null} data-datos4={(valor.DATOS4 != null)?valor.DATOS4:null} data-datos5={(valor.DATOS5 != null)?valor.DATOS5:null} data-datos6={(valor.DATOS6 != null)?valor.DATOS6:null} data-cantidad={1} href="#">{valor.DATOS}</a></li>
              })
            }
          </ul>
        </div>
      )
      }else{
        return (        
          <div class="module-autocomplete">
          </div>
        )
      }
  }

}

export default AutocompleteIndex