const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/cliente')
  .on('connection', (socket) => {

  /* Ingresar cliente */
  socket.on('addCliente', (data,callback) => {
    let cliente = {  
                    RUT_CLIENTE: data.rut,
                    NOMBRE_CLIENTE: data.nombre, 
                    RAZON_SOCIAL: data.razon, 
                    GIRO: data.giro,
                    DIRECCION: data.direccion,
                    CONTACTO1: data.contacto,
                    TELEFONO1: data.telefono1,
                    TELEFONO2: data.telefono2,    
                    CELULAR_CONTACTO1 : data.mail,
                    FORMA_PAGO: data.pago,
                    ACTIVO:''
                  }

      pool.getConnection( (err, connection) => {
            connection.query('INSERT INTO `cliente` SET ?',cliente, (err) => {
                connection.release()
                if (!err){
                  callback({mensaje:`Se ingreso ${data.codigo}`})
                }
                else{
                  console.log(err)
                  callback({mensaje:`Código ya ingresado ${data.codigo}`})
                }
            }) 
      }) 
  })

  /* Editar cliente */
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

  /* Listar cliente */
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