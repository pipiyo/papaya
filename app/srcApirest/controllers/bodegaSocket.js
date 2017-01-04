const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/bodega')
  .on('connection', (socket) => {

 /* Producto */
  socket.on('allBodega', (data) => {
    let query = 'SELECT * FROM producto ORDER BY CODIGO_PRODUCTO limit 5' 
    pool.getConnection( (err, connection) => {
        connection.query(query, (err, rows, fields) => {
            connection.release()
            if (!err){
              socket.emit('okAllBodega', {productos:rows})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })

  /* Transito */
  socket.on('allTransito', (producto) => {
    let i, e
    let consulta = ""
    for(i=0;i<producto.length;i++){
      if(i == 0){
        consulta += '"'+producto[i].CODIGO_PRODUCTO+'"'
      }else{
        consulta += ',"'+producto[i].CODIGO_PRODUCTO+'"'
      }
    }
    let query = 'SELECT sum(oc_producto.CANTIDAD - oc_producto.CANTIDAD_RECIBIDA) as TOTAL,producto.CODIGO_PRODUCTO  FROM oc_producto, producto, orden_de_compra WHERE orden_de_compra.CODIGO_OC = oc_producto.CODIGO_OC and oc_producto.CODIGO_PRODUCTO = producto.CODIGO_PRODUCTO and producto.CODIGO_PRODUCTO IN ('+consulta+') and orden_de_compra.ESTADO = "EN PROCESO" group by producto.CODIGO_PRODUCTO' 
    pool.getConnection( (err, connection) => {
        connection.query(query, (err, rows, fields) => {
            connection.release()
            for(i=0;i<producto.length;i++){
              for(e=0;e<rows.length;e++){
               if(producto[i].CODIGO_PRODUCTO == rows[e].CODIGO_PRODUCTO){
                  producto[i].TRANSITO = rows[e].TOTAL
               }else{
                  producto[i].TRANSITO = 0
               }
              }
            }
            if (!err){
              socket.emit('okAllTransito', {productos:producto})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })


  /* Vale */
  socket.on('allVale', (producto) => {
    let i, e
    let consulta = ""
    for(i=0;i<producto.length;i++){
      if(i == 0){
        consulta += '"'+producto[i].CODIGO_PRODUCTO+'"'
      }else{
        consulta += ',"'+producto[i].CODIGO_PRODUCTO+'"'
      }
    }
    let query = 'select sum(producto_vale_emision.CANTIDAD_SOLICITADA -  IFNULL(producto_vale_emision.CANTIDAD_ENTREGADA,0)) as TOTAL,producto_vale_emision.CODIGO_PRODUCTO  from vale_emision, producto_vale_emision, producto where vale_emision.COD_VALE = producto_vale_emision.CODIGO_VALE and producto_vale_emision.CODIGO_PRODUCTO = producto.CODIGO_PRODUCTO and producto.CODIGO_PRODUCTO in ('+consulta+')  and vale_emision.ESTADO = "PENDIENTE" group by producto_vale_emision.CODIGO_PRODUCTO' 
    pool.getConnection( (err, connection) => {
        connection.query(query, (err, rows, fields) => {
            connection.release()
            for(i=0;i<producto.length;i++){
              for(e=0;e<rows.length;e++){
               if(producto[i].CODIGO_PRODUCTO == rows[e].CODIGO_PRODUCTO){
                  producto[i].VALE = rows[e].TOTAL
               }else{
                  producto[i].VALE = 0
               }
              }
            }
            if (!err){
              socket.emit('okAllVale', {productos:producto})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })

})

}