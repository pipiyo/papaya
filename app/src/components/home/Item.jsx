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
      let f = 0;
      let valor, data, i;

      this.props.menu.forEach((menu) => {
        valor = menu.item
        sub = []
        for(i=0;i<valor.length;i++){
          sub.push(<li data-subclick="ok" id={`subMenu${f}`} onClick={this.props.activeMenu} key={valor[i]['id']}><Link to={valor[i]['ruta']}>{valor[i]['nombre']}</Link></li>)
          f++
        }
        rows.push(<Area submenu={this.props.submenu} img={menu.img} icon={menu.icon} name={menu.name} key={menu.id} sub={sub} num={e} />)    
        e++
      })

      return (
        <nav className="nav">
          <a onClick={this.props.navmovil} class="btn-burger" href=""> <i class="fa fa-bars" aria-hidden="true"></i> </a>
          <ul class="nav-item">
            { rows }
          </ul>
        </nav> 
      )

  }

}

export default Item