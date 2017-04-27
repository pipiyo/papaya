const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/listadoProveedor')
  .on('connection', (socket) => {


  /* Listar Producto */
  socket.on('allProveedor', (filtro,callback) => {
    let q_proveedor = ""

    if(filtro.proveedor){q_proveedor = ' and NOMBRE_FANTASIA like "%'+filtro.proveedor +'%"'}
  
    let query = `select * from proveedor where activo = "" ${q_proveedor} limit ${filtro.limit} , ${filtro.limitB} ;`
    let query1 = `select count(*) as total from proveedor where activo = "" ${q_proveedor};`
    pool.getConnection( (err, connection) => {
        connection.query(query+query1, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({proveedor:rows[0], cuenta:rows[1]})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })



})

}