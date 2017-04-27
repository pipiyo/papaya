const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/proveedor')
  .on('connection', (socket) => {

  /* Ingresar cliente */
  socket.on('addProveedor', (data,callback) => {
    let cliente = { 
                    CODIGO_PROVEEDOR: data.rut, 
                    RUT_PROVEEDOR: data.rut,
                    NOMBRE_FANTASIA: data.nombre, 
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
            connection.query('INSERT INTO `proveedor` SET ?',cliente, (err) => {
                connection.release()
                if (!err){
                  callback({mensaje:`Se ingreso ${data.nombre}`})
                }
                else{
                  console.log(err)
                  callback({mensaje:`Código ya ingresado ${data.nombre}`})
                }
            }) 
      }) 
  })

  /* Editar cliente */
  socket.on('updateProveedor', (data,callback) => {
      pool.getConnection( (err, connection) => {
            connection.query('UPDATE proveedor SET RUT_PROVEEDOR = ?, NOMBRE_FANTASIA = ?, RAZON_SOCIAL = ?, GIRO = ?, DIRECCION = ?, CONTACTO1 = ?, TELEFONO1  = ?, TELEFONO2 = ?, CELULAR_CONTACTO1  = ?, FORMA_PAGO  = ? WHERE CODIGO_PROVEEDOR = ?', [data.rut, data.nombre, data.razon, data.giro, data.direccion, data.contacto, data.telefono1, data.telefono2, data.mail, data.pago, data.codigo], (err, results) => {
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

  /* Listar cliente */
  socket.on('searchProveedor', (id,callback) => {
   
    let query = `select * from proveedor where CODIGO_PROVEEDOR = '${id}' ` 
    pool.getConnection( (err, connection) => {
        connection.query(query, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({proveedor:rows})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })



})

}