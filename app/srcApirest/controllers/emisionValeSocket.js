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
    let query = `select * from orden_de_compra where CODIGO_OC = '${id}';` 
    let query1 = `select  sub_servicio.CODIGO_SUBSERVICIO, servicio.CODIGO_PROYECTO, sub_servicio.SUB_DESCRIPCION from sub_servicio, servicio where sub_servicio.SUB_CODIGO_SERVICIO =  servicio.CODIGO_SERVICIO and (sub_servicio.SUB_ESTADO NOT IN('Emitido','OK','Nulo')  or SUB_OC = '${id}') and  sub_servicio.SUB_NOMBRE_SERVICIO  = 'Adquisiciones';` 
    let query2 = `SELECT * FROM oc_proveedor WHERE CODIGO_OC = '${id}';`
    let query3 = `select servicio.CODIGO_PROYECTO, sub_servicio.CODIGO_SUBSERVICIO, sub_servicio.SUB_DESCRIPCION from sub_servicio, servicio  where sub_servicio.SUB_CODIGO_SERVICIO =  servicio.CODIGO_SERVICIO and SUB_OC = '${id}' ;`
    let query4 = `select producto.UNIDAD_DE_MEDIDA,oc_producto.DIFERENCIA,oc_producto.CANTIDAD_RECIBIDA,oc_producto.PRECIO_UNITARIO,oc_producto.ID, oc_producto.PRECIO_LISTA,producto.STOCK_ACTUAL, oc_producto.OBSERVACION, producto.DESCRIPCION,oc_producto.ROCHA,producto.CODIGO_PRODUCTO, oc_producto.TOTAL, oc_producto.DESCUENTO, oc_producto.CANTIDAD, oc_producto.PRECIO_BODEGA from orden_de_compra, oc_producto, producto where producto.CODIGO_PRODUCTO = oc_producto.CODIGO_PRODUCTO AND oc_producto.CODIGO_OC = orden_de_compra.CODIGO_OC AND orden_de_compra.CODIGO_OC  = '${id}';`
    pool.getConnection( (err, connection) => {
        connection.query(query+query1+query2+query3+query4, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({oc:rows[0],sub:rows[1],pro:rows[2],suboc:rows[3],ocp:rows[4]})
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
  socket.on('updateOc', (data,id,token,callback) => {
    let user = decodeToken(token)
    let query = `UPDATE orden_de_compra set ROCHA_PROYECTO = '${data.rochaProyecto}', FECHA_REALIZACION = '${data.fechaRealizacion}',FECHA_ENTREGA = '${data.fechaEntrega}',CONDICION_PAGO = '${data.condicionPago}',TOTAL = '${data.total}',OBSERVACION = '${data.observaciones}' ,DESPACHAR_RUT = '${data.despacharRut}',CODIGO_USUARIO = '1',DESCUENTO_OC = '${data.descuentoOc}',SUB_TOTAL = '${data.subTotal}',TIPO_IVA ='${data.tipoIva}',IVA = '${data.iva}',NETO = '${data.neto}' ,NOMBRE_PROVEEDOR = '${data.nombreProveedor}' ,DESPACHAR_NOMBRE = '${data.despacharNombre}' ,DESPACHAR_DIRECCION = '${data.despacharDireccion}',DESPACHAR_COMUNA = '${data.despacharComuna}',DESPACHAR_TELEFONO = '${data.despacharTelefono}',DESCUENTO_2 = '${data.descuento2}',EMPRESA = '${data.empresa}' ,RECLAMO = '${data.reclamo}' WHERE CODIGO_OC = '${id}' ;`
    query += `DELETE FROM oc_producto WHERE CODIGO_OC = '${id}';`
    query += `DELETE FROM oc_proveedor WHERE CODIGO_OC = '${id}';`
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
            let oc = id

            query1 += `UPDATE sub_servicio SET SUB_ESTADO = 'En Proceso' WHERE SUB_OC = '${id}';`
            data.subActividad.map( (sub,i) => {
              query1 += `UPDATE sub_servicio SET SUB_ESTADO = 'Emitido', SUB_TIPO_SERVICIO = 'oc', SUB_OC = '${id}' WHERE CODIGO_SUBSERVICIO = '${sub}';`
            })

            data.ocpCodigo.map( (cod,i) => {
              query1 += `INSERT INTO oc_producto(CODIGO_PRODUCTO,DESCUENTO,ROCHA,TOTAL,CODIGO_OC,CANTIDAD,PRECIO_BODEGA,PRECIO_LISTA,OBSERVACION, PRECIO_UNITARIO) VALUES('${cod}','${data.ocpDescuento[i]}','${data.ocpRocha[i]}','${data.ocpTotal[i]}','${id}','${data.ocpCantidad[i]}','${data.ocpPreciob[i]}','${data.ocpPreciol[i]}','${data.ocpObservaciones[i]}','${data.ocpPreciou[i]}');`
              query1 += `UPDATE producto set PRECIO = '${data.ocpPreciou[i]}',PRECIO_SIN_DESCUENTO = '${data.ocpPreciol[i]}' where CODIGO_PRODUCTO ='${cod}';`
            })
            
            query1 += `INSERT INTO oc_proveedor(CODIGO_PROVEEDOR,CODIGO_OC) VALUES ('${data.rutProveedor}','${id}')`

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
                callback({mensaje:`Se actualizo OC ${oc}`})
              })
            })
          }) 
        })  
      })
    })


})

}