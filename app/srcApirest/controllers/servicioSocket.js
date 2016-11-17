module.exports = (io, pool, Notification) => {

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
  socket.on('addServicio', (data) => {
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
                      DIAS: data.dias
                    }
    let okAddServicio = '(Se ingreso servicio ' + data.area + ')'

      pool.getConnection( (err, connection) => {
        connection.query('INSERT INTO `servicio` SET ?',servicio, (err, row) => {
          connection.release()
          if (!err) {
            let notification = new Notification({user: socket.request.session.name, 
                                                 slug: 'aqui el slug',
                                                 area_servicio: data.area,
                                                 codigo_servicio: row.insertId,
                                                 categoria_servicio: data.categoria })
            notification.save().then( (doc) => {
              console.log( doc )
            }, (error) => {
              console.log( error )
            })
          } else {
            console.log('Error no se pudo ingresar servicio '+ err)
          }
        })
      })


    socket.emit('okAddServicio', okAddServicio)
  })


  /* Update Servicio */
  socket.on('updateServicio', (data) => {

    let okUpdateServicio = '(Se update servicio ' + data.numero + ')'



    pool.getConnection( (err, connection) => {
        connection.query('UPDATE servicio SET CATEGORIA = ?, SUPERVISOR = ?, FECHA_INICIO = ?, FECHA_ENTREGA = ?, DESCRIPCION = ?, OBSERVACIONES = ?, DIRECCION  = ?, GUIA_DESPACHO = ?, CODIGO_COMUNA = ?, M3 = ?, FI = ?, TM = ?, TP = ?, OS = ?, LIDER = ?, PUESTOS = ?, PROCESO = ?, INSTALADOR_1 = ?, INSTALADOR_2 = ?, INSTALADOR_3 = ?, EJECUTOR = ?, VALE = ?, TRANSPORTE = ?, CANTIDAD = ?, RECLAMOS = ?, ESTADO = ?, DIAS = ?  WHERE CODIGO_SERVICIO = ?', [data.categoria, data.supervisor, data.fechaInicio, data.fechaEntrega, data.descripcion, data.observacion, data.direccion, data.guia, data.comuna, data.m3, data.fi, data.tm, data.to, data.os, data.lider, data.puestos, data.proceso, data.instalador1, data.instalador2, data.instalador3, data.ejecutor, data.vale, data.vehiculo, data.cantidad, data.reclamo, data.estado, data.dias, data.numero], (err, results) => {
            connection.release()
            if (!err)
              console.log('Se actualizo servicio ' + data.numero)
            else
              console.log('Error no se pudo ingresar servicio '+ err)
        })
    })


    socket.emit('okUpdateServicio', okUpdateServicio)
  })

  /* Listar Servicio */
  socket.on('searchServicio', (id) => {
      let query = 'SELECT * FROM servicio WHERE CODIGO_SERVICIO = "'+id+'"' 


      pool.getConnection( (err, connection) => {
            connection.query(query, (err, rows, fields) => {
                connection.release()
                if (!err)
                  socket.emit('okSearchServicio', rows)
                else
                  console.log('Error ' + err)
            }) 
      }) 



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
      let query = 'SELECT reclamos.CODIGO_RECLAMO, servicio.RECLAMOS, reclamos.RAZON, reclamos.AREA, proyecto.CODIGO_PROYECTO,servicio.TP, servicio.TM, servicio.OS, servicio.PROCESO, servicio.FI, servicio.DESCRIPCION, servicio.SUPERVISOR, servicio.ESTADO, servicio.DIRECCION, servicio.OBSERVACIONES, servicio.FECHA_INICIO, servicio.FECHA_ENTREGA, servicio.NOMBRE_SERVICIO, servicio.CODIGO_SERVICIO,  proyecto.OBRA, proyecto.NOMBRE_CLIENTE, proyecto.EJECUTIVO , proyecto.FECHA_INGRESO, proyecto.FECHA_CONFIRMACION FROM servicio, proyecto, reclamos WHERE reclamos.ROCHA = proyecto.CODIGO_PROYECTO and proyecto.CODIGO_PROYECTO = servicio.CODIGO_PROYECTO and NOMBRE_SERVICIO IN ("Adquisiciones","Desarrollo","Despacho","Instalacion","Produccion","Sillas") and proyecto.ESTADO IN ("'+estado+'") '+q_codigo+' '+q_vendedor+' '+q_categoria+' '+q_fecha+' '+q_cliente+'  order by proyecto.FECHA_CONFIRMACION asc, proyecto.CODIGO_PROYECTO  limit '+cant +';' 
      

      pool.getConnection( (err, connection) => {
            connection.query(query + 'select count(proyecto.CODIGO_PROYECTO) as total FROM servicio, proyecto,reclamos WHERE reclamos.ROCHA = proyecto.CODIGO_PROYECTO and proyecto.CODIGO_PROYECTO = servicio.CODIGO_PROYECTO and NOMBRE_SERVICIO IN ("Adquisiciones","Desarrollo","Despacho","Instalacion","Produccion","Sillas") and proyecto.ESTADO IN ("'+estado+'") '+q_codigo+' '+q_vendedor+' '+q_categoria+' '+q_fecha+' '+q_cliente+'', function(err, rows, fields) {
                connection.release()
                if (!err)
                  socket.emit('okViewInformes', { valor:rows[0], cuenta:rows[1]})
                else
                  console.log('Error ' + err)
            }) 
      }) 



    }else{


          let query = 'SELECT proyecto.CODIGO_PROYECTO,servicio.TP, servicio.TM, servicio.OS, servicio.PROCESO, servicio.FI, servicio.DESCRIPCION, servicio.SUPERVISOR, servicio.ESTADO, servicio.DIRECCION, servicio.OBSERVACIONES, servicio.FECHA_INICIO, servicio.FECHA_ENTREGA, servicio.NOMBRE_SERVICIO, servicio.CODIGO_SERVICIO,  proyecto.OBRA, proyecto.NOMBRE_CLIENTE, proyecto.EJECUTIVO , proyecto.FECHA_INGRESO, proyecto.FECHA_CONFIRMACION FROM servicio, proyecto WHERE proyecto.CODIGO_PROYECTO = servicio.CODIGO_PROYECTO and NOMBRE_SERVICIO IN ('+data+') and proyecto.ESTADO IN ("'+estado+'") '+q_codigo+' '+q_vendedor+' '+q_categoria+' '+q_fecha+' '+q_cliente+'  order by proyecto.FECHA_CONFIRMACION asc, proyecto.CODIGO_PROYECTO  limit '+cant +';' 
          
          pool.getConnection( (err, connection) => {
                connection.query(query + 'select count(proyecto.CODIGO_PROYECTO) as total FROM servicio, proyecto WHERE proyecto.CODIGO_PROYECTO = servicio.CODIGO_PROYECTO and NOMBRE_SERVICIO IN ('+data+') and proyecto.ESTADO IN ("'+estado+'") '+q_codigo+' '+q_vendedor+' '+q_categoria+' '+q_fecha+' '+q_cliente+'', function(err, rows, fields) {
                    connection.release()
                    if (!err)
                      socket.emit('okViewInformes', { valor:rows[0], cuenta:rows[1]})
                    else
                      console.log('Error ' + err)
                })
          })

    }

  })

})

}