const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/ordenDeCompra')
  .on('connection', (socket) => {

  /* Editar Producto */
  socket.on('updateFechaOc', (data,callback) => {
      pool.getConnection( (err, connection) => {
            connection.query('UPDATE orden_de_compra SET FECHA_CONFIRMACION = ?, FECHA_ENVIO_VALIJA = ?, ESTADO = ? WHERE CODIGO_OC = ?', [data.fechaConfirmacion, data.fechaActa, data.estado, data.codigo], (err, results) => {
                connection.release()
                if (!err){
                  callback({mensaje:`Se ingreso ${data.codigo}`})
                }
                else{
                  console.log('Error ' + err)
                }
            }) 
      }) 
  })



  /* Listar Producto */
  socket.on('searchOc', (id,callback) => {
    let query = `select * from orden_de_compra where CODIGO_OC = '${id}' ;` 
    let query1 = `select producto.DESCRIPCION, producto.STOCK_ACTUAL, oc_producto.CANTIDAD_RECIBIDA, oc_producto.DIFERENCIA , oc_producto.GUIA_DESPACHO, oc_producto.CODIGO_PRODUCTO,oc_producto.ROCHA, oc_producto.OBSERVACION, oc_producto.CANTIDAD, oc_producto.PRECIO_BODEGA, oc_producto.PRECIO_UNITARIO, oc_producto.PRECIO_LISTA, oc_producto.DESCUENTO, oc_producto.TOTAL from orden_de_compra, oc_producto, producto where producto.CODIGO_PRODUCTO = oc_producto.CODIGO_PRODUCTO and oc_producto.CODIGO_OC = orden_de_compra.CODIGO_OC AND orden_de_compra.CODIGO_OC = '${id}' ` 
    pool.getConnection( (err, connection) => {
        connection.query(query+query1, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({oc:rows[0],productos:rows[1]})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })



})

}