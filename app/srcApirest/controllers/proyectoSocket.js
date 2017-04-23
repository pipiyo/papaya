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
    let query = `SELECT count(*) as total FROM proyecto WHERE NOMBRE_PROYECTO = '${proyecto.nombreProyecto}'`
    let query1 = `INSERT INTO proyecto (CODIGO_PROYECTO,RUT_CLIENTE,NOMBRE_CLIENTE,OBRA,MONTO,EJECUTIVO,FECHA_INGRESO,FECHA_ENTREGA,CONTACTO,TELEFONO,MAIL,NOMBRE_PROYECTO,ENCARGADO,DISENADOR,IVA,TIPO_IVA,SUB_TOTAL,PUESTOS,TOTAL,MONTO2,DESCUENTO,DESCUENTO2,DEPARTAMENTO_CREDITO,DEPARTAMENTO,CODIGO_USUARIO,DIRECCION_FACTURACION,ESTADO,FECHA_CONFIRMACION,CONDICION_PAGO,ORDEN_CC,FONO)VALUES('${proyecto.codigo}','${proyecto.rut}','${proyecto.cliente}','${proyecto.obra}','${proyecto.neto}','${proyecto.ejecutivo}','${proyecto.fechaInicio}','${proyecto.fechaEntrega}','${proyecto.contacto}','${proyecto.telefono}','${proyecto.mail}','${proyecto.nombreProyecto}','${proyecto.encargado}','${proyecto.disenador}','${proyecto.valoriva}','${proyecto.iva}','${proyecto.subtotal}','${proyecto.puestos}','${proyecto.total}','${proyecto.neto2}','${proyecto.descuento}','${proyecto.descuento2}','${proyecto.linea}','${proyecto.departamento}','${user.name}','${proyecto.direccionObra}','${'EN PROCESO'}','${proyecto.fechaEntrega}','${proyecto.pago}','${proyecto.oc}','${proyecto.telefono}') ;`

      pool.getConnection( (err, connection) => {
        connection.beginTransaction(function(err) {
            if (err) { throw err }
            connection.query(query, (error, rows, fields) => {
              if (error) {
                return connection.rollback(function() {
                  throw error;
                });
              }
              if(rows[0].total == 0){
                query1 += `INSERT INTO madre(NOMBRE, ESTADO) VALUES ('${proyecto.nombreProyecto}','EN PROCESO');`
              }
                connection.query(query1, (error) => {
                    if (error) {
                      return connection.rollback(function() {
                        console.log( error );
                      });
                    }
                    connection.commit(function(err) {
                      if (err) {
                        return connection.rollback(function() {
                          console.log(  err );
                        });
                      }
                      callback({mensaje:`Se ingreso Rocha ${proyecto.codigo}`})
                    })
                })
            })     
        })  
      }) 
  })

  /* Clonar producto */
  socket.on('clonerRocha', (proyecto, token, callback) => {

    let user = decodeToken(token)
    let query = `SELECT count(*) as total FROM proyecto WHERE NOMBRE_PROYECTO = '${proyecto.nombreProyecto}'`
    let query1 = `INSERT INTO proyecto (CODIGO_PROYECTO,RUT_CLIENTE,NOMBRE_CLIENTE,OBRA,MONTO,EJECUTIVO,FECHA_INGRESO,FECHA_ENTREGA,CONTACTO,TELEFONO,MAIL,NOMBRE_PROYECTO,ENCARGADO,DISENADOR,IVA,TIPO_IVA,SUB_TOTAL,PUESTOS,TOTAL,MONTO2,DESCUENTO,DESCUENTO2,DEPARTAMENTO_CREDITO,DEPARTAMENTO,CODIGO_USUARIO,DIRECCION_FACTURACION,ESTADO,FECHA_CONFIRMACION,CONDICION_PAGO,ORDEN_CC,FONO)VALUES('${proyecto.codigo}','${proyecto.rut}','${proyecto.cliente}','${proyecto.obra}','${proyecto.neto}','${proyecto.ejecutivo}','${proyecto.fechaInicio}','${proyecto.fechaEntrega}','${proyecto.contacto}','${proyecto.telefono}','${proyecto.mail}','${proyecto.nombreProyecto}','${proyecto.encargado}','${proyecto.disenador}','${proyecto.valoriva}','${proyecto.iva}','${proyecto.subtotal}','${proyecto.puestos}','${proyecto.total}','${proyecto.neto2}','${proyecto.descuento}','${proyecto.descuento2}','${proyecto.linea}','${proyecto.departamento}','${user.name}','${proyecto.direccionObra}','${'EN PROCESO'}','${proyecto.fechaEntrega}','${proyecto.pago}','${proyecto.oc}','${proyecto.telefono}') ;`

      pool.getConnection( (err, connection) => {
        connection.beginTransaction(function(err) {
            if (err) { throw err }
            connection.query(query, (error, rows, fields) => {
              if (error) {
                return connection.rollback(function() {
                  throw error;
                });
              }
              if(rows[0].total == 0){
                query1 += `INSERT INTO madre(NOMBRE, ESTADO) VALUES ('${proyecto.nombreProyecto}','EN PROCESO');`
              }
              proyecto.servicio.map( (servicio,i) => {
                query1 += `INSERT INTO servicio(FECHA_PRIMERA_ENTREGA, FECHA_REALIZACION, NOMBRE_SERVICIO, CATEGORIA, SUPERVISOR, FECHA_INICIO, FECHA_ENTREGA, DESCRIPCION, OBSERVACIONES, CODIGO_PROYECTO, DIRECCION, GUIA_DESPACHO, CODIGO_COMUNA,M3, FI, TM, TP,OS, LIDER, PUESTOS, PROCESO, INSTALADOR_1, INSTALADOR_2, INSTALADOR_3, EJECUTOR, VALE, TRANSPORTE, CANTIDAD, RECLAMOS, ESTADO, DIAS, REALIZADOR) VALUES ('${servicio.FECHA_INICIO}','${servicio.FECHA_REALIZACION}','${servicio.NOMBRE_SERVICIO}', '${servicio.CATEGORIA}', '${servicio.SUPERVISOR}', '${servicio.FECHA_INICIO}', '${servicio.FECHA_ENTREGA}', '${servicio.DESCRIPCION}', '${servicio.OBSERVACIONES}', '${proyecto.codigo}' , '${servicio.DIRECCION}', '${servicio.GUIA_DESPACHO}', '${servicio.CODIGO_COMUNA}', '${servicio.M3}', '${servicio.FI}', '${servicio.TM}', '${servicio.TP}', '${servicio.OS}', '${servicio.LIDER}', '${servicio.PUESTOS}', '${servicio.PROCESO}', '${servicio.INSTALADOR_1}', '${servicio.INSTALADOR_2}', '${servicio.INSTALADOR_3}', '${servicio.EJECUTOR}', '${servicio.VALE}', '${servicio.TRANSPORTE}', '${servicio.CANTIDAD}', '${servicio.RECLAMOS}', 'EN PROCESO', '${servicio.DIAS}','${user.name}');`
              })
              
                connection.query(query1, (error) => {
                    if (error) {
                      return connection.rollback(function() {
                        console.log( error );
                      });
                    }
                    connection.commit(function(err) {
                      if (err) {
                        return connection.rollback(function() {
                          console.log(  err );
                        });
                      }
                      callback({mensaje:`Se ingreso Rocha ${proyecto.codigo}`})
                    })
                })
            })     
        })  
      }) 
  })

  /* Editar Proyecto */
  socket.on('updateRocha', (proyecto,callback) => {
    pool.getConnection( (err, connection) => {
      connection.beginTransaction(function(err) {
          if (err) { throw err }
          connection.query('UPDATE proyecto SET RUT_CLIENTE = ?, NOMBRE_CLIENTE = ?, OBRA = ?, MONTO = ?, EJECUTIVO = ?, FECHA_INGRESO = ?, FECHA_ENTREGA = ?, CONTACTO = ?, TELEFONO = ?, MAIL = ?, NOMBRE_PROYECTO = ?, ENCARGADO = ? , DISENADOR = ? , IVA = ? , TIPO_IVA = ? , SUB_TOTAL = ? , PUESTOS = ? , TOTAL = ? , MONTO2 = ? , DESCUENTO = ? , DESCUENTO2 = ? , DEPARTAMENTO_CREDITO = ? , DEPARTAMENTO = ? , DIRECCION_FACTURACION = ? , ESTADO = ? , FECHA_ACTA = ?, FECHA_CONFIRMACION = ?, FONO = ?, ORDEN_CC = ?, CONDICION_PAGO = ? WHERE CODIGO_PROYECTO = ?', [proyecto.rut, proyecto.cliente, proyecto.obra, proyecto.neto, proyecto.ejecutivo, proyecto.fechaInicio, proyecto.fechaEntrega, proyecto.contacto, proyecto.telefono, proyecto.mail, proyecto.nombreProyecto, proyecto.encargado, proyecto.disenador, proyecto.valoriva, proyecto.iva, proyecto.subtotal, proyecto.puestos, proyecto.total, proyecto.neto2, proyecto.descuento, proyecto.descuento2, proyecto.linea, proyecto.departamento, proyecto.direccionObra, proyecto.estado, proyecto.fechaActa, proyecto.fechaConfirmacion , proyecto.telefono, proyecto.oc, proyecto.pago, proyecto.codigo], (error, results) => {
              if (error) {
                return connection.rollback(function() {
                  throw error;
                });
              }
              let query1 = `SELECT count(*) as total FROM proyecto WHERE NOMBRE_PROYECTO = '${proyecto.nombreProyecto}' and ESTADO = "EN PROCESO"`
              connection.query(query1, (error,rows) => {
                    if (error) {
                      return connection.rollback(function() {
                        console.log( error );
                      });
                    }
                    let query2
                    if(rows[0].total == 0){
                      query2 = `UPDATE madre SET ESTADO = "OK" WHERE NOMBRE = '${proyecto.nombreProyecto}' ;`
                    }else{
                      query2 = `UPDATE madre SET ESTADO = "EN PROCESO" WHERE NOMBRE = '${proyecto.nombreProyecto}' ;`
                    }

                    connection.query(query2, (error,results) => {
                      if (error) {
                        return connection.rollback(function() {
                          console.log( error );
                        });
                      }
                      connection.commit(function(err) {
                        if (err) {
                          return connection.rollback(function() {
                          throw err;
                        });
                        }
                        callback({mensaje:`Se ingreso actualizo rocha ${proyecto.codigo}`})
                      })
                    })
              })
          })
      })  
    }) 
  })

   /* Listar Producto */
  socket.on('searchRocha', (id,callback) => {
   
    let query = `SELECT * FROM proyecto WHERE CODIGO_PROYECTO = '${id}';`
    let query1 = `SELECT * FROM servicio WHERE CODIGO_PROYECTO = '${id}' and NOMBRE_SERVICIO NOT IN('OC','BODEGA');`
    pool.getConnection( (err, connection) => {
        connection.query(query + query1, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({rocha:rows[0],servicio:rows[1]})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })


})

}