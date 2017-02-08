import React from 'react'

class Login extends React.Component {

  constructor() {
    super()

  }


  render() {
      return (
          <form onSubmit={ this.props.onSubmit }>
            <input type="text" placeholder="userName"/>
            <input type="text" placeholder="pass"/>
            <button type="submit">Go</button>
          </form>
      )

  }

}

export default Login