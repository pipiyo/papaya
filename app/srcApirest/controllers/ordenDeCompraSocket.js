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
    let query = `select * from orden_de_compra where CODIGO_OC = '${id}' ` 
    pool.getConnection( (err, connection) => {
        connection.query(query, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({oc:rows})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })



})

}