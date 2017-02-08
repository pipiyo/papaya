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
                <h4>Nueva Sub Actividad</h4>
            </div>

            <div className="item-form">
                <label>Código</label>
                <input required id="codigo" type="text" />
            </div>

            <div className="item-form">
                <label>Descripción</label>
                <input required id="descripcion" type="text" />
            </div>

            <div className="item-form">
              <label>Formato</label>
              <select required id="formato">
                <option value="">Seleccioné</option>
                <option value="cu">CU</option>
                <option value="tira">Tira</option>
                <option value="placa">Placa</option>
                <option value="empaque">Empaque</option>
                <option value="un">UN</option>
                <option value="ml">ML</option>
                <option value="lamina">Lamina</option>
              </select>
            </div>

            <div className="item-form">
              <label>U/M</label>
              <select required id="um">
                <option value="">Seleccioné</option>
                <option value="un">UN</option>
                <option value="ml">ML</option>
                <option value="m2">M2</option>
                <option value="m3">M3</option>
                <option value="par">PAR</option>
                <option value="lts">LTS</option>
              </select>
            </div>

            <div className="item-form">
                <label>Categoría</label>
                <select required id="categoria">
                  <option value="">Seleccioné</option>
                  <option value="ACTIU"> ACTIU </option>
                  <option value="Articulo Electrico"> Articulo Electrico </option>
                  <option value="Baldosas Melamina"> Baldosas Melamina </option>
                  <option value="Baldosas Metalic"> Baldosas Metalica </option>
                  <option value="Baldosas Laminada"> Baldosas Laminadas </option>
                  <option value="Baldosas Tapizadas"> Baldosas Tapizadas</option>
                  <option value="Baldosas Vidrio"> Baldosas Vidrio </option>
                  <option value="Cajoneras"> Cajoneras </option>
                  <option value="Cerradura"> Cerraduras </option>
                  <option value="Correderas"> Correderas </option>
                  <option value="Cristales"> Cristales </option>
                  <option value="Cubiertas"> Cubiertas </option>
                  <option value="Embalaje"> Embalaje </option>
                  <option value="Full Space"> Full Space </option>
                  <option value="Laminados"> Laminados </option>
                  <option value="Maderas"> Maderas </option>
                  <option value="Mepal"> Mepal </option>
                  <option value="Mantencion"> Mantencion </option>
                  <option value="Maquinas y Herramientas"> Maquinas y Herramientas </option>
                  <option value="Mueble De Linea"> Mueble De Linea </option>
                  <option value="Muebles Metalico"> Muebles Metalicos </option>
                  <option value="Paneleria"> Paneleria </option>
                  <option value="Partes y Piezas"> Partes y Piezas </option>
                  <option value="Producto"> Producto</option>
                  <option value="Producto Especial"> Producto Especial</option>
                  <option value="Quincalleria"> Quincalleria </option>
                  <option value="Quimicos"> Quimicos </option> 
                  <option value="Repiceria"> Repiceria </option>
                  <option value="Servicios"> Servicios </option>
                  <option value="Seguridad"> Seguridad </option>
                  <option value="Sillas"> Sillas </option>
                  <option value="Soportes"> Soportes </option>
                  <option value="Superficies Curvas"> Superficies Curvas </option>
                  <option value="Superficies Rectas"> Superficies Rectas </option>
                  <option value="Tapacantos"> Tapacantos </option>
                  <option value="Tela"> Tela </option>
                  <option value="Tiradores"> Tiradores </option>
                  <option value="Tornillos"> Tornillos </option>
                </select>
            </div>

            <div className="item-form">
                <label>Precio compra</label>
                <input id="precio" type="text" />
            </div>

            <div className="item-form">
                <label>Stock Mínimo</label>
                <input id="stock-min" type="text"/>
            </div>

            <div className="item-form">
                <label>Stock Máximo</label>
                <input id="stock-max" type="text"/>
            </div>

          </div>

          <div className="module-form button">
            <div className="item-form button">
                <input type="submit" value="Enviar"/>
            </div>
          </div> 
        </div>  
      )

  }

}

export default Item