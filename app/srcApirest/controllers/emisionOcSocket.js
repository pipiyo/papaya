const pool = require('../models/connection')
const decodeToken = require('./decodeToken')

module.exports = (io) => {

  io
  .of('/emisionOc')
  .on('connection', (socket) => {

  /* Complete Oc */
  socket.on('completSelect', (callback) => {
    let query = `select max(CODIGO_OC + 1) as NUMEROOC from orden_de_compra ;` 
    let query1 = `select servicio.CODIGO_PROYECTO, sub_servicio.CODIGO_SUBSERVICIO, sub_servicio.SUB_DESCRIPCION from sub_servicio, servicio where sub_servicio.SUB_CODIGO_SERVICIO =  servicio.CODIGO_SERVICIO and sub_servicio.SUB_ESTADO = 'En Proceso' and sub_servicio.SUB_NOMBRE_SERVICIO  = 'Adquisiciones';`   
    pool.getConnection( (err, connection) => {
        connection.query(query+query1, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({numeroOc:rows[0],sub:rows[1]})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })

  /* Agregar OC */
  socket.on('addOc', (data,token,callback) => {
    let user = decodeToken(token)
    let query = `INSERT INTO orden_de_compra (ROCHA_PROYECTO,FECHA_REALIZACION,FECHA_ENTREGA,CONDICION_PAGO,TOTAL,OBSERVACION,DESPACHAR_RUT,CODIGO_USUARIO,ESTADO,DESCUENTO_OC,SUB_TOTAL,TIPO_IVA,IVA,NETO,NOMBRE_PROVEEDOR,DESPACHAR_NOMBRE,DESPACHAR_DIRECCION,DESPACHAR_COMUNA,DESPACHAR_TELEFONO,DESCUENTO_2,EMPRESA,RECLAMO) VALUES ('${data.rochaProyecto}','${data.fechaRealizacion}','${data.fechaEntrega}','${data.condicionPago}','${data.total}','${data.observaciones}','${data.despacharRut}','1','Pendiente','${data.descuentoOc}','${data.subTotal}','${data.tipoIva}',${data.iva},${data.neto},'${data.nombreProveedor}','${data.despacharNombre}','${data.despacharDireccion}','${data.despacharComuna}','${data.despacharTelefono}','${data.descuento2}','${data.empresa}','${data.reclamo}');`
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
            let oc = results.insertId
            data.subActividad.map( (sub,i) => {
              query1 += `UPDATE sub_servicio SET SUB_ESTADO = 'Emitido', SUB_TIPO_SERVICIO = 'oc', SUB_OC = '${results.insertId}' WHERE CODIGO_SUBSERVICIO = '${sub}';`
            })
            data.ocpCodigo.map( (cod,i) => {
              query1 += `INSERT INTO oc_producto(CODIGO_PRODUCTO,DESCUENTO,ROCHA,TOTAL,CODIGO_OC,CANTIDAD,PRECIO_BODEGA,PRECIO_LISTA,OBSERVACION, PRECIO_UNITARIO) VALUES('${cod}','${data.ocpDescuento[i]}','${data.ocpRocha[i]}','${data.ocpTotal[i]}','${results.insertId}','${data.ocpCantidad[i]}','${data.ocpPreciob[i]}','${data.ocpPreciol[i]}','${data.ocpObservaciones[i]}','${data.ocpPreciou[i]}');`
              query1 += `UPDATE producto set PRECIO = '${data.ocpPreciou[i]}',PRECIO_SIN_DESCUENTO = '${data.ocpPreciol[i]}' where CODIGO_PRODUCTO ='${cod}';`
            })

            query1 += `INSERT INTO oc_proveedor(CODIGO_PROVEEDOR,CODIGO_OC) VALUES ('${data.rutProveedor}','${results.insertId}')`

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
                callback({mensaje:`Se ingreso OC ${oc}`})
              })
            })
          }) 
        })  
      })
    })


})

}