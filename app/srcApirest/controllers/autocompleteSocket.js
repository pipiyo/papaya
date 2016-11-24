module.exports = (io, pool) => {

  io
  .of('/autocomplete')
  .on('connection', (socket) => {

  /* Listar Rocha */
  socket.on('autocomplete', (data) => {
    console.log(data)
      let query = 'SELECT CODIGO_PROYECTO as DATOS FROM proyecto WHERE estado = "EN PROCESO" and CODIGO_PROYECTO like "%'+data.valor+'%"  limit 10' 
  
      pool.getConnection( (err, connection) => {
            connection.query(query , (err, rows, fields) => {
                connection.release()
                if (!err)
                  socket.emit('okAutocomplete', { datos:rows })
                else
                  console.log('Error ' + err)
            }) 
      }) 



  })

})

}