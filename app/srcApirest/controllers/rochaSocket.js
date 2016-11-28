module.exports = (io, pool) => {

  io
  .of('/rocha')
  .on('connection', (socket) => {

  /* Listar Rocha */
  socket.on('allRocha', (data) => {
    let q_codigo = ""
    let q_vendedor = ""
    let q_cliente = ""
    let q_fecha = ""

    if(data.codigo != ""){q_codigo = ' and proyecto.CODIGO_PROYECTO like "%'+data.codigo +'%"'}
    if(data.vendedor != ""){q_vendedor = ' and proyecto.EJECUTIVO like "%'+data.vendedor +'%"'}
    if(data.cliente != ""){q_cliente = ' and proyecto.NOMBRE_CLIENTE like "%'+data.cliente +'%"'}
    if(data.fechai != "" && data.fechae != ""){q_fecha = ' and proyecto.FECHA_CONFIRMACION BETWEEN "'+ data.fechai +'" and "'+ data.fechae +'"'}

      let query = 'SELECT * FROM proyecto WHERE estado = "'+data.estado+'" '+q_codigo+' '+q_vendedor+' '+q_fecha+' '+q_cliente+'  limit '+data.count+';' 
      let query1 = 'SELECT count(*) as total FROM proyecto WHERE estado = "'+data.estado+'" '+q_codigo+' '+q_vendedor+' '+q_fecha+' '+q_cliente+';'
      let query2 = 'SELECT `NOMBRES`, `APELLIDO_PATERNO`, `APELLIDO_MATERNO` FROM `empleado` where `AREA` = "COMERCIAL" order by `NOMBRES`;'

      pool.getConnection( (err, connection) => {
            connection.query(query + query1 + query2, (err, rows, fields) => {
                connection.release()
                if (!err)
                  socket.emit('okAllRocha', { valor:rows[0], cuenta:rows[1], ejecutivo:rows[2]})
                else
                  console.log('Error ' + err)
            }) 
      }) 



  })

})

}