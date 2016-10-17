import React from 'react'

import ServicioIndex from '../components/servicio'

export default class ServicioRoutes extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
            
          <div>
            <div className="title">
              <h3>Formulario ingreso servicio</h3>
              </div>                   

              <form>
                <fieldset>
                  <div className="module-form">
                                <div className="item-form title">
                                    <h4>Campos principales</h4>
                                </div>

                    <div className="item-form">
                        <label>Nombre</label>
                        <input type="text"/>
                    </div>

                    <div className="item-form">
                        <label>Color</label>
                        <input type="text"/>
                    </div>

                    <div className="item-form">
                        <label>Apellido</label>
                        <input type="text"/>
                  </div>

                  <div className="item-form">
                        <label>Nombre</label>
                        <input type="text"/>
                    </div>


                    <div className="item-form">
                        <label>Apellido</label>
                        <input type="text"/>
                  </div>

                  <div className="item-form">
                        <label>Comuna</label>
                        <select>
                          <option>Test</option>
                        </select>
                    </div>

                    <div className="item-form opc">
                                    <label className="cr-title">Opciones a escoger</label>
                      <label className="name-check">Color</label>
                      <input type="checkbox" id="check-test"/>
                        <label className="checkbox" for="check-test"></label>

                                    <label className="name-check">Sexo</label>
                                    <input type="checkbox" id="check-sexo"/>
                                    <label className="checkbox" for="check-sexo"></label>

                                    <label className="name-check">Perro</label>
                                    <input type="checkbox" id="check-perro"/>
                                    <label className="checkbox" for="check-perro"></label>
                    </div>

                                <div className="item-form button">
                                    <input type="submit" value="Enviar"/>
                                </div>
                  </div> 

                </fieldset> 
          </form>

        </div>
      )
  }

}