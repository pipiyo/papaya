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
            query = `SELECT CODIGO_PROYECTO as DATOS, DIRECCION_FACTURACION as DATOS1 FROM proyecto WHERE estado = "EN PROCESO" and CODIGO_PROYECTO like "%${data.valor}%"  limit 10`;
          break;
      case "cliente":
            query = `SELECT NOMBRE_CLIENTE as DATOS, RUT_CLIENTE as DATOS1, TELEFONO1 as DATOS2, CONTACTO1 AS DATOS3, DIRECCION AS DATOS4 FROM cliente WHERE  NOMBRE_CLIENTE like "%${data.valor}%"  limit 10`;
          break;
      case "proveedor":
            query = `SELECT NOMBRE_FANTASIA as DATOS, CODIGO_PROVEEDOR as DATOS1, FORMA_PAGO AS DATOS2, CONTACTO1 as DATOS3, TELEFONO1 AS DATOS4  FROM proveedor WHERE  NOMBRE_FANTASIA like "%${data.valor}%"  limit 10`;
          break;
      case "producto":
            query = `SELECT CODIGO_PRODUCTO as DATOS, DESCRIPCION as DATOS1, STOCK_ACTUAL as DATOS2, PRECIO as DATOS3, PRECIO_SIN_DESCUENTO as DATOS4, PRECIO as DATOS5, PRECIO as DATOS6  FROM producto WHERE TEMPORADA = 0 AND CODIGO_PRODUCTO like "%${data.valor}%"  limit 10`;
          break;
      case "producto1":
            query = `SELECT DESCRIPCION as DATOS, CODIGO_PRODUCTO as DATOS1, STOCK_ACTUAL as DATOS2, PRECIO as DATOS3, PRECIO_SIN_DESCUENTO as DATOS4, PRECIO as DATOS5, PRECIO as DATOS6  FROM producto WHERE TEMPORADA = 0 AND DESCRIPCION like "%${data.valor}%"  limit 10`;
          break;
      case "t2producto":
            query = `SELECT CODIGO_PRODUCTO as DATOS, DESCRIPCION as DATOS1, STOCK_ACTUAL as DATOS2, PRECIO as DATOS3, PRECIO_SIN_DESCUENTO as DATOS4, PRECIO as DATOS5, PRECIO as DATOS6  FROM producto WHERE TEMPORADA = 2 AND CODIGO_PRODUCTO like "%${data.valor}%" and producto.FAMILIA = 'generico'  limit 10`;
          break;
      case "t2producto1":
            query = `SELECT DESCRIPCION as DATOS, CODIGO_PRODUCTO as DATOS1, STOCK_ACTUAL as DATOS2, PRECIO as DATOS3, PRECIO_SIN_DESCUENTO as DATOS4, PRECIO as DATOS5, PRECIO as DATOS6  FROM producto WHERE TEMPORADA = 2 AND DESCRIPCION like "%${data.valor}%" and producto.FAMILIA = 'generico'  limit 10`;
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