const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/vehiculo')
  .on('connection', (socket) => {

  /* Ingresar Vehiculo */
  socket.on('addVehiculo', (data,callback) => {
    let vehiculo = {  
                    PATENTE: data.patente,
                    KM_INICIO: data.km, 
                    M3: data.m3, 
                  }

      pool.getConnection( (err, connection) => {
            connection.query('INSERT INTO `vehiculo` SET ?',vehiculo, (err) => {
                connection.release()
                if (!err){
                  callback({mensaje:`Se ingreso ${data.nombre}`})
                }
                else{
                  console.log(err)
                  callback({mensaje:`Código ya ingresado ${data.nombre}`})
                }
            }) 
      }) 
  })

  /* Editar Vehiculo */
  socket.on('updateVehiculo', (data,callback) => {
      pool.getConnection( (err, connection) => {
            connection.query('UPDATE vehiculo SET PATENTE = ?, KM_INICIO = ?, M3 = ? WHERE ID = ?', [data.patente, data.km, data.m3, data.codigo], (err, results) => {
                connection.release()
                if (!err){
                  callback({mensaje:`Se actualizo ${data.codigo}`})
                }
                else{
                  console.log('Error ' + err)
                }
            }) 
      }) 
  })

  /* Listar Vehiculo */
  socket.on('searchVehiculo', (id,callback) => {
   
    let query = `select * from vehiculo where ID = '${id}' ` 
    pool.getConnection( (err, connection) => {
        connection.query(query, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({vehiculo:rows})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })



})

}