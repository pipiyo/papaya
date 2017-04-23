import React, { Component } from 'react'
import AutoComplet  from '../../routes/AutoComRoutes'
import AutocompleteActions from '../../actions/AutocompleteActions'

class Filtro extends Component {
  constructor() {
    super()
  }
  autocomplete(ev){
    ev.persist()
    AutocompleteActions.autocomplete(ev)
  }
  autocompleteOff(ev,input){
    ev.persist()
    AutocompleteActions.autocompleteOff(ev)
  }
  render() {
      //console.log( this.props.obj.colores )
      return (
      <form name="filtroBodegaSilla" onSubmit={ this.props.buscar } >
        <div class="module-filter">





        
            <div class="item-filter">
                <label>Código</label>
                <input autoComplete="off" id="codigo" type="text" data-complete="t2producto" onBlur={this.autocompleteOff.bind(this)}  onChange={this.autocomplete.bind(this)} />
                <AutoComplet name={`codigo`} />
            </div>
            <div class="item-filter">
                <label>Descripción</label>
                <input autoComplete="off" id="descripcion" type="text" data-complete="t2producto1" onBlur={this.autocompleteOff.bind(this)}  onChange={this.autocomplete.bind(this)} />
                <AutoComplet name={`descripcion`} />
            </div>
            <div class="item-filter">
                <label>Categoria</label>
                <select id="categoria" >
                    <option value="">Seleccione</option>
                    <option value="20">Silla</option>
                    <option value="21">Insumo Silla</option>
                    <option value="22">Servicio Silla</option>
                </select>
            </div>
            <div class="item-filter">
                <label>Producto</label>
                <select id="producto" >
                    <option value="">Seleccione</option>
                    <option value="AC">Accesorio</option>
                    <option value="BA">Base</option>
                    <option value="BR">Brazo</option>
                    <option value="BU">Butaca</option>
                    <option value="CA">Cabecero</option>
                    <option value="ME">Mesa</option>
                    <option value="PA">Paleta</option>
                    <option value="PE">Perchero</option>
                    <option value="PI">Piso Taburete</option>
                    <option value="PO">Pouf</option>
                    <option value="RE">Rejilla</option>
                    <option value="RU">Rueda</option>
                    <option value="SA">Silla Academica</option>
                    <option value="SC">Silla Cajero</option>
                    <option value="SE">Silla Ejecutiva</option>
                    <option value="SF">Sofa</option>
                    <option value="SG">Silla Gerencial</option>
                    <option value="SI">Silla Infantil</option>
                    <option value="SM">Silla Multiproposito</option>
                    <option value="SO">Silla Operativa</option>
                    <option value="ST">Silla Taburete</option>
                    <option value="SV">Silla Visita</option>
                    <option value="SR">Servicio</option>
                </select>
            </div>
            <div class="item-filter">
                <label>Pais</label>
                <select id="pais" >
                    <option value="">Seleccione</option>
                    <option value="1">Nacional</option>
                    <option value="2">Importado</option>
                </select>
            </div>
            <div class="item-filter">
                <label>Proveedor</label>
                <select id="proveedor" >
                    <option value="">Seleccione</option>
                    <option value="BO">Bosen</option>
                    <option value="CR">Cerantola</option>
                    <option value="CT">Contatto</option>
                    <option value="DA">Dauphin</option>
                    <option value="IN">Indumac</option>
                    <option value="KE">Kebel</option>
                    <option value="LI">Liberona</option>
                    <option value="MM">Mmobili</option>
                    <option value="MU">MUMA</option>
                    <option value="NS">Nowy Styl</option>
                    <option value="OM">OMP</option>
                    <option value="SI">Situp</option>
                    <option value="ST">Starway</option>
                    <option value="VC">VC Industrial</option>
                </select>
            </div>
            <div class="item-filter">
                <label>Mecanismo</label>
                <select id="mecanismo" >
                    <option value="">Seleccione</option>
                    <option value="1">1 cuerpo</option>
                    <option value="2">2 cuerpo</option>
                    <option value="3">3 cuerpo</option>
                    <option value="4">4 cuerpo</option>
                    <option value="5">5 cuerpo</option>
                    <option value="6">6 cuerpo</option>
                    <option value="7">Trineo</option>
                    <option value="8">fijo</option>
                    <option value="9">4 patas</option>
                    <option value="10">pedestal</option>
                    <option value="11">Pivotal</option>
                    <option value="12">plato</option>
                    <option value="13">plegable</option>
                    <option value="14">Reclinable</option>
                    <option value="15">Regulable</option>
                    <option value="16">Syncro</option>
                    <option value="17">Abatible</option>
                    <option value="18">Giratori</option>
                </select>
            </div>
            <div class="item-filter">
                <label>Respaldo</label>
                <select id="respaldo" >
                    <option value="">Seleccione</option>
                    <option value="A">Alto</option>
                    <option value="M">Medio</option>
                    <option value="B">Bajo</option>
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

export default Filtro