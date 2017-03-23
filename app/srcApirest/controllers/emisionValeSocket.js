const pool = require('../models/connection')
const decodeToken = require('./decodeToken')

module.exports = (io) => {

  io
  .of('/emisionVale')
  .on('connection', (socket) => {

  /* Complete Vale */
  socket.on('completSelect', (callback) => {
    let query = `select max(COD_VALE + 1) as NUMEROVALE from vale_emision ;` 
    pool.getConnection( (err, connection) => {
        connection.query(query, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({numeroOc:rows})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })

  /* Complete Vale */
  socket.on('completSelectUpdate', (id,callback) => {
    let query = `select * from vale_emision where COD_VALE = '${id}';` 
    let query1 = `SELECT producto_vale_emision.PRECIO, producto_vale_emision.CANTIDAD_SOLICITADA, producto_vale_emision.OBSERVACIONES, producto_vale_emision.CODIGO_PRODUCTO, producto_vale_emision.ID, producto.DESCRIPCION, producto.STOCK_ACTUAL FROM producto_vale_emision, producto WHERE producto.CODIGO_PRODUCTO = producto_vale_emision.CODIGO_PRODUCTO and producto_vale_emision.CODIGO_VALE = '${id}';`
    pool.getConnection( (err, connection) => {
        connection.query(query+query1, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({vale:rows[0],valepro:rows[1]})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })

  /* Agregar Vale */
  socket.on('addVale', (data,token,callback) => {
    let user = decodeToken(token)
    let query = `INSERT INTO vale_emision (EMPLEADO,DEPARTAMENTO,FECHA,CODIGO_PROYECTO,CODIGO_USUARIO,ESTADO,FECHA_REALIZACION,FECHA_TERMINO) VALUES ('${data.empleado}','${data.departamento}','${data.fechaEntrega}','${data.rochaProyecto}','1','PENDIENTE','${data.fechaEntrega}','${data.fechaRealizacion}');`
    let query1 = ``
      pool.getConnection( (err, connection) => {
        connection.beginTransaction(function(err) {
          if (err) { throw err }
          connection.query(query, function (error, results, fields) {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
            let vale = results.insertId
            data.valeCodigo.map( (cod,i) => {
              query1 += `INSERT INTO producto_vale_emision(CODIGO_VALE,CODIGO_PRODUCTO,CANTIDAD_SOLICITADA,OBSERVACIONES,PRECIO) VALUES('${results.insertId}','${cod}','${data.valeCantidad[i]}','${data.valeObservaciones[i]}','${data.valePreciol[i]}');`
            })

            connection.query(query1, function (error, results, fields) {
              if (error) {
                return connection.rollback(function() {
                  throw error;
                  
                });
              }

              connection.commit(function(err) {
                if (err) {
                  return connection.rollback(function() {
                    throw err;
                  });
                }
                callback({mensaje:`Se ingreso Vale ${vale}`})
              })
            })
          }) 
        })  
      })
    })

  /* editar Vale */
  socket.on('updateVale', (data,id,token,callback) => {
    let user = decodeToken(token)
    let query = `UPDATE vale_emision set CODIGO_PROYECTO = '${data.rochaProyecto}', FECHA = '${data.fechaRealizacion}',FECHA_TERMINO = '${data.fechaEntrega}',DEPARTAMENTO = '${data.departamento}', EMPLEADO = '${data.empleado}' WHERE COD_VALE = '${id}' ;`
    query += `DELETE FROM producto_vale_emision WHERE CODIGO_VALE = '${id}';`
    let query1 = ``
      pool.getConnection( (err, connection) => {
        connection.beginTransaction(function(err) {
          if (err) { throw err }
          connection.query(query, function (error, results, fields) {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }

            let vale = id
            data.valeCodigo.map( (cod,i) => {
              query1 += `INSERT INTO producto_vale_emision(CODIGO_VALE,CODIGO_PRODUCTO,CANTIDAD_SOLICITADA,OBSERVACIONES,PRECIO) VALUES('${id}','${cod}','${data.valeCantidad[i]}','${data.valeObservaciones[i]}','${data.valePreciol[i]}');`
            })


            connection.query(query1, function (error, results, fields) {
              if (error) {
                return connection.rollback(function() {
                  throw error;
                });
              }

              connection.commit(function(err) {
                if (err) {
                  return connection.rollback(function() {
                    throw err;
                  });
                }
                callback({mensaje:`Se actualizo OC ${vale}`})
              })
            })
          }) 
        })  
      })
    })


})

}