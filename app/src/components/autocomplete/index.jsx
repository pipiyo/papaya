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
                return <li key={i}><a onClick={this.props.autocompleteOK} href="#">{valor.DATOS}</a></li>
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