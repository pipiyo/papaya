import React from 'react'
import { Link } from 'react-router'

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
                      <Main/>
              </div>
      )

  }

}

export default Home