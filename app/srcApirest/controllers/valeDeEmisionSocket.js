const pool = require('../models/connection')
const decodeToken = require('./decodeToken')

module.exports = (io) => {

  io
  .of('/valeDeEmision')
  .on('connection', (socket) => {

  /* Listar Producto */
  socket.on('searchVale', (id,callback) => {
    let query = `select * from vale_emision where COD_VALE = '${id}' ;` 
    let query1 = `select producto.DESCRIPCION, producto.STOCK_ACTUAL, producto_vale_emision.DIFERENCIA, producto_vale_emision.CODIGO_PRODUCTO, producto_vale_emision.OBSERVACIONES, producto_vale_emision.CANTIDAD_UTILIZADA,producto_vale_emision.CANTIDAD_SOLICITADA, producto_vale_emision.PRECIO, producto_vale_emision.CANTIDAD_ENTREGADA from vale_emision, producto_vale_emision, producto where producto.CODIGO_PRODUCTO = producto_vale_emision.CODIGO_PRODUCTO and producto_vale_emision.CODIGO_VALE = vale_emision.COD_VALE AND vale_emision.COD_VALE = '${id}' ` 
    pool.getConnection( (err, connection) => {
        connection.query(query+query1, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({vale:rows[0],productos:rows[1]})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })

  /* Editar Recibir VALE */
  socket.on('updateValeRecibir', (data,token,callback) => {
      let user = decodeToken(token)

      let query = ""
      let total
      let totalVale = 0
      let recibido
      let totalDevolucion
      data.producto.map( (producto,i) => {
        if(data.recibido[i] == ""){
          recibido = 0
        }else{
          recibido = parseInt(data.recibido[i])
        }
        totalVale += parseInt(data.diferencia[i])
        total = parseInt(data.entregado[i]) + recibido

        query += `UPDATE producto_vale_emision SET producto_vale_emision.CANTIDAD_ENTREGADA = "${total}", producto_vale_emision.DIFERENCIA = "${data.diferencia[i]}" where CODIGO_VALE = "${data.codigo}" and producto_vale_emision.CODIGO_PRODUCTO = "${producto}"; `
        query += `UPDATE producto SET STOCK_ACTUAL = STOCK_ACTUAL - ${recibido}  WHERE CODIGO_PRODUCTO = '${producto}'; `
      })
      if(totalVale <= 0){
        query += `UPDATE vale_emision SET ESTADO = "ENTREGADO", DIFERENCIA_TOTAL = "0" where COD_VALE = "${data.codigo}";`
      }else{
        query += `UPDATE vale_emision SET ESTADO = "PARCIAL", DIFERENCIA_TOTAL = '${totalVale}' where COD_VALE = "${data.codigo}";`
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



})

}