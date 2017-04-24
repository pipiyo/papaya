const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/listadoCliente')
  .on('connection', (socket) => {


  /* Listar Producto */
  socket.on('allCliente', (filtro,callback) => {
    let q_cliente = ""

    if(filtro.cliente){q_cliente = ' and NOMBRE_CLIENTE like "%'+filtro.cliente +'%"'}
  
    let query = `select * from cliente where activo = "" ${q_cliente} limit ${filtro.limit} , ${filtro.limitB} ;`
    let query1 = `select count(*) as total from cliente where activo = "" ${q_cliente};`
    pool.getConnection( (err, connection) => {
        connection.query(query+query1, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({cliente:rows[0], cuenta:rows[1]})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })



})

}