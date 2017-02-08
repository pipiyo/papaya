import React from 'react'
import Title from './Title'
import TitleServicio from './TitleServicio'
import TitleOC from './TitleOC'
import TitleVale from './TitleVale'
import Rocha from './Rocha'
import FilterServicio from './FilterServicio'
import Servicio from './Servicio'
import FilterOC from './FilterOC'
import FilterVale from './FilterVale'
import OC from './OC'
import Vale from './Vale'
class DescriptionRochaIndex extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <Title />
          <Rocha obj={this.props.obj} />
          <TitleServicio />
          <FilterServicio renderFilter={this.props.renderFilter} />
          <Servicio obj={this.props.obj} />
          <TitleOC />
          <FilterOC renderFilter={this.props.renderFilter} />
          <OC obj={this.props.obj} />
          <TitleVale />
          <FilterVale renderFilter={this.props.renderFilter} />
          <Vale obj={this.props.obj} />
        </div>
      )

  }

}

export default DescriptionRochaIndex