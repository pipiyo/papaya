const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/listadoReclamo')
  .on('connection', (socket) => {


  /* Listar Producto */
  socket.on('allReclamo', (filtro,callback) => {
    let q_reclamo = ""
    let q_rocha = ""
    let q_estado = ""

    if(filtro.reclamo){q_reclamo = ' and CODIGO_RECLAMO = "'+filtro.reclamo +'"'}
    if(filtro.rocha){q_rocha = ' and ROCHA like "%'+filtro.rocha +'%"'}
    q_estado = ' ESTADO = "'+filtro.estado+'"'

    let query = `select * from reclamos where ${q_estado} ${q_reclamo} ${q_rocha} ORDER BY CODIGO_RECLAMO DESC limit ${filtro.limit} , ${filtro.limitB} ;`
    let query1 = `select count(*) as total from reclamos where ${q_estado} ${q_reclamo} ${q_rocha};`
    pool.getConnection( (err, connection) => {
        connection.query(query+query1, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({reclamo:rows[0], cuenta:rows[1]})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })



})

}