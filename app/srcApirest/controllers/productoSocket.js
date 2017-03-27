const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/producto')
  .on('connection', (socket) => {

  /* Ingresar producto */
  socket.on('addProducto', (data,callback) => {
    let producto = {  
                    CODIGO_PRODUCTO: data.codigo,
                    DESCRIPCION: data.descripcion, 
                    STOCK_ACTUAL: 0, 
                    STOCK_MINIMO: data.stockMin,
                    STOCK_MAXIMO: data.stockMax,
                    PRECIO: data.precio,
                    UNIDAD_DE_MEDIDA: data.um,
                    FORMATO: data.formato,
                    CATEGORIA: data.categoria,     
                    PRECIO_SIN_DESCUENTO : 0,
                    PRECIO_VENTA: 0,
                    PRECIO_LISTA_PRECIO:0,
                    TEMPORADA: 0
                  }

      pool.getConnection( (err, connection) => {
            connection.query('INSERT INTO `producto` SET ?',producto, (err) => {
                connection.release()
                if (!err){
                  callback({mensaje:`Se ingreso ${data.codigo}`})
                }
                else{
                  callback({mensaje:`Código ya ingresado ${data.codigo}`})
                }
            }) 
      }) 
  })

  /* Editar Producto */
  socket.on('updateProducto', (data,callback) => {
      pool.getConnection( (err, connection) => {
            connection.query('UPDATE producto SET DESCRIPCION = ?, STOCK_MINIMO = ?, STOCK_MAXIMO = ?, PRECIO = ?, UNIDAD_DE_MEDIDA = ?, FORMATO = ?, CATEGORIA  = ? WHERE CODIGO_PRODUCTO = ?', [data.descripcion, data.stockMin, data.stockMax, data.precio, data.um, data.formato, data.categoria, data.codigo], (err, results) => {
                connection.release()
                if (!err){
                  callback({mensaje:`Se ingreso ${data.codigo}`})
                }
                else{
                  console.log('Error ' + err)
                }
            }) 
      }) 
  })
  /* Editar Producto */
  socket.on('updateProductoPrecio', (data,callback) => {
      pool.getConnection( (err, connection) => {
            connection.query('UPDATE producto SET PRECIO = ?, PRECIO_VENTA = ? WHERE CODIGO_PRODUCTO = ?', [data.precio, data.precioVenta, data.codigo], (err, results) => {
                connection.release()
                if (!err){
                  callback({mensaje:`Se actualizo precio ${data.codigo}`})
                }
                else{
                  console.log('Error ' + err)
                }
            }) 
      }) 
  })

  /* Stock Producto */
  socket.on('stockProducto', (data,callback) => {
    let query
      if(data.stock == 1){
        query = `UPDATE producto SET STOCK_ACTUAL = STOCK_ACTUAL + ${data.numero} WHERE CODIGO_PRODUCTO = "${data.codigo}"`
      }else{
        query = `UPDATE producto SET STOCK_ACTUAL = STOCK_ACTUAL - ${data.numero} WHERE CODIGO_PRODUCTO = "${data.codigo}"`
      }
      pool.getConnection( (err, connection) => {
            connection.query(query , (err, results) => {
                connection.release()
                if (!err){
                  callback({mensaje:`Se ingreso ${data.codigo}`})
                }
                else{
                  console.log('Error ' + err)
                }
            }) 
      }) 
  })

  /* Listar Producto */
  socket.on('searchProducto', (id,callback) => {
   
    let query = `select * from producto where CODIGO_PRODUCTO = '${id}' ` 
    pool.getConnection( (err, connection) => {
        connection.query(query, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({producto:rows})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })



})

}