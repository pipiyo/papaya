const pool = require('../models/connection')
const decodeToken = require('./decodeToken')

module.exports = (io) => {

  io
  .of('/proyecto')
  .on('connection', (socket) => {


  /* Select Complete*/   
  socket.on('completSelect', (callback) => {

    pool.getConnection( (err, connection) => {
          let query = 'select distinct empleado.NOMBRES, empleado.APELLIDO_PATERNO, empleado.APELLIDO_MATERNO from empleado, usuario, grupo, grupo_usuario where empleado.RUT = usuario.RUT and usuario.CODIGO_USUARIO = grupo_usuario.CODIGO_USUARIO and grupo_usuario.CODIGO_GRUPO =  grupo.ID_GRUPO and grupo.INICIALES_GRUPO = "VEN" order by empleado.NOMBRES; ' 
          let query1 = 'select distinct empleado.NOMBRES, empleado.APELLIDO_PATERNO, empleado.APELLIDO_MATERNO from empleado, usuario, grupo, grupo_usuario where empleado.RUT = usuario.RUT and usuario.CODIGO_USUARIO = grupo_usuario.CODIGO_USUARIO and grupo_usuario.CODIGO_GRUPO =  grupo.ID_GRUPO and grupo.INICIALES_GRUPO = "DAM" order by empleado.NOMBRES; '
          let query2 = 'select  CODIGO_CLIENTE, RUT_CLIENTE, NOMBRE_CLIENTE from cliente order by NOMBRE_CLIENTE; '
          let query3 = 'select NOMBRE_LINEA, CODIGO_LINEA from linea WHERE INHABILITAR = "0" ORDER BY NOMBRE_LINEA ASC'
          connection.query(query+query1+query2+query3, (err, rows, fields) => {
            connection.release()
            if (err) console.log( err ) 
            callback( {vendedor:rows[0],disenador:rows[1],cliente:rows[2],linea:rows[3]} )
          })
    })

  })
   
  /* Ingresar producto */
  socket.on('addRocha', (proyecto, token, callback) => {

    let user = decodeToken(token)

    let producto = {  
                    CODIGO_PROYECTO: proyecto.codigo,
                    RUT_CLIENTE: proyecto.rut, 
                    NOMBRE_CLIENTE: proyecto.cliente, 
                    OBRA: proyecto.obra,
                    MONTO: proyecto.monto,
                    EJECUTIVO: proyecto.ejecutivo,
                    FECHA_INGRESO: proyecto.fechaInicio,
                    FECHA_ENTREGA: proyecto.fechaEntrega,    
                    CONTACTO : proyecto.contacto,
                    TELEFONO: proyecto.telefono,
                    MAIL:proyecto.mail,
                    NOMBRE_PROYECTO: proyecto.nombreProyecto,
                    ENCARGADO: proyecto.encargado,
                    DISENADOR: proyecto.disenador,
                    IVA: proyecto.valoriva,
                    TIPO_IVA: proyecto.iva,
                    SUB_TOTAL: proyecto.subtotal,
                    TOTAL: proyecto.total,
                    MONTO: proyecto.neto,
                    MONTO2: proyecto.neto2,
                    DESCUENTO: proyecto.descuento,
                    DESCUENTO2: proyecto.descuento2,
                    DEPARTAMENTO_CREDITO: proyecto.linea,
                    DEPARTAMENTO: proyecto.departamento,
                    CODIGO_USUARIO: user.name,
                    DIRECCION_FACTURACION:proyecto.direccionObra
                  }

      pool.getConnection( (err, connection) => {
            connection.query('INSERT INTO `proyecto` SET ?',producto, (err) => {
                connection.release()
                if (!err){
                  callback({mensaje:`Se ingreso ${proyecto.codigo}`})
                }
                else{
                  callback({mensaje:`Código ya ingresado ${proyecto.codigo}`})
                }
            }) 
      }) 
  })


})

}