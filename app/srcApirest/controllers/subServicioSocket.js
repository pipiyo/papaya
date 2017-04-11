const pool = require('../models/connection')
const decodeToken = require('./decodeToken')

module.exports = (io) => {

  io
  .of('/subServicio')
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


  /* Sub Servicio */
  socket.on('allSubServicio', (data) => {
      let query = 'SELECT `CODIGO_PROYECTO`,`DESCRIPCION`,`OBSERVACIONES`,`CODIGO_SERVICIO`, `FECHA_INICIO`, `FECHA_ENTREGA`, `CODIGO_SUBSERVICIO`, `SUB_CODIGO_SERVICIO`, `SUB_NOMBRE_SERVICIO`, `SUB_FECHA_INICIO`, `SUB_FECHA_ENTREGA`, `SUB_REALIZADOR`, `SUB_SUPERVISOR`, `SUB_OBSERVACIONES`, `SUB_ESTADO`, `SUB_CODIGO_USUARIO`, `SUB_CODIGO_PROYECTO`, `SUB_DESCRIPCION`, `SUB_DIRECCION`, `SUB_TPTMFI`, `SUB_GUIA_DESPACHO`, `SUB_CODIGO_OC`, `SUB_INSTALADOR_1`, `SUB_INSTALADOR_2`, `SUB_INSTALADOR_3`, `SUB_INSTALADOR_4`, `SUB_LIDER`, `SUB_DIAS`, `SUB_PREDECESOR`, `SUB_PUESTOS`, `SUB_PROCESO`, `SUB_EJECUTOR`, `SUB_DOCUMENTO_SERVICIO_TECNICO`, `SUB_TIPO_SERVICIO`, `SUB_TECNICO_1`, `SUB_TECNICO_2`, `SUB_CODIGO_RADICADO`, `SUB_TRANSPORTE`, `SUB_FECHA_REALIZACION`, `SUB_RECLAMOS`, `SUB_OC`, `SUB_FECHA_PRIMERA_ENTREGA`, `SUB_CATEGORIA`, `SUB_CANTIDAD`, `SUB_BODEGA`, `SUB_FI`, `SUB_ORDEN_SERVICIO`, `SUB_VALE`, `SUB_CODIGO_COMUNA`, `SUB_PROGRESO`, `SUB_M3`, `SUB_FACTURA`, `SUB_MONTO_FACTURA`, `SUB_RECEPCION`, `SUB_ARCHIVO`, `SUB_TM`, `SUB_TP`, `SUB_OS` FROM `sub_servicio`, `servicio` WHERE servicio.CODIGO_SERVICIO = sub_servicio.SUB_CODIGO_SERVICIO and servicio.CODIGO_SERVICIO = "'+data+'";' 
      let query1 = 'SELECT * FROM servicio WHERE CODIGO_SERVICIO = "'+data+'"' 
      

      pool.getConnection( (err, connection) => {
          connection.query(query+query1, (err, rows, fields) => {
              connection.release()
              if (!err)
                socket.emit('okAllSubServicio', { sub:rows[0], servicio:rows[1]})
              else
                console.log('Error ' + err)
          }) 
      })
  })

  /* Proyecto, Servicio, Sub-servicio */
  socket.on('allProyectoSubServicio', (data,area,callback) => {
    
    let promesa = new Promise( (resolve, reject) => {  

      let q_codigo = ""
      let q_vendedor = ""
      let q_categoria = ""
      let q_cliente = ""
      let q_fecha = ""
      let q_estado = ""
      let q_area = ""
      let q_servicio = ""

      switch (area) {
        case "abastecimiento":
            q_area = 'and SUB_NOMBRE_SERVICIO IN ("Adquisiciones")'
            break;
        case "despacho":
            q_area = 'and SUB_NOMBRE_SERVICIO IN ("Despacho")'
            break;
        case "sillas":
            q_area = 'and SUB_NOMBRE_SERVICIO IN ("Sillas")'
            break;
        case "instalación":
            q_area = 'and SUB_NOMBRE_SERVICIO IN ("Instalacion")'
            break;
        case "producción":
            q_area = 'and SUB_NOMBRE_SERVICIO IN ("Produccion")'
            break;
        case "técnica":
            q_area = 'and SUB_NOMBRE_SERVICIO IN ("Desarrollo")'
            break;
        case "técnica-especial":
            q_area = 'and NOMBRE_SERVICIO IN ("Desarrollo-especial")'
            break;
        case "planificación":
            q_area = 'and NOMBRE_SERVICIO IN ("FI","Adquisiciones","Desarrollo","Desarrollo-especial","Despacho","Instalacion","Produccion","Sillas","Planificacion")'
            break;
        case "comercial":
            q_area = 'and SUB_NOMBRE_SERVICIO IN ("Adquisiciones","Desarrollo","Despacho","Instalacion","Produccion","Sillas")'
            break;
      }

      if(data.codigo){q_codigo = ' and proyecto.CODIGO_PROYECTO like "%'+data.codigo +'%"'}
      if(data.vendedor){q_vendedor = ' and proyecto.EJECUTIVO like "%'+data.vendedor +'%"'}
      if(data.categoria){q_categoria = ' and sub_servicio.SUB_CATEGORIA like "%'+data.categoria +'%"'}
      if(data.cliente){q_cliente = ' and proyecto.NOMBRE_CLIENTE like "%'+data.cliente +'%"'}
      if(data.servicio){q_servicio = ' and sub_servicio.SUB_NOMBRE_SERVICIO like "%'+data.servicio +'%"'}
      if(data.fechaInicio != null && data.fechaEntrega != null){q_fecha = ' and sub_servicio.SUB_FECHA_ENTREGA BETWEEN "'+ data.fechaInicio +'" and "'+ data.fechaEntrega +'"'}
      q_estado = ' and sub_servicio.SUB_ESTADO = "'+data.estado+'"'
      let query = 'SELECT sub_servicio.CODIGO_SUBSERVICIO,sub_servicio.SUB_NOMBRE_SERVICIO, proyecto.CODIGO_PROYECTO , proyecto.NOMBRE_CLIENTE, proyecto.EJECUTIVO, servicio.CODIGO_SERVICIO, servicio.DESCRIPCION as SD , sub_servicio.SUB_DESCRIPCION as SSD,sub_servicio.SUB_FECHA_INICIO, sub_servicio.SUB_FECHA_ENTREGA, sub_servicio.SUB_OBSERVACIONES, sub_servicio.SUB_ESTADO FROM proyecto,servicio, sub_servicio WHERE proyecto.CODIGO_PROYECTO = servicio.CODIGO_PROYECTO and servicio.CODIGO_SERVICIO = sub_servicio.SUB_CODIGO_SERVICIO'+q_estado+q_codigo+q_servicio+q_vendedor+q_categoria+q_fecha+q_area+q_cliente+' order by sub_servicio.SUB_FECHA_ENTREGA asc limit '+data.limit +', '+data.limitB+' ;' 
      let query1 = 'SELECT count(CODIGO_SUBSERVICIO) as total FROM proyecto,servicio, sub_servicio WHERE proyecto.CODIGO_PROYECTO = servicio.CODIGO_PROYECTO and servicio.CODIGO_SERVICIO = sub_servicio.SUB_CODIGO_SERVICIO'+q_estado+q_codigo+q_servicio+q_vendedor+q_categoria+q_fecha+q_area+q_cliente+';' 
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

  /* Search Sub Servicio */
  socket.on('searchSubServicio', (id) => {
      let query = 'SELECT * FROM sub_servicio WHERE CODIGO_SUBSERVICIO = "'+id+'"' 


      pool.getConnection( (err, connection) => {
          connection.query(query, (err, rows, fields) => {
              connection.release()
              if (!err)
                socket.emit('okSearchSubServicio', rows)
              else
                console.log('Error ' + err)
          })
      })




  })


  /*Ingreso sub servicio*/
  socket.on('addSubServicio', (data, token) => {

  let user = decodeToken(token)

  let servicio = {  
                    SUB_CODIGO_SERVICIO: data.codigo_servicio,
                    SUB_NOMBRE_SERVICIO: data.area, 
                    SUB_CATEGORIA: data.categoria, 
                    SUB_SUPERVISOR: data.supervisor,
                    SUB_FECHA_INICIO: data.fechaInicio,
                    SUB_FECHA_ENTREGA: data.fechaEntrega,
                    SUB_DESCRIPCION: data.descripcion,
                    SUB_OBSERVACIONES: data.observacion,
                    SUB_CODIGO_PROYECTO : data.rocha,
                    SUB_DIRECCION : data.direccion,
                    SUB_GUIA_DESPACHO: data.guia,
                    SUB_CODIGO_COMUNA: data.comuna,
                    SUB_M3: data.m3,
                    SUB_FI: data.fi,
                    SUB_TM: data.tm,
                    SUB_TP: data.to,
                    SUB_OS: data.os,
                    SUB_LIDER: data.lider,
                    SUB_PUESTOS: data.puestos,
                    SUB_PROCESO: data.proceso,    
                    SUB_INSTALADOR_1: data.instalador1,
                    SUB_INSTALADOR_2: data.instalador2,
                    SUB_INSTALADOR_3: data.instalador3,
                    SUB_EJECUTOR: data.ejecutor,
                    SUB_VALE: data.vale, 
                    SUB_TRANSPORTE: data.vehiculo,    
                    SUB_CANTIDAD: data.cantidad,
                    SUB_ESTADO: "EN PROCESO",
                    SUB_DIAS: data.dias,
                    SUB_REALIZADOR: user.name
                  }
    let okAddSubServicio = '(Se ingreso sub servicio ' + data.area + ')'





      pool.getConnection( (err, connection) => {
        connection.query('INSERT INTO `sub_servicio` SET ?',servicio, (err) => {
            connection.release()
            if (!err) 
              console.log(okAddSubServicio)
            else
              console.log('Error no se pudo ingresar sub-servicio '+ err)
        })
      })





    socket.emit('okAddSubServicio', okAddSubServicio)
  })

   /* Update Sub Servicio */
  socket.on('updateSubServicio', (data) => {
    
    let okUpdateSubServicio = '(Se update subservicio ' + data.numero + ')'



      pool.getConnection( (err, connection) => {
        connection.query('UPDATE sub_servicio SET SUB_CATEGORIA = ?, SUB_SUPERVISOR = ?, SUB_FECHA_INICIO = ?, SUB_FECHA_ENTREGA = ?, SUB_DESCRIPCION = ?, SUB_OBSERVACIONES = ?, SUB_DIRECCION  = ?, SUB_GUIA_DESPACHO = ?, SUB_CODIGO_COMUNA = ?, SUB_M3 = ?, SUB_FI = ?, SUB_TM = ?, SUB_TP = ?, SUB_OS = ?, SUB_LIDER = ?, SUB_PUESTOS = ?, SUB_PROCESO = ?, SUB_INSTALADOR_1 = ?, SUB_INSTALADOR_2 = ?, SUB_INSTALADOR_3 = ?, SUB_EJECUTOR = ?, SUB_VALE = ?, SUB_TRANSPORTE = ?, SUB_CANTIDAD = ?, SUB_RECLAMOS = ?, SUB_ESTADO = ?, SUB_DIAS = ?  WHERE CODIGO_SUBSERVICIO = ?', [data.categoria, data.supervisor, data.fechaInicio, data.fechaEntrega, data.descripcion, data.observacion, data.direccion, data.guia, data.comuna, data.m3, data.fi, data.tm, data.to, data.os, data.lider, data.puestos, data.proceso, data.instalador1, data.instalador2, data.instalador3, data.ejecutor, data.vale, data.vehiculo, data.cantidad, data.reclamo, data.estado, data.dias, data.numero], (err, results) => {
            connection.release()
            if (!err)
              console.log('Se actualizo servicio ' + data.numero)
            else
              console.log('Error no se pudo ingresar servicio '+ err)
        })
      })



    socket.emit('okUpdateSubServicio', okUpdateSubServicio)
  })

})

}