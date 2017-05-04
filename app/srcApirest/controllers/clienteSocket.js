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
  socket.on('updateCliente', (data,callback) => {
      pool.getConnection( (err, connection) => {
            connection.query('UPDATE cliente SET RUT_CLIENTE = ?, NOMBRE_CLIENTE = ?, RAZON_SOCIAL = ?, GIRO = ?, DIRECCION = ?, CONTACTO1 = ?, TELEFONO1  = ?, TELEFONO2 = ?, CELULAR_CONTACTO1  = ?, FORMA_PAGO  = ? WHERE CODIGO_CLIENTE = ?', [data.rut, data.nombre, data.razon, data.giro, data.direccion, data.contacto, data.telefono1, data.telefono2, data.mail, data.pago, data.codigo], (err, results) => {
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
  socket.on('searchCliente', (id,callback) => {
   
    let query = `select * from cliente where CODIGO_CLIENTE = '${id}' ` 
    pool.getConnection( (err, connection) => {
        connection.query(query, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({cliente:rows})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })



})

}