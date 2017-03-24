const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/descriptionRocha')
  .on('connection', (socket) => {

 /* Producto */
  socket.on('allRocha', (id, filtro, callback) => {
    let promesa = new Promise( (resolve, reject) => {  

      let q_categoria_servicio = ''
      let q_estado_servicio = ''

      let q_estado_oc = ''

      let q_estado_vale = ''

      if(filtro.servicio.estado){q_estado_servicio = ' and servicio.ESTADO = "'+filtro.servicio.estado+'"'}
      if(filtro.servicio.categoria){q_categoria_servicio = ' and servicio.CATEGORIA = "'+filtro.servicio.categoria+'"'}

      if(filtro.oc.estado){q_estado_oc = ' and orden_de_compra.ESTADO = "'+filtro.oc.estado+'"'}
      if(filtro.vale.estado){q_estado_vale = ' and vale_emision.ESTADO = "'+filtro.vale.estado+'"'}

      let query = `SELECT * FROM proyecto where CODIGO_PROYECTO = "${id}";`
      let query1 = `SELECT servicio.NOMBRE_SERVICIO, proyecto.CODIGO_PROYECTO , proyecto.NOMBRE_CLIENTE, proyecto.EJECUTIVO, servicio.CODIGO_SERVICIO, servicio.DESCRIPCION as SD ,servicio.FECHA_INICIO, servicio.FECHA_ENTREGA, servicio.OBSERVACIONES, servicio.ESTADO FROM proyecto,servicio WHERE proyecto.CODIGO_PROYECTO = servicio.CODIGO_PROYECTO and servicio.CODIGO_PROYECTO = "${id}" ${q_categoria_servicio} ${q_estado_servicio} ;`
      let query2= `Select DISTINCT orden_de_compra.FECHA_CONFIRMACION , sum(oc_producto.TOTAL) as TOTAL, orden_de_compra.RECLAMO,orden_de_compra.NOMBRE_PROVEEDOR, orden_de_compra.FECHA_ENTREGA , orden_de_compra.FECHA_REALIZACION , orden_de_compra.CODIGO_OC ,orden_de_compra.ESTADO from orden_de_compra,proyecto,oc_producto where orden_de_compra.CODIGO_OC = oc_producto.CODIGO_OC AND oc_producto.ROCHA = proyecto.CODIGO_PROYECTO AND proyecto.CODIGO_PROYECTO = "${id}" ${q_estado_oc} GROUP BY orden_de_compra.CODIGO_OC;`
      let query3= `SELECT vale_emision.EMPLEADO, vale_emision.COD_VALE,vale_emision.DEPARTAMENTO,vale_emision.FECHA,vale_emision.FECHA_TERMINO,vale_emision.ESTADO,vale_emision.CODIGO_USUARIO FROM vale_emision  WHERE CODIGO_PROYECTO = "${id}" ${q_estado_vale} ` 
      pool.getConnection( (err, connection) => {
          connection.query(query+query1+query2+query3, (err, rows, fields) => {
              connection.release()
              if (!err){
               resolve(  callback({rocha:rows[0],servicio:rows[1],oc:rows[2],vale:rows[3]}) )
              }
              else{
               reject(  console.log('Error ' + err) )
              }
          }) 
      })
    }).catch( rason => console.log(rason) )
  })

})

}