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
      case "proveedor":
            query = `SELECT NOMBRE_FANTASIA as DATOS, RUT_PROVEEDOR as DATOS1, FORMA_PAGO AS DATOS2  FROM proveedor WHERE  NOMBRE_FANTASIA like "%${data.valor}%"  limit 10`;
          break;
      case "producto":
            query = `SELECT CODIGO_PRODUCTO as DATOS, DESCRIPCION as DATOS1, STOCK_ACTUAL as DATOS2, PRECIO as DATOS3, PRECIO_SIN_DESCUENTO as DATOS4, PRECIO as DATOS5 FROM producto WHERE  CODIGO_PRODUCTO like "%${data.valor}%"  limit 10`;
          break;
      case "producto1":
            query = `SELECT DESCRIPCION as DATOS, CODIGO_PRODUCTO as DATOS1, STOCK_ACTUAL as DATOS2, PRECIO as DATOS3, PRECIO_SIN_DESCUENTO as DATOS4, PRECIO as DATOS5 FROM producto WHERE  DESCRIPCION like "%${data.valor}%"  limit 10`;
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