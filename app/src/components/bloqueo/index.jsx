import React, { Component } from 'react'

import Filtro from './Filtro'
import Title from './Title'

class BloqueoIndex extends Component {

  constructor() {
    super()
  }
  render() {

    //console.log( this.props )

      return (         
          <div class="module-bloqueo">

              <div>
                <h1>Guardar</h1>
                <button onClick={this.props.obj.guardar} >GUARDAME</button>
              </div>
            
              <div>
                <h1>Areas</h1>
                <lu>

                  {
                    this.props.obj.area.map( (a, i) => {
                      //console.log( a )
                      return( <li key={i} > <input class="checkArea" onClick={this.props.obj.checkArea} value={a._id} type="checkbox" /> {a.name} </li> )
                    })
                  }
                </lu>
              </div>


              <div class="item-filter">
                <h1>Contenidos</h1>
                <lu>

                  {
                    this.props.obj.content.map( (con, i) => {
                      //console.log( con )
                      return( <li key={i} > <input class="checkContent" value={con._id} type="checkbox"/> {con.name}  
                                <ul>
                          {
                            con.items.map( (item, ii) => {
                              //console.log( con )
                              return( ( item.type == `title` ) ? <li key={ii} > {`TITULO ${item.num} ${item.name}`}  </li> : <li key={ii} > {item.name}  </li> )

                        
                            })
                          }
                              </ul>
                             </li> )

                    })
                  }
                </lu>
              </div>
          </div>

      )

  }

}

export default BloqueoIndex