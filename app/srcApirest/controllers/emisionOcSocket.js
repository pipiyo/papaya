const pool = require('../models/connection')
const decodeToken = require('./decodeToken')

module.exports = (io) => {

  io
  .of('/emisionOc')
  .on('connection', (socket) => {

  /* Editar Oc */
  socket.on('completSelect', (callback) => {
    let query = `select max(CODIGO_OC + 1) as NUMEROOC from orden_de_compra ;` 
    let query1 = `select servicio.CODIGO_PROYECTO, sub_servicio.CODIGO_SUBSERVICIO, sub_servicio.SUB_DESCRIPCION from sub_servicio, servicio where sub_servicio.SUB_CODIGO_SERVICIO =  servicio.CODIGO_SERVICIO and sub_servicio.SUB_ESTADO = 'En Proceso' and sub_servicio.SUB_NOMBRE_SERVICIO  = 'Adquisiciones';`   
    pool.getConnection( (err, connection) => {
        connection.query(query+query1, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({numeroOc:rows[0],sub:rows[1]})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })


})

}