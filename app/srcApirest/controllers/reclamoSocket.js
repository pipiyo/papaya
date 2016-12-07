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


    console.log(data)
    socket.emit('mensaje', mensaje)
  })

})

}