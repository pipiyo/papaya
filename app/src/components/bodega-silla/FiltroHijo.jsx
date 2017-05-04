import React, { Component } from 'react'

import _ from 'lodash'

class FiltroHijo extends Component {
  constructor() {
    super()
  }
  render() {

/*
            <div class="item-filter">
                <label>Código</label>
                <input autoComplete="off" id="codigo" type="text" />
            </div>
            
            <div class="item-filter">
                <label>Descripción</label>
                <input autoComplete="off" id="descripcion" type="text" />
            </div>
*/

      return (
      <form onSubmit={ this.props.buscar } >

        <div class="module-filter">
            


            <div class="item-filter">
                <label>asiento</label>
                <select id="asiento" >
                  <option value="x">seleccione</option>
                {
                 
                    _.map( this.props.asiento, (v, i) => {
                      return( <option key={i+1} value={i+1}>{v}</option> )
                    })
                  
                }
                </select>
            </div>

            <div class="item-filter">
                <label>respaldo</label>
                <select id="respaldo" >
                  <option value="x">seleccione</option>
                {
                  
                    _.map(this.props.respaldo, (v, i) => {
                      return( <option key={i+1} value={i+1}>{v}</option> )
                    })
                  
                }
                </select>
            </div>

            <div class="item-filter">
                <label>estructura</label>
                <select id="estructura" >
                  <option value="x">seleccione</option>
                {
                  
                    _.map(this.props.estructura, (v, i) => {
                      return( <option key={i+1} value={i+1}>{v}</option> )
                    })
                  
                }
                </select>
            </div>

            <div className="item-filter ">
              <input id="btn-buscar" value="Buscar"  type="submit" />
            </div>

        </div>
      </form>
      )

  }

}

export default FiltroHijo