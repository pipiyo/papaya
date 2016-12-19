import React from 'react'

class ItemInstalacion extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div className="module-form">
          <div className="item-form title">
              <h4>Abastecimiento</h4>
          </div>
          <div className="item-form opc">
            <input type="checkbox" id="check-metales" name="check-metales" value="matales" />
            <label class="checkbox" for="check-metales"></label>
            <label class="name-check">Metales</label>
          </div>  

          <div className="item-form opc">          
            <input type="checkbox" id="check-muebles" name="check-muebles" value="muebles" />
            <label class="checkbox" for="check-muebles"></label>
            <label class="name-check">Muebles</label>
          </div>  

          <div className="item-form opc">
            <input type="checkbox" id="check-especiales"  name="check-especiales" value="especiales" />
            <label class="checkbox" for="check-especiales"></label>
            <label class="name-check">Especiales</label>
          </div>  

          <div className="item-form opc">
            <input type="checkbox" id="check-sillas" name="check-sillas" value="sillas" />
            <label class="checkbox" for="check-sillas" ></label>
            <label class="name-check">Sillas</label>
          </div> 

          <div className="item-form opc">
            <input type="checkbox" id="check-tela" name="check-tela" value="tela" />
            <label class="checkbox" for="check-tela"></label>
            <label class="name-check">Tela</label>
          </div>

          <div className="item-form opc">
            <input type="checkbox" id="check-vidrio" name="check-vidrio" value="vidrio" />
            <label class="checkbox" for="check-vidrio"></label>
            <label class="name-check">Vidrio</label>
          </div> 

          <div className="item-form opc">
            <input type="checkbox" id="check-insumo" name="check-insumo" value="insumo"/>
            <label class="checkbox" for="check-insumo"></label>
            <label class="name-check">Insumo</label>
          </div>

          <div className="item-form opc">
            <input type="checkbox" id="check-importado" name="check-importado" value="importado"/>
            <label class="checkbox" for="check-importado"></label>
            <label class="name-check">Importado</label>
          </div>     
    

        </div>
      )

  }

}

export default ItemInstalacion