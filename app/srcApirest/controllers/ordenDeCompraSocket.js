const pool = require('../models/connection')
const decodeToken = require('./decodeToken')

module.exports = (io) => {

  io
  .of('/ordenDeCompra')
  .on('connection', (socket) => {

  /* Editar Oc */
  socket.on('updateFechaOc', (data,callback) => {
      pool.getConnection( (err, connection) => {
            connection.query('UPDATE orden_de_compra SET FECHA_CONFIRMACION = ?,ENVIADO = ?, FECHA_ENVIO_VALIJA = ?, ESTADO = ? WHERE CODIGO_OC = ?', [data.fechaConfirmacion, data.enviado, data.fechaActa, data.estado, data.codigo], (err, results) => {
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

  /* Editar Recibir OC */
  socket.on('updateOcRecibir', (data,token,callback) => {
      let user = decodeToken(token)

      let query = ""
      let total
      let totalOC = 0
      let recibido
      let totalDevolucion
      data.producto.map( (producto,i) => {
        if(data.recibido[i] == ""){
          recibido = 0
        }else{
          recibido = parseInt(data.recibido[i])
        }
        totalOC += parseInt(data.diferencia[i])
        total = parseInt(data.entregado[i]) + recibido

        if(recibido > 0){
          totalDevolucion = parseInt(data.diferencia[i]) + parseInt(data.entregado[i])
          query += `INSERT INTO oc_recibo (codigo_oc, total, recibido,fecha_recibido,codigo_producto,user) values ("${data.codigo}","${totalDevolucion}","${recibido}","${data.fecha}","${producto}","${user.name}");`;
        }

        query += `UPDATE oc_producto SET oc_producto.CANTIDAD_RECIBIDA = "${total}", oc_producto.DIFERENCIA = "${data.diferencia[i]}", oc_producto.GUIA_DESPACHO = "${data.guia[i]}" where CODIGO_OC = "${data.codigo}" and oc_producto.CODIGO_PRODUCTO = "${producto}"; `
        query += `UPDATE producto SET STOCK_ACTUAL = STOCK_ACTUAL + ${recibido}  WHERE CODIGO_PRODUCTO = '${producto}'; `
      })
      if(totalOC <= 0){
        query += `UPDATE orden_de_compra SET ESTADO = "OK", DIFERENCIA_TOTAL = "0" where CODIGO_OC = "${data.codigo}";`
        query += `UPDATE sub_servicio SET SUB_ESTADO = 'OK' WHERE SUB_OC = '${data.codigo}';`
      }else{
        query += `UPDATE sub_servicio SET SUB_ESTADO = 'Parcial' WHERE SUB_OC = '${data.codigo}';`
      }
      pool.getConnection( (err, connection) => {
            connection.query(query, (err, results) => {
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


   /* Devolución OC */
  socket.on('addOcRecibir', (data,token,callback) => {
      let user = decodeToken(token)
      let producto = {  
                    codigo_oc: data.codigo,
                    cantidad: data.cantidad, 
                    motivo: data.razon, 
                    user: user.name,
                    fecha: data.fecha,
                    codigo_producto: data.ocProducto
                  }

      pool.getConnection( (err, connection) => {
            connection.query('INSERT INTO `oc_devolucion` SET ?',producto, (err) => {
                connection.release()
                if (!err){
                  callback({mensaje:`Se ingreso devolución ${data.ocProducto}`})
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
    let query1 = `select producto.DESCRIPCION, producto.STOCK_ACTUAL, oc_producto.CANTIDAD_RECIBIDA, oc_producto.DIFERENCIA , oc_producto.GUIA_DESPACHO, oc_producto.CODIGO_PRODUCTO,oc_producto.ROCHA, oc_producto.OBSERVACION, oc_producto.CANTIDAD, oc_producto.PRECIO_BODEGA, oc_producto.PRECIO_UNITARIO, oc_producto.PRECIO_LISTA, oc_producto.DESCUENTO, oc_producto.TOTAL from orden_de_compra, oc_producto, producto where producto.CODIGO_PRODUCTO = oc_producto.CODIGO_PRODUCTO and oc_producto.CODIGO_OC = orden_de_compra.CODIGO_OC AND orden_de_compra.CODIGO_OC = '${id}';` 
    let query2 = `select * from oc_devolucion where codigo_oc = '${id}' order by id desc ;` 
    let query3 = `select * from oc_recibo where codigo_oc = '${id}' order by id desc ;` 
    pool.getConnection( (err, connection) => {
        connection.query(query+query1+query2+query3, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({oc:rows[0],productos:rows[1],devolucion:rows[2],recibo:rows[3]})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })



})

}