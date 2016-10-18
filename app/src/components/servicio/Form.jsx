import React from 'react'

import Item from './Item'

class Form extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <form>
          <fieldset> 
            <Item />
          </fieldset> 
        </form> 
      )

  }

}

export default Form