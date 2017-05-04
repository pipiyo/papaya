const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/linea')
  .on('connection', (socket) => {

  /* Ingresar linea */
  socket.on('addLinea', (data,callback) => {
    let linea = {  
                    NOMBRE_LINEA: data.nombre,
                    INHABILITAR: data.activo, 
                  }

      pool.getConnection( (err, connection) => {
            connection.query('INSERT INTO `linea` SET ?',linea, (err) => {
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

  /* Editar linea */
  socket.on('updateLinea', (data,callback) => {
      pool.getConnection( (err, connection) => {
            connection.query('UPDATE linea SET NOMBRE_LINEA= ?, INHABILITAR = ? WHERE CODIGO_LINEA = ?', [data.nombre, data.activo,  data.codigo], (err, results) => {
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

  /* Listar linea */
  socket.on('searchLinea', (id,callback) => {
   
    let query = `select * from linea where CODIGO_LINEA = '${id}' ` 
    pool.getConnection( (err, connection) => {
        connection.query(query, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({linea:rows})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })



})

}