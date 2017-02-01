import React from 'react'

class Rocha extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div class="module-informe">
          <div class="item">
            <div class="title-informe">
              <h3>{this.props.obj.renderRocha[0].CODIGO_PROYECTO} - {this.props.obj.renderRocha[0].NOMBRE_CLIENTE}</h3>
            </div>
            <div class="content-informe">
              <div class="opc"><h5>Obra</h5><p>{this.props.obj.renderRocha[0].OBRA}</p></div>
              <div class="opc"><h5>Dirección Obra</h5><p>{this.props.obj.renderRocha[0].DIRECCION_DESPACHO}</p></div>
              <div class="opc"><h5>Línea</h5><p>{this.props.obj.renderRocha[0].DEPARTAMENTO_CREDITO}</p></div>
              <div class="opc"><h5>Departamento</h5><p>{this.props.obj.renderRocha[0].DEPARTAMENTO}</p></div>
              <div class="opc"><h5>Puestos</h5><p>{this.props.obj.renderRocha[0].PUESTOS}</p></div>  
            </div>
          </div>
          <div class="item">
            <div class="title-informe">
              <h3>Fechas</h3>
            </div>
            <div class="content-informe">
              <div class="opc"><h5>Fecha Ingreso</h5><p>{this.props.obj.renderRocha[0].FECHA_ACTA.substring(0,10)}</p></div>
              <div class="opc"><h5>Fecha de Entrega Solicitada</h5><p>{this.props.obj.renderRocha[0].FECHA_ENTREGA.substring(0,10)}</p></div>
              <div class="opc"><h5>Fecha de Entrega Real</h5><p>{this.props.obj.renderRocha[0].FECHA_CONFIRMACION.substring(0,10)}</p></div>
              <div class="opc"><h5>Fecha Acta</h5><p>{this.props.obj.renderRocha[0].FECHA_ACTA.substring(0,10)}</p></div>  
            </div>
          </div> 
          <div class="item">
            <div class="title-informe">
              <h3>Contacto</h3>
            </div>
            <div class="content-informe">
              <div class="opc"><h5>Contacto</h5><p>{this.props.obj.renderRocha[0].CONTACTO}</p></div>
              <div class="opc"><h5>Teléfono</h5><p>{this.props.obj.renderRocha[0].TELEFONO}</p></div>
              <div class="opc"><h5>Email</h5><p>{this.props.obj.renderRocha[0].MAIL}</p></div>
            </div>
          </div>
          <div class="item">
            <div class="title-informe">
              <h3>Encargado</h3>
            </div>
            <div class="content-informe">
              <div class="opc"><h5>Ejecutivo</h5><p>{this.props.obj.renderRocha[0].EJECUTIVO}</p></div>
              <div class="opc"><h5>Diseñador</h5><p>{this.props.obj.renderRocha[0].DISEÑADOR}</p></div>
              <div class="opc"><h5>Encargado</h5><p>{this.props.obj.renderRocha[0].ENCARGADO}</p></div>
            </div>
          </div>

          <div class="item ext">
            <div class="title-informe">
              <h3>Total</h3>
            </div>
            <div class="content-informe ext">
              <div class="opc ext"><h5>Sub total</h5><p>{this.props.obj.renderRocha[0].SUB_TOTAL}</p></div>
              <div class="opc ext"><h5>Descuento</h5><p>{this.props.obj.renderRocha[0].DESCUENTO}</p></div>
              <div class="opc ext"><h5>Neto</h5><p>{this.props.obj.renderRocha[0].MONTO}</p></div>
              <div class="opc ext"><h5>Descuento 2</h5><p>{this.props.obj.renderRocha[0].DESCUENTO2}</p></div>
              <div class="opc ext"><h5>Neto 2</h5><p>{this.props.obj.renderRocha[0].MONTO2}</p></div>
              <div class="opc ext"><h5>iva</h5><p>{this.props.obj.renderRocha[0].IVA}</p></div>
              <div class="opc ext"><h5>Total</h5><p>{this.props.obj.renderRocha[0].TOTAL}</p></div>
            </div>
          </div>   
        </div>
      )

  }

}

export default Rocha