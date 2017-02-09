import React from 'react'

class Oc extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div class="module-informe">
          <div class="item">
            <div class="title-informe oc">
              <h3>Rocha S.A. - Información</h3>
            </div>
            <div class="content-informe oc">
              <div class="opc"><h5>Rut</h5><p>{this.props.obj.renderOc[0].DESPACHAR_RUT}</p></div>
              <div class="opc"><h5>Dirección Obra</h5><p>{this.props.obj.renderOc[0].DESPACHAR_DIRECCION}</p></div>
              <div class="opc"><h5>Teléfono</h5><p>{this.props.obj.renderOc[0].DESPACHAR_TELEFONO}</p></div>
              <div class="opc"><h5>Nombre</h5><p>{this.props.obj.renderOc[0].EMPRESA}</p></div>
              <div class="opc"><h5>Numero</h5><p>{this.props.obj.renderOc[0].CODIGO_OC}</p></div>  
              <div class="opc"><h5>Despacho</h5><p>{this.props.obj.renderOc[0].DESPACHAR_COMUNA}</p></div>
              <div class="opc"><h5>Nombre proveedor</h5><p>{this.props.obj.renderOc[0].NOMBRE_PROVEEDOR}</p></div> 
            </div>
          </div>

          <div class="item">
            <div class="title-informe oc">
              <h3>Información</h3>
            </div>
            <div class="content-informe oc">
              <div class="opc"><h5>Fecha Emisión</h5><p>{(this.props.obj.renderOc[0].FECHA_REALIZACION)?this.props.obj.renderOc[0].FECHA_REALIZACION.substring(0,10):this.props.obj.renderOc[0].FECHA_REALIZACION}</p></div>
              <div class="opc"><h5>Fecha Entrega</h5><p>{(this.props.obj.renderOc[0].FECHA_ENTREGA)?this.props.obj.renderOc[0].FECHA_ENTREGA.substring(0,10):this.props.obj.renderOc[0].FECHA_ENTREGA}</p></div>
              <div class="opc"><h5>Fecha Confirmación</h5><p>{(this.props.obj.renderOc[0].FECHA_CONFIRMACION)?this.props.obj.renderOc[0].FECHA_CONFIRMACION.substring(0,10):this.props.obj.renderOc[0].FECHA_CONFIRMACION}</p></div>
              <div class="opc"><h5>Estado</h5><p>{(this.props.obj.renderOc[0].ESTADO)?this.props.obj.renderOc[0].ESTADO.substring(0,10):this.props.obj.renderOc[0].ESTADO}</p></div>
              <div class="opc"><h5>Enviado</h5><p>{(this.props.obj.renderOc[0].ENVIADO)?`SI`:`NO`}</p></div> 
              <div class="opc"><h5>Reclamo</h5><p>{this.props.obj.renderOc[0].RECLAMO}</p></div>
              <div class="opc"><h5>Versión</h5><p>{this.props.obj.renderOc[0].VERSION_HIJO}</p></div>
            </div>
          </div>
  
        </div>
      )

  }

}

export default Oc