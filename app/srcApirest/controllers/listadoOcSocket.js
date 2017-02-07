const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/listadoOc')
  .on('connection', (socket) => {


  /* Listar Producto */
  socket.on('allOc', (filtro,callback) => {
    let query = `select * from orden_de_compra where estado = "En Proceso" limit ${filtro.limit} , ${filtro.limitB} ;`
    let query1 = `select count(*) as total from  orden_de_compra where estado = "En Proceso" ;`
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