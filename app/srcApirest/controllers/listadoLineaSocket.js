const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/listadoLinea')
  .on('connection', (socket) => {


  /* Listar Producto */
  socket.on('allLinea', (filtro,callback) => {
    let q_linea = ""

    if(filtro.linea){q_linea = ' WHERE NOMBRE_LINEA like "%'+filtro.linea +'%"'}
  
    let query = `select * from linea ${q_linea} limit ${filtro.limit} , ${filtro.limitB} ;`
    let query1 = `select count(*) as total from linea ${q_linea};`

    pool.getConnection( (err, connection) => {
        connection.query(query+query1, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({linea:rows[0], cuenta:rows[1]})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })



})

}