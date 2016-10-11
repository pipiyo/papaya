import React from 'react'

import Header from './Header'
import Main from './Main'


class Home extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
              <div className="frame">
                      <Header/>
                      <Main content={this.props.content}/>
              </div>
      )

  }

}

export default Home