import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'

class Item extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div>
          <div className="module-form">
            <div className="item-form title">
                <h4>Ingreso orden de compra</h4>
            </div>

            <div className="item-form">
                <label>Numero OC</label>
                <input required id="codigo" type="text" />
            </div>

            <div className="item-form">
                <label>Proveedor</label>
                <select required id="cliente">
                  <option value="">Seleccioné</option>
                </select>
            </div>

            <div className="item-form">
                <label>Despachar a</label>
                <select required id="cliente">
                  <option value="">Seleccioné</option>
                </select>
            </div>

            <div className="item-form">
                <label>Empresa</label>
                <select required id="cliente">
                  <option value="MULTIOFICINA">MULTIOFICINA</option>
                  <option value="MUEBLES Y DISEÑO">MUEBLES Y DISEÑO</option>
                  <option value="SILLAS Y SILLAS">SILLAS Y SILLAS</option>
                  <option value="TRANSPORTE JJ">TRANSPORTE JJ</option>
                </select>
            </div>

            <div className="item-form">
                <label>Rocha</label>
                <input required id="rocha" type="text" />
            </div>

            <div className="item-form">
                <label>Reclamo</label>
                <input required id="reclamo" type="text" />
            </div>

            <div className="item-form">
                <label>Fecha Ingreso</label>
                <input required id="fechai" type="text" />
            </div>

            <div className="item-form">
                <label>Fecha Entrega</label>
                <input required id="fechae" type="text" />
            </div>
          </div>

          <div className="module-form">
            <div className="item-form title">
                <h4>sub Actividades</h4>
            </div>

            <div className="item-form">
                <label>Sub Actividad</label>
                <select required id="cliente">
                  <option value="">Seleccioné</option>
                </select>
            </div>
          </div>

          <div className="module-form button">
            <div className="item-form button">
                <input type="button" value="Ingresar nueva"/>
            </div>
          </div> 
        </div>  
      )

  }

}

export default Item