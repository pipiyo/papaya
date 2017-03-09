const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/autocomplete')
  .on('connection', (socket) => {

  /* Listar Rocha */
  socket.on('autocomplete', (data,callback) => {
    let query 
    switch(data.complete) {
      case "rocha":
            query = `SELECT CODIGO_PROYECTO as DATOS FROM proyecto WHERE estado = "EN PROCESO" and CODIGO_PROYECTO like "%${data.valor}%"  limit 10`;
          break;
      case "cliente":
            query = `SELECT NOMBRE_CLIENTE as DATOS FROM cliente WHERE  NOMBRE_CLIENTE like "%${data.valor}%"  limit 10`;
          break;
    }

      pool.getConnection( (err, connection) => {
            connection.query(query , (err, rows, fields) => {
                connection.release()
                if (!err)
                  callback( {datos:rows} )
                else
                  console.log('Error ' + err)
            }) 
      }) 
  })

})

}