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

    let query = `select a.ENVIADO, a.CODIGO_OC, a.CODIGO_USUARIO, max(b.fecha_recibido) as fecha_recibido, a.ROCHA_PROYECTO, a.VERSION, a.NOMBRE_PROVEEDOR, a.FECHA_REALIZACION, a.FECHA_ENTREGA, a.FECHA_CONFIRMACION, a.CODIGO_USUARIO, a.NETO, a.FACTURAS, a.FECHA_ENVIO_VALIJA, a.ESTADO FROM 
                (SELECT * FROM orden_de_compra where ${q_estado} ${q_codigo} ${q_rocha} ${q_proveedor} ${q_fecha} order by orden_de_compra.FECHA_CONFIRMACION DESC limit ${filtro.limit} , ${filtro.limitB}) a
                LEFT JOIN (SELECT fecha_recibido,codigo_oc FROM oc_recibo ) b
                ON a.CODIGO_OC = b.codigo_oc GROUP BY a.CODIGO_OC;`
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