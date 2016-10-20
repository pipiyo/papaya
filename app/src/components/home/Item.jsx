import React from 'react'
import { Link } from 'react-router'
import Area from './Area'

class Item extends React.Component {

  constructor() {
    super()
  }

  render() {
      let rows = [];
      let sub = [];
      let e = 0;
      let valor, data, i;

      this.props.menu.forEach((menu) => {
        valor = menu.item
        sub = []
        for(i=0;i<valor.length;i++){
          sub.push(<li key={valor[i]['id']}><Link to={valor[i]['ruta']}>{valor[i]['nombre']}</Link></li>)
        }
        rows.push(<Area click={this.props.click} img={menu.img} icon={menu.icon} name={menu.name} key={menu.id} sub={sub} num={e} />)
        e++
      })

      return (
        <nav className="nav">
          <ul>
            { rows }
          </ul>
        </nav> 
      )

  }

}

export default Item