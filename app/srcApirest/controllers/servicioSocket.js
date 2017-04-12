const pool = require('../models/connection')
const Notification = require('../models/notification')
const decodeToken = require('./decodeToken')
const notificationInsert = require('../inserts/notificationInsert')

module.exports = (io) => {

  io
  .of('/servicio')
  .on('connection', (socket) => {

  /* Trae Detalle Form ingreso servicio */
  socket.on('formingresoservicio', (callback) => {

    pool.getConnection( (err, connection) => {
          connection.query('select `CODIGO_COMUNA` AS codigo, `NOMBRE_COMUNA` AS nombre from `comunas` ORDER BY `NOMBRE_COMUNA` ASC; select `ID` AS id, `PATENTE` AS patente FROM `vehiculo` ORDER BY `PATENTE` ASC', (err, rows, fields) => {
            connection.release()
            if (err) console.log( err ) 
            callback( rows[0], rows[1] )
          })
    })

  })


  /* Ingreso Servicio */
  socket.on('addServicio', (data, token) => {

    let user = decodeToken(token)

    let servicio = {  
                      NOMBRE_SERVICIO: data.area, 
                      CATEGORIA: data.categoria, 
                      SUPERVISOR: data.supervisor,
                      FECHA_INICIO: data.fechaInicio,
                      FECHA_ENTREGA: data.fechaEntrega,
                      DESCRIPCION: data.descripcion,
                      OBSERVACIONES: data.observacion,
                      CODIGO_PROYECTO : data.rocha,
                      DIRECCION : data.direccion,
                      GUIA_DESPACHO: data.guia,
                      CODIGO_COMUNA: data.comuna,
                      M3: data.m3,
                      FI: data.fi,
                      TM: data.tm,
                      TP: data.to,
                      OS: data.os,
                      FECHA_PRIMERA_ENTREGA: data.fechaEntrega,
                      LIDER: data.lider,
                      PUESTOS: data.puestos,
                      PROCESO: data.proceso,    
                      INSTALADOR_1: data.instalador1,
                      INSTALADOR_2: data.instalador2,
                      INSTALADOR_3: data.instalador3,
                      EJECUTOR: data.ejecutor,
                      VALE: data.vale, 
                      TRANSPORTE: data.vehiculo,    
                      CANTIDAD: data.cantidad,
                      RECLAMOS: data.reclamo,
                      ESTADO: "EN PROCESO",
                      DIAS: data.dias,
                      REALIZADOR: user.name
                    }

    let okAddServicio = '(Se ingreso servicio ' + data.area + ')'

      pool.getConnection( (err, connection) => {
        connection.query('INSERT INTO `servicio` SET ?',servicio, (err, row) => {
          connection.release()
          if (!err) {

            if(data.checkMetales != ""){
              let subServicio = { SUB_CODIGO_SERVICIO:row.insertId, SUB_NOMBRE_SERVICIO:data.area, SUB_CATEGORIA:data.categoria, SUB_SUPERVISOR:data.supervisor, SUB_FECHA_INICIO:data.fechaInicio, SUB_FECHA_ENTREGA:data.fechaMetales, SUB_DESCRIPCION:"Comprar Metales", SUB_OBSERVACIONES:data.observacion, SUB_CODIGO_PROYECTO:data.rocha, SUB_DIRECCION:data.direccion, SUB_GUIA_DESPACHO:data.guia, SUB_CODIGO_COMUNA:data.comuna, SUB_M3:data.m3, SUB_FI:data.fi, SUB_TM:data.tm, SUB_TP:data.to, SUB_OS:data.os, SUB_LIDER:data.lider, SUB_PUESTOS:data.puestos, SUB_PROCESO:data.proceso, SUB_INSTALADOR_1:data.instalador1, SUB_INSTALADOR_2:data.instalador2, SUB_INSTALADOR_3:data.instalador3, SUB_EJECUTOR:data.ejecutor, SUB_VALE:data.vale, SUB_TRANSPORTE:data.vehiculo, SUB_CANTIDAD:data.cantidad, SUB_ESTADO:"En Proceso", SUB_DIAS:data.dias, SUB_REALIZADOR:user.name}
              pool.getConnection( (err, connection) => {
              connection.query('INSERT INTO `sub_servicio` SET ?',subServicio, (errs) => {
                    connection.release()
                    if (errs){
                      console.log('Error no se pudo ingresar sub-servicio '+ errs)
                    } 
                })
              })
            }
            if(data.checkMuebles != ""){
              let subServicio = { SUB_CODIGO_SERVICIO:row.insertId, SUB_NOMBRE_SERVICIO:data.area, SUB_CATEGORIA:data.categoria, SUB_SUPERVISOR:data.supervisor, SUB_FECHA_INICIO:data.fechaInicio, SUB_FECHA_ENTREGA:data.fechaMuebles, SUB_DESCRIPCION:"Comprar Muebles", SUB_OBSERVACIONES:data.observacion, SUB_CODIGO_PROYECTO:data.rocha, SUB_DIRECCION:data.direccion, SUB_GUIA_DESPACHO:data.guia, SUB_CODIGO_COMUNA:data.comuna, SUB_M3:data.m3, SUB_FI:data.fi, SUB_TM:data.tm, SUB_TP:data.to, SUB_OS:data.os, SUB_LIDER:data.lider, SUB_PUESTOS:data.puestos, SUB_PROCESO:data.proceso, SUB_INSTALADOR_1:data.instalador1, SUB_INSTALADOR_2:data.instalador2, SUB_INSTALADOR_3:data.instalador3, SUB_EJECUTOR:data.ejecutor, SUB_VALE:data.vale, SUB_TRANSPORTE:data.vehiculo, SUB_CANTIDAD:data.cantidad, SUB_ESTADO:"En Proceso", SUB_DIAS:data.dias, SUB_REALIZADOR:user.name}
              pool.getConnection( (err, connection) => {
              connection.query('INSERT INTO `sub_servicio` SET ?',subServicio, (errs) => {
                    connection.release()
                    if (errs){
                      console.log('Error no se pudo ingresar sub-servicio '+ errs)
                    } 
                })
              })
            }
            if(data.checkEspeciales != ""){
              let subServicio = { SUB_CODIGO_SERVICIO:row.insertId, SUB_NOMBRE_SERVICIO:data.area, SUB_CATEGORIA:data.categoria, SUB_SUPERVISOR:data.supervisor, SUB_FECHA_INICIO:data.fechaInicio, SUB_FECHA_ENTREGA:data.fechaEspeciales, SUB_DESCRIPCION:"Comprar Especiales", SUB_OBSERVACIONES:data.observacion, SUB_CODIGO_PROYECTO:data.rocha, SUB_DIRECCION:data.direccion, SUB_GUIA_DESPACHO:data.guia, SUB_CODIGO_COMUNA:data.comuna, SUB_M3:data.m3, SUB_FI:data.fi, SUB_TM:data.tm, SUB_TP:data.to, SUB_OS:data.os, SUB_LIDER:data.lider, SUB_PUESTOS:data.puestos, SUB_PROCESO:data.proceso, SUB_INSTALADOR_1:data.instalador1, SUB_INSTALADOR_2:data.instalador2, SUB_INSTALADOR_3:data.instalador3, SUB_EJECUTOR:data.ejecutor, SUB_VALE:data.vale, SUB_TRANSPORTE:data.vehiculo, SUB_CANTIDAD:data.cantidad, SUB_ESTADO:"En Proceso", SUB_DIAS:data.dias, SUB_REALIZADOR:user.name}
              pool.getConnection( (err, connection) => {
              connection.query('INSERT INTO `sub_servicio` SET ?',subServicio, (errs) => {
                    connection.release()
                    if (errs){
                      console.log('Error no se pudo ingresar sub-servicio '+ errs)
                    } 
                })
              })
            }
            if(data.checkSillas != ""){
              let subServicio = { SUB_CODIGO_SERVICIO:row.insertId, SUB_NOMBRE_SERVICIO:data.area, SUB_CATEGORIA:data.categoria, SUB_SUPERVISOR:data.supervisor, SUB_FECHA_INICIO:data.fechaInicio, SUB_FECHA_ENTREGA:data.fechaSillas, SUB_DESCRIPCION:"Comprar Sillas", SUB_OBSERVACIONES:data.observacion, SUB_CODIGO_PROYECTO:data.rocha, SUB_DIRECCION:data.direccion, SUB_GUIA_DESPACHO:data.guia, SUB_CODIGO_COMUNA:data.comuna, SUB_M3:data.m3, SUB_FI:data.fi, SUB_TM:data.tm, SUB_TP:data.to, SUB_OS:data.os, SUB_LIDER:data.lider, SUB_PUESTOS:data.puestos, SUB_PROCESO:data.proceso, SUB_INSTALADOR_1:data.instalador1, SUB_INSTALADOR_2:data.instalador2, SUB_INSTALADOR_3:data.instalador3, SUB_EJECUTOR:data.ejecutor, SUB_VALE:data.vale, SUB_TRANSPORTE:data.vehiculo, SUB_CANTIDAD:data.cantidad, SUB_ESTADO:"En Proceso", SUB_DIAS:data.dias, SUB_REALIZADOR:user.name}
              pool.getConnection( (err, connection) => {
              connection.query('INSERT INTO `sub_servicio` SET ?',subServicio, (errs) => {
                    connection.release()
                    if (errs){
                      console.log('Error no se pudo ingresar sub-servicio '+ errs)
                    } 
                })
              })
            }
            if(data.checkTela != ""){
              let subServicio = { SUB_CODIGO_SERVICIO:row.insertId, SUB_NOMBRE_SERVICIO:data.area, SUB_CATEGORIA:data.categoria, SUB_SUPERVISOR:data.supervisor, SUB_FECHA_INICIO:data.fechaInicio, SUB_FECHA_ENTREGA:data.fechaTela, SUB_DESCRIPCION:"Comprar Tela", SUB_OBSERVACIONES:data.observacion, SUB_CODIGO_PROYECTO:data.rocha, SUB_DIRECCION:data.direccion, SUB_GUIA_DESPACHO:data.guia, SUB_CODIGO_COMUNA:data.comuna, SUB_M3:data.m3, SUB_FI:data.fi, SUB_TM:data.tm, SUB_TP:data.to, SUB_OS:data.os, SUB_LIDER:data.lider, SUB_PUESTOS:data.puestos, SUB_PROCESO:data.proceso, SUB_INSTALADOR_1:data.instalador1, SUB_INSTALADOR_2:data.instalador2, SUB_INSTALADOR_3:data.instalador3, SUB_EJECUTOR:data.ejecutor, SUB_VALE:data.vale, SUB_TRANSPORTE:data.vehiculo, SUB_CANTIDAD:data.cantidad, SUB_ESTADO:"En Proceso", SUB_DIAS:data.dias, SUB_REALIZADOR:user.name}
              pool.getConnection( (err, connection) => {
              connection.query('INSERT INTO `sub_servicio` SET ?',subServicio, (errs) => {
                    connection.release()
                    if (errs){
                      console.log('Error no se pudo ingresar sub-servicio '+ errs)
                    } 
                })
              })
            }
            if(data.checkVidrio != ""){
              let subServicio = { SUB_CODIGO_SERVICIO:row.insertId, SUB_NOMBRE_SERVICIO:data.area, SUB_CATEGORIA:data.categoria, SUB_SUPERVISOR:data.supervisor, SUB_FECHA_INICIO:data.fechaInicio, SUB_FECHA_ENTREGA:data.fechaVidrio, SUB_DESCRIPCION:"Comprar Vidrio", SUB_OBSERVACIONES:data.observacion, SUB_CODIGO_PROYECTO:data.rocha, SUB_DIRECCION:data.direccion, SUB_GUIA_DESPACHO:data.guia, SUB_CODIGO_COMUNA:data.comuna, SUB_M3:data.m3, SUB_FI:data.fi, SUB_TM:data.tm, SUB_TP:data.to, SUB_OS:data.os, SUB_LIDER:data.lider, SUB_PUESTOS:data.puestos, SUB_PROCESO:data.proceso, SUB_INSTALADOR_1:data.instalador1, SUB_INSTALADOR_2:data.instalador2, SUB_INSTALADOR_3:data.instalador3, SUB_EJECUTOR:data.ejecutor, SUB_VALE:data.vale, SUB_TRANSPORTE:data.vehiculo, SUB_CANTIDAD:data.cantidad, SUB_ESTADO:"En Proceso", SUB_DIAS:data.dias, SUB_REALIZADOR:user.name}
              pool.getConnection( (err, connection) => {
              connection.query('INSERT INTO `sub_servicio` SET ?',subServicio, (errs) => {
                    connection.release()
                    if (errs){
                      console.log('Error no se pudo ingresar sub-servicio '+ errs)
                    } 
                })
              })
            }
            if(data.checkInsumo != ""){
              let subServicio = { SUB_CODIGO_SERVICIO:row.insertId, SUB_NOMBRE_SERVICIO:data.area, SUB_CATEGORIA:data.categoria, SUB_SUPERVISOR:data.supervisor, SUB_FECHA_INICIO:data.fechaInicio, SUB_FECHA_ENTREGA:data.fechaInsumo, SUB_DESCRIPCION:"Comprar Insumo", SUB_OBSERVACIONES:data.observacion, SUB_CODIGO_PROYECTO:data.rocha, SUB_DIRECCION:data.direccion, SUB_GUIA_DESPACHO:data.guia, SUB_CODIGO_COMUNA:data.comuna, SUB_M3:data.m3, SUB_FI:data.fi, SUB_TM:data.tm, SUB_TP:data.to, SUB_OS:data.os, SUB_LIDER:data.lider, SUB_PUESTOS:data.puestos, SUB_PROCESO:data.proceso, SUB_INSTALADOR_1:data.instalador1, SUB_INSTALADOR_2:data.instalador2, SUB_INSTALADOR_3:data.instalador3, SUB_EJECUTOR:data.ejecutor, SUB_VALE:data.vale, SUB_TRANSPORTE:data.vehiculo, SUB_CANTIDAD:data.cantidad, SUB_ESTADO:"En Proceso", SUB_DIAS:data.dias, SUB_REALIZADOR:user.name}
              pool.getConnection( (err, connection) => {
              connection.query('INSERT INTO `sub_servicio` SET ?',subServicio, (errs) => {
                    connection.release()
                    if (errs){
                      console.log('Error no se pudo ingresar sub-servicio '+ errs)
                    } 
                })
              }) 
            }
            if(data.checkImportado != ""){
              let subServicio = { SUB_CODIGO_SERVICIO:row.insertId, SUB_NOMBRE_SERVICIO:data.area, SUB_CATEGORIA:data.categoria, SUB_SUPERVISOR:data.supervisor, SUB_FECHA_INICIO:data.fechaInicio, SUB_FECHA_ENTREGA:data.fechaImportado, SUB_DESCRIPCION:"Comprar Importado", SUB_OBSERVACIONES:data.observacion, SUB_CODIGO_PROYECTO:data.rocha, SUB_DIRECCION:data.direccion, SUB_GUIA_DESPACHO:data.guia, SUB_CODIGO_COMUNA:data.comuna, SUB_M3:data.m3, SUB_FI:data.fi, SUB_TM:data.tm, SUB_TP:data.to, SUB_OS:data.os, SUB_LIDER:data.lider, SUB_PUESTOS:data.puestos, SUB_PROCESO:data.proceso, SUB_INSTALADOR_1:data.instalador1, SUB_INSTALADOR_2:data.instalador2, SUB_INSTALADOR_3:data.instalador3, SUB_EJECUTOR:data.ejecutor, SUB_VALE:data.vale, SUB_TRANSPORTE:data.vehiculo, SUB_CANTIDAD:data.cantidad, SUB_ESTADO:"En Proceso", SUB_DIAS:data.dias, SUB_REALIZADOR:user.name}
              pool.getConnection( (err, connection) => {
              connection.query('INSERT INTO `sub_servicio` SET ?',subServicio, (errs) => {
                    connection.release()
                    if (errs){
                      console.log('Error no se pudo ingresar sub-servicio '+ errs)
                    } 
                })
              })
            }



            let notification = new Notification({
                                                 slug: `detalle-actividad/${row.insertId}`,
                                                 asset: {
                                                   tipo: 'servicio',
                                                   rocha: data.rocha,
                                                   codigo: row.insertId,
                                                   categoria: data.categoria
                                                 } 
                                               })

            notificationInsert(notification, data.area)

          } else {
            console.log('Error no se pudo ingresar servicio '+ err)
          }
        })
      })


    socket.emit('okAddServicio', okAddServicio)
  })


  /* Update Servicio */
  socket.on('updateServicio', (data,token) => {
    let user = decodeToken(token)
    let okUpdateServicio = '(Se actualizo servicio ' + data.numero + ')'
    


    pool.getConnection( (err, connection) => {
        connection.query('UPDATE servicio SET CATEGORIA = ?, SUPERVISOR = ?, FECHA_INICIO = ?, FECHA_ENTREGA = ?, DESCRIPCION = ?, OBSERVACIONES = ?, DIRECCION  = ?, GUIA_DESPACHO = ?, CODIGO_COMUNA = ?, M3 = ?, FI = ?, TM = ?, TP = ?, OS = ?, LIDER = ?, PUESTOS = ?, PROCESO = ?, INSTALADOR_1 = ?, INSTALADOR_2 = ?, INSTALADOR_3 = ?, EJECUTOR = ?, VALE = ?, TRANSPORTE = ?, CANTIDAD = ?, RECLAMOS = ?, ESTADO = ?, DIAS = ?  WHERE CODIGO_SERVICIO = ?', [data.categoria, data.supervisor, data.fechaInicio, data.fechaEntrega, data.descripcion, data.observacion, data.direccion, data.guia, data.comuna, data.m3, data.fi, data.tm, data.to, data.os, data.lider, data.puestos, data.proceso, data.instalador1, data.instalador2, data.instalador3, data.ejecutor, data.vale, data.vehiculo, data.cantidad, data.reclamo, data.estado, data.dias, data.numero], (err, results) => {
            connection.release()
            if (!err){
              if(data.checkMetales != ""){
                let subServicio = { SUB_CODIGO_SERVICIO:data.numero, SUB_NOMBRE_SERVICIO:data.area, SUB_CATEGORIA:data.categoria, SUB_SUPERVISOR:data.supervisor, SUB_FECHA_INICIO:data.fechaInicio, SUB_FECHA_ENTREGA:data.fechaMetales, SUB_DESCRIPCION:"Comprar Metales", SUB_OBSERVACIONES:data.observacion, SUB_CODIGO_PROYECTO:data.rocha, SUB_DIRECCION:data.direccion, SUB_GUIA_DESPACHO:data.guia, SUB_CODIGO_COMUNA:data.comuna, SUB_M3:data.m3, SUB_FI:data.fi, SUB_TM:data.tm, SUB_TP:data.to, SUB_OS:data.os, SUB_LIDER:data.lider, SUB_PUESTOS:data.puestos, SUB_PROCESO:data.proceso, SUB_INSTALADOR_1:data.instalador1, SUB_INSTALADOR_2:data.instalador2, SUB_INSTALADOR_3:data.instalador3, SUB_EJECUTOR:data.ejecutor, SUB_VALE:data.vale, SUB_TRANSPORTE:data.vehiculo, SUB_CANTIDAD:data.cantidad, SUB_ESTADO:"En Proceso", SUB_DIAS:data.dias, SUB_REALIZADOR:user.name}
                pool.getConnection( (err, connection) => {
                connection.query('INSERT INTO `sub_servicio` SET ?',subServicio, (errs) => {
                      connection.release()
                      if (errs){
                        console.log('Error no se pudo ingresar sub-servicio '+ errs)
                      } 
                  })
                })
              }
              if(data.checkMuebles != ""){
                let subServicio = { SUB_CODIGO_SERVICIO:data.numero, SUB_NOMBRE_SERVICIO:data.area, SUB_CATEGORIA:data.categoria, SUB_SUPERVISOR:data.supervisor, SUB_FECHA_INICIO:data.fechaInicio, SUB_FECHA_ENTREGA:data.fechaMuebles, SUB_DESCRIPCION:"Comprar Muebles", SUB_OBSERVACIONES:data.observacion, SUB_CODIGO_PROYECTO:data.rocha, SUB_DIRECCION:data.direccion, SUB_GUIA_DESPACHO:data.guia, SUB_CODIGO_COMUNA:data.comuna, SUB_M3:data.m3, SUB_FI:data.fi, SUB_TM:data.tm, SUB_TP:data.to, SUB_OS:data.os, SUB_LIDER:data.lider, SUB_PUESTOS:data.puestos, SUB_PROCESO:data.proceso, SUB_INSTALADOR_1:data.instalador1, SUB_INSTALADOR_2:data.instalador2, SUB_INSTALADOR_3:data.instalador3, SUB_EJECUTOR:data.ejecutor, SUB_VALE:data.vale, SUB_TRANSPORTE:data.vehiculo, SUB_CANTIDAD:data.cantidad, SUB_ESTADO:"En Proceso", SUB_DIAS:data.dias, SUB_REALIZADOR:user.name}
                pool.getConnection( (err, connection) => {
                connection.query('INSERT INTO `sub_servicio` SET ?',subServicio, (errs) => {
                      connection.release()
                      if (errs){
                        console.log('Error no se pudo ingresar sub-servicio '+ errs)
                      } 
                  })
                })
              }
              if(data.checkEspeciales != ""){
                let subServicio = { SUB_CODIGO_SERVICIO:data.numero, SUB_NOMBRE_SERVICIO:data.area, SUB_CATEGORIA:data.categoria, SUB_SUPERVISOR:data.supervisor, SUB_FECHA_INICIO:data.fechaInicio, SUB_FECHA_ENTREGA:data.fechaEspeciales, SUB_DESCRIPCION:"Comprar Especiales", SUB_OBSERVACIONES:data.observacion, SUB_CODIGO_PROYECTO:data.rocha, SUB_DIRECCION:data.direccion, SUB_GUIA_DESPACHO:data.guia, SUB_CODIGO_COMUNA:data.comuna, SUB_M3:data.m3, SUB_FI:data.fi, SUB_TM:data.tm, SUB_TP:data.to, SUB_OS:data.os, SUB_LIDER:data.lider, SUB_PUESTOS:data.puestos, SUB_PROCESO:data.proceso, SUB_INSTALADOR_1:data.instalador1, SUB_INSTALADOR_2:data.instalador2, SUB_INSTALADOR_3:data.instalador3, SUB_EJECUTOR:data.ejecutor, SUB_VALE:data.vale, SUB_TRANSPORTE:data.vehiculo, SUB_CANTIDAD:data.cantidad, SUB_ESTADO:"En Proceso", SUB_DIAS:data.dias, SUB_REALIZADOR:user.name}
                pool.getConnection( (err, connection) => {
                connection.query('INSERT INTO `sub_servicio` SET ?',subServicio, (errs) => {
                      connection.release()
                      if (errs){
                        console.log('Error no se pudo ingresar sub-servicio '+ errs)
                      } 
                  })
                })
              }
              if(data.checkSillas != ""){
                let subServicio = { SUB_CODIGO_SERVICIO:data.numero, SUB_NOMBRE_SERVICIO:data.area, SUB_CATEGORIA:data.categoria, SUB_SUPERVISOR:data.supervisor, SUB_FECHA_INICIO:data.fechaInicio, SUB_FECHA_ENTREGA:data.fechaSillas, SUB_DESCRIPCION:"Comprar Sillas", SUB_OBSERVACIONES:data.observacion, SUB_CODIGO_PROYECTO:data.rocha, SUB_DIRECCION:data.direccion, SUB_GUIA_DESPACHO:data.guia, SUB_CODIGO_COMUNA:data.comuna, SUB_M3:data.m3, SUB_FI:data.fi, SUB_TM:data.tm, SUB_TP:data.to, SUB_OS:data.os, SUB_LIDER:data.lider, SUB_PUESTOS:data.puestos, SUB_PROCESO:data.proceso, SUB_INSTALADOR_1:data.instalador1, SUB_INSTALADOR_2:data.instalador2, SUB_INSTALADOR_3:data.instalador3, SUB_EJECUTOR:data.ejecutor, SUB_VALE:data.vale, SUB_TRANSPORTE:data.vehiculo, SUB_CANTIDAD:data.cantidad, SUB_ESTADO:"En Proceso", SUB_DIAS:data.dias, SUB_REALIZADOR:user.name}
                pool.getConnection( (err, connection) => {
                connection.query('INSERT INTO `sub_servicio` SET ?',subServicio, (errs) => {
                      connection.release()
                      if (errs){
                        console.log('Error no se pudo ingresar sub-servicio '+ errs)
                      } 
                  })
                })
              }
              if(data.checkTela != ""){
                let subServicio = { SUB_CODIGO_SERVICIO:data.numero, SUB_NOMBRE_SERVICIO:data.area, SUB_CATEGORIA:data.categoria, SUB_SUPERVISOR:data.supervisor, SUB_FECHA_INICIO:data.fechaInicio, SUB_FECHA_ENTREGA:data.fechaTela, SUB_DESCRIPCION:"Comprar Tela", SUB_OBSERVACIONES:data.observacion, SUB_CODIGO_PROYECTO:data.rocha, SUB_DIRECCION:data.direccion, SUB_GUIA_DESPACHO:data.guia, SUB_CODIGO_COMUNA:data.comuna, SUB_M3:data.m3, SUB_FI:data.fi, SUB_TM:data.tm, SUB_TP:data.to, SUB_OS:data.os, SUB_LIDER:data.lider, SUB_PUESTOS:data.puestos, SUB_PROCESO:data.proceso, SUB_INSTALADOR_1:data.instalador1, SUB_INSTALADOR_2:data.instalador2, SUB_INSTALADOR_3:data.instalador3, SUB_EJECUTOR:data.ejecutor, SUB_VALE:data.vale, SUB_TRANSPORTE:data.vehiculo, SUB_CANTIDAD:data.cantidad, SUB_ESTADO:"En Proceso", SUB_DIAS:data.dias, SUB_REALIZADOR:user.name}
                pool.getConnection( (err, connection) => {
                connection.query('INSERT INTO `sub_servicio` SET ?',subServicio, (errs) => {
                      connection.release()
                      if (errs){
                        console.log('Error no se pudo ingresar sub-servicio '+ errs)
                      } 
                  })
                })
              }
              if(data.checkVidrio != ""){
                let subServicio = { SUB_CODIGO_SERVICIO:data.numero, SUB_NOMBRE_SERVICIO:data.area, SUB_CATEGORIA:data.categoria, SUB_SUPERVISOR:data.supervisor, SUB_FECHA_INICIO:data.fechaInicio, SUB_FECHA_ENTREGA:data.fechaVidrio, SUB_DESCRIPCION:"Comprar Vidrio", SUB_OBSERVACIONES:data.observacion, SUB_CODIGO_PROYECTO:data.rocha, SUB_DIRECCION:data.direccion, SUB_GUIA_DESPACHO:data.guia, SUB_CODIGO_COMUNA:data.comuna, SUB_M3:data.m3, SUB_FI:data.fi, SUB_TM:data.tm, SUB_TP:data.to, SUB_OS:data.os, SUB_LIDER:data.lider, SUB_PUESTOS:data.puestos, SUB_PROCESO:data.proceso, SUB_INSTALADOR_1:data.instalador1, SUB_INSTALADOR_2:data.instalador2, SUB_INSTALADOR_3:data.instalador3, SUB_EJECUTOR:data.ejecutor, SUB_VALE:data.vale, SUB_TRANSPORTE:data.vehiculo, SUB_CANTIDAD:data.cantidad, SUB_ESTADO:"En Proceso", SUB_DIAS:data.dias, SUB_REALIZADOR:user.name}
                pool.getConnection( (err, connection) => {
                connection.query('INSERT INTO `sub_servicio` SET ?',subServicio, (errs) => {
                      connection.release()
                      if (errs){
                        console.log('Error no se pudo ingresar sub-servicio '+ errs)
                      } 
                  })
                })
              }
              if(data.checkInsumo != ""){
                let subServicio = { SUB_CODIGO_SERVICIO:data.numero, SUB_NOMBRE_SERVICIO:data.area, SUB_CATEGORIA:data.categoria, SUB_SUPERVISOR:data.supervisor, SUB_FECHA_INICIO:data.fechaInicio, SUB_FECHA_ENTREGA:data.fechaInsumo, SUB_DESCRIPCION:"Comprar Insumo", SUB_OBSERVACIONES:data.observacion, SUB_CODIGO_PROYECTO:data.rocha, SUB_DIRECCION:data.direccion, SUB_GUIA_DESPACHO:data.guia, SUB_CODIGO_COMUNA:data.comuna, SUB_M3:data.m3, SUB_FI:data.fi, SUB_TM:data.tm, SUB_TP:data.to, SUB_OS:data.os, SUB_LIDER:data.lider, SUB_PUESTOS:data.puestos, SUB_PROCESO:data.proceso, SUB_INSTALADOR_1:data.instalador1, SUB_INSTALADOR_2:data.instalador2, SUB_INSTALADOR_3:data.instalador3, SUB_EJECUTOR:data.ejecutor, SUB_VALE:data.vale, SUB_TRANSPORTE:data.vehiculo, SUB_CANTIDAD:data.cantidad, SUB_ESTADO:"En Proceso", SUB_DIAS:data.dias, SUB_REALIZADOR:user.name}
                pool.getConnection( (err, connection) => {
                connection.query('INSERT INTO `sub_servicio` SET ?',subServicio, (errs) => {
                      connection.release()
                      if (errs){
                        console.log('Error no se pudo ingresar sub-servicio '+ errs)
                      } 
                  })
                }) 
              }
              if(data.checkImportado != ""){
                let subServicio = { SUB_CODIGO_SERVICIO:data.numero, SUB_NOMBRE_SERVICIO:data.area, SUB_CATEGORIA:data.categoria, SUB_SUPERVISOR:data.supervisor, SUB_FECHA_INICIO:data.fechaInicio, SUB_FECHA_ENTREGA:data.fechaImportado, SUB_DESCRIPCION:"Comprar Importado", SUB_OBSERVACIONES:data.observacion, SUB_CODIGO_PROYECTO:data.rocha, SUB_DIRECCION:data.direccion, SUB_GUIA_DESPACHO:data.guia, SUB_CODIGO_COMUNA:data.comuna, SUB_M3:data.m3, SUB_FI:data.fi, SUB_TM:data.tm, SUB_TP:data.to, SUB_OS:data.os, SUB_LIDER:data.lider, SUB_PUESTOS:data.puestos, SUB_PROCESO:data.proceso, SUB_INSTALADOR_1:data.instalador1, SUB_INSTALADOR_2:data.instalador2, SUB_INSTALADOR_3:data.instalador3, SUB_EJECUTOR:data.ejecutor, SUB_VALE:data.vale, SUB_TRANSPORTE:data.vehiculo, SUB_CANTIDAD:data.cantidad, SUB_ESTADO:"En Proceso", SUB_DIAS:data.dias, SUB_REALIZADOR:user.name}
                pool.getConnection( (err, connection) => {
                connection.query('INSERT INTO `sub_servicio` SET ?',subServicio, (errs) => {
                      connection.release()
                      if (errs){
                        console.log('Error no se pudo ingresar sub-servicio '+ errs)
                      } 
                  })
                })
              }
            }
            else{
              console.log('Error no se pudo ingresar servicio '+ err)
            }
        })
    })


    socket.emit('okUpdateServicio', okUpdateServicio)
  })

  /* Listar Servicio */
  socket.on('searchServicio', (id) => {
      let query = 'SELECT * FROM servicio WHERE CODIGO_SERVICIO = "'+id+'" ;' 
      let query1 = 'SELECT * FROM sub_servicio WHERE SUB_CODIGO_SERVICIO = "'+id+'" ;' 
       
      pool.getConnection( (err, connection) => {
            connection.query(query+query1, (err, rows, fields) => {
                connection.release()
                if (!err)
                  socket.emit('okSearchServicio', { servicio:rows[0],sub:rows[1]})
                else
                  console.log('Error ' + err)
            }) 
      }) 



  })

  /* Proyecto, Servicio, Sub-servicio */
  socket.on('allProyectoServicio', (data,area,callback) => {
    
    let promesa = new Promise( (resolve, reject) => {  

      let q_codigo = ""
      let q_vendedor = ""
      let q_categoria = ""
      let q_servicio = ""
      let q_cliente = ""
      let q_fecha = ""
      let q_estado = ""
      let q_area = ""

      switch (area) {
        case "abastecimiento":
            q_area = 'and NOMBRE_SERVICIO IN ("Adquisiciones")'
            break;
        case "despacho":
            q_area = 'and NOMBRE_SERVICIO IN ("Despacho")'
            break;
        case "sillas":
            q_area = 'and NOMBRE_SERVICIO IN ("Sillas")'
            break;
        case "instalación":
            q_area = 'and NOMBRE_SERVICIO IN ("Instalacion")'
            break;
        case "producción":
            q_area = 'and NOMBRE_SERVICIO IN ("Produccion")'
            break;
        case "técnica":
            q_area = 'and NOMBRE_SERVICIO IN ("Desarrollo")'
            break;
        case "técnica-especial":
            q_area = 'and NOMBRE_SERVICIO IN ("Desarrollo-especial")'
            break;
        case "planificación":
            q_area = 'and NOMBRE_SERVICIO IN ("FI","Adquisiciones","Desarrollo","Desarrollo-especial","Despacho","Instalacion","Produccion","Sillas","Planificacion")'
            break;
        case "comercial":
            q_area = 'and NOMBRE_SERVICIO IN ("Adquisiciones","Desarrollo","Despacho","Instalacion","Produccion","Sillas")'
            break;
      }

      if(data.codigo){q_codigo = ' and proyecto.CODIGO_PROYECTO like "%'+data.codigo +'%"'}
      if(data.vendedor){q_vendedor = ' and proyecto.EJECUTIVO like "%'+data.vendedor +'%"'}
      if(data.categoria){q_categoria = ' and servicio.CATEGORIA like "%'+data.categoria +'%"'}
      if(data.servicio){q_servicio = ' and servicio.NOMBRE_SERVICIO like "%'+data.servicio +'%"'}
      if(data.cliente){q_cliente = ' and proyecto.NOMBRE_CLIENTE like "%'+data.cliente +'%"'}
      if(data.fechaInicio != null && data.fechaEntrega != null){q_fecha = ' and servicio.SUB_FECHA_ENTREGA BETWEEN "'+ data.fechaInicio +'" and "'+ data.fechaEntrega +'"'}
      q_estado = ' and servicio.ESTADO = "'+data.estado+'"'

      let query = 'SELECT proyecto.CODIGO_PROYECTO , proyecto.NOMBRE_CLIENTE, proyecto.EJECUTIVO, servicio.CODIGO_SERVICIO, servicio.NOMBRE_SERVICIO, servicio.DESCRIPCION as SD ,servicio.FECHA_INICIO, servicio.FECHA_ENTREGA, servicio.OBSERVACIONES, servicio.ESTADO FROM proyecto,servicio WHERE proyecto.CODIGO_PROYECTO = servicio.CODIGO_PROYECTO'+q_estado+q_codigo+q_servicio+q_vendedor+q_categoria+q_fecha+q_area+q_cliente+' order by servicio.FECHA_ENTREGA asc limit '+data.limit +', '+data.limitB+' ;' 
      let query1 = 'SELECT count(servicio.CODIGO_SERVICIO) as total FROM proyecto,servicio WHERE proyecto.CODIGO_PROYECTO = servicio.CODIGO_PROYECTO'+q_estado+q_codigo+q_servicio+q_vendedor+q_categoria+q_fecha+q_area+q_cliente+';' 
      let query2 = 'SELECT `NOMBRES`, `APELLIDO_PATERNO`, `APELLIDO_MATERNO` FROM `empleado` where `AREA` = "COMERCIAL" order by NOMBRES;'
      pool.getConnection( (err, connection) => {
          connection.query(query+query1+query2, (err, rows, fields) => {
              connection.release()
              if (!err)
                resolve( callback({ sub:rows[0], total:rows[1], ejecutivo:rows[2]}) )
              else
                reject( console.log('Error ' + err) )
          }) 
      })
    }).catch( rason => console.log(rason) )
  })


   /* Informes */
  socket.on('viewInformes', (data, cant, estado, codigo, vendedor, categoria, fechai, cliente, fechae) => {

    let q_codigo = ""
    let q_vendedor = ""
    let q_categoria = ""
    let q_cliente = ""
    let q_fecha = ""

    if(codigo != ""){q_codigo = ' and proyecto.CODIGO_PROYECTO like "%'+codigo +'%"'}
    if(vendedor != ""){q_vendedor = ' and proyecto.EJECUTIVO like "%'+vendedor +'%"'}
    if(categoria != ""){q_categoria = ' and servicio.CATEGORIA like "%'+categoria +'%"'}
    if(cliente != ""){q_cliente = ' and proyecto.NOMBRE_CLIENTE like "%'+cliente +'%"'}
    if(fechai != "" && fechae != ""){q_fecha = ' and proyecto.FECHA_CONFIRMACION BETWEEN "'+ fechai +'" and "'+ fechae +'"'}
    if(data == "reclamo"){
      let query = 'SELECT reclamos.CODIGO_RECLAMO, servicio.RECLAMOS, reclamos.RAZON, reclamos.AREA, proyecto.CODIGO_PROYECTO,servicio.TP, servicio.TM, servicio.OS, servicio.PROCESO, servicio.FI, servicio.DESCRIPCION, servicio.SUPERVISOR, servicio.ESTADO, servicio.DIRECCION, servicio.OBSERVACIONES, servicio.FECHA_INICIO, servicio.FECHA_ENTREGA, servicio.NOMBRE_SERVICIO, servicio.CODIGO_SERVICIO,  proyecto.OBRA, proyecto.NOMBRE_CLIENTE, proyecto.EJECUTIVO , proyecto.FECHA_INGRESO, proyecto.FECHA_CONFIRMACION FROM servicio, proyecto, reclamos WHERE reclamos.ROCHA = proyecto.CODIGO_PROYECTO and proyecto.CODIGO_PROYECTO = servicio.CODIGO_PROYECTO and NOMBRE_SERVICIO IN ("Adquisiciones","Desarrollo","Despacho","Instalacion","Produccion","Sillas") and proyecto.ESTADO IN ("'+estado+'") '+q_codigo+' '+q_vendedor+' '+q_categoria+' '+q_fecha+' '+q_cliente+'  order by proyecto.FECHA_CONFIRMACION asc, proyecto.CODIGO_PROYECTO  limit '+cant +';select `NOMBRES`, `APELLIDO_PATERNO`, `APELLIDO_MATERNO` from `empleado` where `AREA` = "COMERCIAL";' 
      

      pool.getConnection( (err, connection) => {
            connection.query(query + 'select count(proyecto.CODIGO_PROYECTO) as total FROM servicio, proyecto,reclamos WHERE reclamos.ROCHA = proyecto.CODIGO_PROYECTO and proyecto.CODIGO_PROYECTO = servicio.CODIGO_PROYECTO and NOMBRE_SERVICIO IN ("Adquisiciones","Desarrollo","Despacho","Instalacion","Produccion","Sillas") and proyecto.ESTADO IN ("'+estado+'") '+q_codigo+' '+q_vendedor+' '+q_categoria+' '+q_fecha+' '+q_cliente+'', function(err, rows, fields) {
                connection.release()
                if (!err)
                  socket.emit('okViewInformes', { valor:rows[0], ejecutivo:rows[1], cuenta:rows[2]})
                else
                  console.log('Error ' + err)
            }) 
      }) 



    }else{


          let query = 'SELECT proyecto.CODIGO_PROYECTO,servicio.TP, servicio.TM, servicio.OS, servicio.PROCESO, servicio.FI, servicio.DESCRIPCION, servicio.SUPERVISOR, servicio.ESTADO, servicio.DIRECCION, servicio.OBSERVACIONES, servicio.FECHA_INICIO, servicio.FECHA_ENTREGA, servicio.NOMBRE_SERVICIO, servicio.CODIGO_SERVICIO,  proyecto.OBRA, proyecto.NOMBRE_CLIENTE, proyecto.EJECUTIVO , proyecto.FECHA_INGRESO, proyecto.FECHA_CONFIRMACION FROM servicio, proyecto WHERE proyecto.CODIGO_PROYECTO = servicio.CODIGO_PROYECTO and NOMBRE_SERVICIO IN ('+data+') and proyecto.ESTADO IN ("'+estado+'") '+q_codigo+' '+q_vendedor+' '+q_categoria+' '+q_fecha+' '+q_cliente+'  order by proyecto.FECHA_CONFIRMACION asc, proyecto.CODIGO_PROYECTO  limit '+cant +';select `NOMBRES`, `APELLIDO_PATERNO`, `APELLIDO_MATERNO` from `empleado` where `AREA` = "COMERCIAL" order by `NOMBRES`;' 
          
          pool.getConnection( (err, connection) => {
                connection.query(query + 'select count(proyecto.CODIGO_PROYECTO) as total FROM servicio, proyecto WHERE proyecto.CODIGO_PROYECTO = servicio.CODIGO_PROYECTO and NOMBRE_SERVICIO IN ('+data+') and proyecto.ESTADO IN ("'+estado+'") '+q_codigo+' '+q_vendedor+' '+q_categoria+' '+q_fecha+' '+q_cliente+'', function(err, rows, fields) {
                    connection.release()
                    if (!err)
                      socket.emit('okViewInformes', { valor:rows[0], ejecutivo:rows[1], cuenta:rows[2]})
                    else
                      console.log('Error ' + err)
                })
          })

    }

  })

})

}