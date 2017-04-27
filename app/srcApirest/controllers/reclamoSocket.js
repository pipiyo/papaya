const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/reclamo')
  .on('connection', (socket) => {

  /* Ingreso Reclamo */
  socket.on('reclamo', (data) => {

    let reclamo = {  
                      AREA: data.area,
                      ROCHA : data.rocha,
                      FECHA_INICIO: data.fechaInicio,
                      FECHA_TERMINO: data.fechaEntrega,
                      ESTADO: "EN PROCESO",
                      RAZON: data.razon,
                      AREA1: data.area1,
                      AREA2: data.area1
                    }
    let mensaje = '(Se ingreso Reclamo ' + data.area + ')'


    pool.getConnection( (err, connection) => {
        connection.query('INSERT INTO `reclamos` SET ?',reclamo, (err) => {
            connection.release()
            if (!err)
              console.log('Se ingreso reclamo ' + data.area);
            else
              console.log('Error no se pudo ingresar reclamo '+ err)
        })
    })
    socket.emit('mensaje', mensaje)
  })

   /* Editar reclamo */
  socket.on('updateReclamo', (data,callback) => {
      pool.getConnection( (err, connection) => {
            connection.query('UPDATE reclamos SET ROCHA = ?, AREA = ?, AREA1 = ?, AREA2 = ?, RAZON = ?, FECHA_INICIO = ?, FECHA_TERMINO  = ?, ESTADO  = ? WHERE CODIGO_RECLAMO = ?', [data.rocha, data.area, data.area1, data.area1, data.razon, data.fechaInicio, data.fechaEntrega, data.estado, data.codigo], (err, results) => {
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

  /* Listar reclamo */
  socket.on('searchReclamo', (id,callback) => {
   
    let query = `select * from reclamos where CODIGO_RECLAMO = '${id}' ` 
    pool.getConnection( (err, connection) => {
        connection.query(query, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({reclamo:rows})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })

})

}