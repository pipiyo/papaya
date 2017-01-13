const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/rocha')
  .on('connection', (socket) => {

  /* Listar Rocha */
  socket.on('allRocha', (data,callback) => {
    let q_codigo = ""
    let q_vendedor = ""
    let q_cliente = ""
    let q_fecha = ""

    if(data.codigo){q_codigo = ' and proyecto.CODIGO_PROYECTO like "%'+data.codigo +'%"'}
    if(data.vendedor){q_vendedor = ' and proyecto.EJECUTIVO like "%'+data.vendedor +'%"'}
    if(data.cliente){q_cliente = ' and proyecto.NOMBRE_CLIENTE like "%'+data.cliente +'%"'}
    if(data.fechaInicio != null && data.fechaEntrega != null){q_fecha = ' and proyecto.FECHA_CONFIRMACION BETWEEN "'+ data.fechaInicio +'" and "'+ data.fechaEntrega +'"'}

      let query = 'SELECT * FROM proyecto WHERE estado = "'+data.estado+'" '+q_codigo+' '+q_vendedor+' '+q_fecha+' '+q_cliente+'  limit '+data.limitA+','+data.limitB+' ;' 
      let query1 = 'SELECT count(*) as total FROM proyecto WHERE estado = "'+data.estado+'" '+q_codigo+' '+q_vendedor+' '+q_fecha+' '+q_cliente+';'
      let query2 = 'SELECT `NOMBRES`, `APELLIDO_PATERNO`, `APELLIDO_MATERNO` FROM `empleado` where `AREA` = "COMERCIAL" order by `NOMBRES`;'
      pool.getConnection( (err, connection) => {
            connection.query(query + query1 + query2, (err, rows, fields) => {
                connection.release()
                if (!err)
                  callback({valor:rows[0], cuenta:rows[1], ejecutivo:rows[2]})
                else
                  console.log('Error ' + err)
            }) 
      }) 



  })

})

}