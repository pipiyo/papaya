const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/listadoOc')
  .on('connection', (socket) => {


  /* Listar Producto */
  socket.on('allOc', (filtro,callback) => {

    let q_codigo = ""
    let q_proveedor = ""
    let q_estado = ""
    let q_rocha = ""
    let q_fecha = ""

    if(filtro.codigo){q_codigo = ' and orden_de_compra.CODIGO_OC like "%'+filtro.codigo +'%"'}
    if(filtro.proveedor){q_proveedor = ' and orden_de_compra.NOMBRE_PROVEEDOR like "%'+filtro.proveedor +'%"'}
    if(filtro.rocha){q_rocha = ' and orden_de_compra.ROCHA_PROYECTO like "%'+filtro.rocha +'%"'}
    if(filtro.fechaInicio != null && filtro.fechaEntrega != null){q_fecha = ' and orden_de_compra.FECHA_CONFIRMACION BETWEEN "'+ filtro.fechaInicio.substring(0,10) +'" and "'+ filtro.fechaEntrega.substring(0,10) +'"'}
    q_estado = ' orden_de_compra.ESTADO = "'+filtro.estado+'"'

    let query = `select orden_de_compra.ENVIADO, orden_de_compra.CODIGO_OC, usuario.NOMBRE_USUARIO, max(oc_recibo.fecha_recibido) as fecha_recibido, orden_de_compra.ROCHA_PROYECTO, orden_de_compra.VERSION, orden_de_compra.NOMBRE_PROVEEDOR, orden_de_compra.FECHA_REALIZACION, orden_de_compra.FECHA_ENTREGA, orden_de_compra.FECHA_CONFIRMACION, orden_de_compra.CODIGO_USUARIO, orden_de_compra.NETO, orden_de_compra.FACTURAS, orden_de_compra.FECHA_ENVIO_VALIJA, orden_de_compra.ESTADO from (orden_de_compra LEFT JOIN oc_recibo on oc_recibo.CODIGO_OC = orden_de_compra.CODIGO_OC) LEFT JOIN usuario ON usuario.CODIGO_USUARIO = orden_de_compra.CODIGO_USUARIO where ${q_estado} ${q_codigo} ${q_rocha} ${q_proveedor} ${q_fecha} group by orden_de_compra.CODIGO_OC order by orden_de_compra.CODIGO_OC DESC  limit ${filtro.limit} , ${filtro.limitB} ;`
    let query1 = `select count(*) as total from  orden_de_compra where ${q_estado} ${q_codigo} ${q_rocha} ${q_proveedor} ${q_fecha} ;`
    let query2 = `select distinct RAZON_SOCIAL from proveedor order by RAZON_SOCIAL`

    pool.getConnection( (err, connection) => {
        connection.query(query+query1+query2, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({oc:rows[0], cuenta:rows[1], proveedor:rows[2]})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })



})

}