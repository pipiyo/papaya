import React from 'react'
class AutocompleteIndex extends React.Component {
  render() {
    if(this.props.valor){
      return (         
        <div class="module-autocomplete">
          <ul onClick={this.props.valorInput}>
            {
              this.props.valor.map( (valor) => {
                return  <li key={valor.DATOS}>{`${valor.DATOS}`}</li>
              })
            }
          </ul>
        </div>
      )
    }else{
      return (
      <div></div>
      )
    }

  }

}

export default AutocompleteIndex