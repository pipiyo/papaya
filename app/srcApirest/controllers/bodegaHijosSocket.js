const pool = require('../models/connection')
const Promise = require('promise')

const Superficie = require('../models/superficie')

module.exports = (io) => {

  io
  .of('/bodega-hijos')
  .on('connection', (socket) => {

  /* Producto Son */
  socket.on('getBodegaHijos', (id,filtro,callback) => {

    let promesa = new Promise( (resolve, reject) => {  
//////////////////

        let q_codigo = ' and CODIGO_PRODUCTO like "%'+id+'%"'
        let q_descripcion = ''
        let q_categoria = ''
        let q_quiebre = ''
        let q_desactivado = ''
        let q_temporada = ' and TEMPORADA = "2"'
        let q_bodega = ''

        if(filtro.desactivado){q_desactivado = ' AND DESHABILITAR = "1"'}else{q_desactivado = ' and DESHABILITAR = "0"'}
        if(filtro.quiebre){q_quiebre = ' and STOCK_ACTUAL < STOCK_MINIMO'}
        if(filtro.descripcion){q_descripcion = ' and DESCRIPCION like "%'+filtro.descripcion +'%"'}
        if(filtro.categoria){q_categoria = ' and CATEGORIA like "%'+filtro.categoria +'%"'}


        let query = 'SELECT producto.CODIGO_PRODUCTO, producto.DESCRIPCION, producto.STOCK_ACTUAL, producto.STOCK_MAXIMO, producto.STOCK_MINIMO, categoria_producto.nombre as CATEGORIA, producto.CATEGORIA as CODIGO_CATEGORIA FROM producto, categoria_producto WHERE producto.CATEGORIA = categoria_producto.id_categoria_producto '+q_desactivado+q_temporada+q_codigo+q_descripcion+q_categoria+q_quiebre+q_bodega+' ORDER BY CODIGO_PRODUCTO limit '+filtro.limitA+','+filtro.limitB+';' 
        let query1 = 'SELECT count(*) as total FROM producto , categoria_producto WHERE producto.CATEGORIA = categoria_producto.id_categoria_producto '+q_desactivado+q_temporada+q_codigo+q_descripcion+q_categoria+q_quiebre+q_bodega+';' 

        pool.getConnection( (err, connection) => {
            connection.query(query+query1 , (err, rows, fields) => {
                connection.release()
                if (!err){
                  //callback({productos:rows[0],cuenta:rows[1]})
                  resolve( [ rows[0], rows[1], rows[0][0].CODIGO_CATEGORIA ] )
                }
                else{
                  //console.log('Error-1 ' + err)
                  reject(`Error-1: ${err}`)
                }
            }) 
        })
/////////////////
    })

    promesa.then( ([producto, cuenta, codigo_categoria]) => {
/////////////////
          let i, e
          let consulta = ""

          for(i=0;i<producto.length;i++){
            if(i == 0){
              consulta += '"'+producto[i].CODIGO_PRODUCTO+'"'
            }else{
              consulta += ',"'+producto[i].CODIGO_PRODUCTO+'"'
            }
          }

          if(consulta == ""){consulta = '"No producto"'}
          
          let query = 'SELECT sum(oc_producto.CANTIDAD - oc_producto.CANTIDAD_RECIBIDA) as TOTAL,producto.CODIGO_PRODUCTO  FROM oc_producto, producto, orden_de_compra WHERE orden_de_compra.CODIGO_OC = oc_producto.CODIGO_OC and oc_producto.CODIGO_PRODUCTO = producto.CODIGO_PRODUCTO and producto.CODIGO_PRODUCTO IN ('+consulta+') and orden_de_compra.ESTADO = "EN PROCESO" group by producto.CODIGO_PRODUCTO' 
          pool.getConnection( (err, connection) => {
              connection.query(query, (err, rows, fields) => {
                  connection.release()
                  for(i=0;i<producto.length;i++){
                    if(rows.length > 0){
                      for(e=0;e<rows.length;e++){
                       if(producto[i].CODIGO_PRODUCTO == rows[e].CODIGO_PRODUCTO){
                          producto[i].TRANSITO = rows[e].TOTAL
                          producto[i].CONTABLE = producto[i].STOCK_ACTUAL + rows[e].TOTAL
                       }else{
                          producto[i].TRANSITO = 0
                          producto[i].CONTABLE = producto[i].STOCK_ACTUAL + 0
                       }
                      }
                    }else{
                      producto[i].TRANSITO = 0
                      producto[i].CONTABLE = producto[i].STOCK_ACTUAL + 0
                    }
                  }
                  if (!err){

                  }
                  else{
                    reject(`Error-2: ${err}`)
                  }
              }) 
          })
          return [{productos:producto}, cuenta, codigo_categoria]
/////////////////
    }).then( producto => {
/////////////////////
    let i, e
    let consulta = ""
    for(i=0;i<producto[0].length;i++){
      if(i == 0){
        consulta += '"'+producto[0][i].CODIGO_PRODUCTO+'"'
      }else{
        consulta += ',"'+producto[0][i].CODIGO_PRODUCTO+'"'
      }
    }



    if(consulta == ""){consulta = '"No producto"'}

    let query = 'select sum(producto_vale_emision.CANTIDAD_SOLICITADA -  IFNULL(producto_vale_emision.CANTIDAD_ENTREGADA,0)) as TOTAL,producto_vale_emision.CODIGO_PRODUCTO  from vale_emision, producto_vale_emision, producto where vale_emision.COD_VALE = producto_vale_emision.CODIGO_VALE and producto_vale_emision.CODIGO_PRODUCTO = producto.CODIGO_PRODUCTO and producto.CODIGO_PRODUCTO in ('+consulta+')  and vale_emision.ESTADO = "PENDIENTE" group by producto_vale_emision.CODIGO_PRODUCTO' 
    pool.getConnection( (err, connection) => {
        connection.query(query, (err, rows, fields) => {
            connection.release()
            for(i=0;i<producto[0].length;i++){
              if(rows.length > 0){
                for(e=0;e<rows.length;e++){
                 if(producto[0][i].CODIGO_PRODUCTO == rows[e].CODIGO_PRODUCTO){
                    producto[0][i].VALE = rows[e].TOTAL
                    producto[0][i].DISPONIBLE = producto[0][i].CONTABLE - rows[e].TOTAL
                 }else{
                    producto[0][i].VALE = 0
                    producto[0][i].DISPONIBLE = producto[0][i].CONTABLE - 0
                 }
                }
              }else{
                producto[0][i].VALE = 0
                producto[0][i].DISPONIBLE = producto[0][i].CONTABLE - 0
              }
            }
            if (!err){

                  Superficie.
                    find({ 'asset.categoria': producto[2] } ).
                    populate('colores').
                    populate('asset.categoria').
                    populate('asset.espesor').
                    populate('asset.trascara').
                    populate('asset.colores_proveedor').
                    exec( (err, superficies) => {
                      if (err) console.log(err)

                        callback( producto[0], producto[1], superficies)
                   
                    })


            }
            else{
              reject(`Error-3: ${err}`)
            }
        }) 
    })
/////////////////////
    }).catch( rason => console.log(rason) )
  })






/*

  socket.on('allBodegaNewSon', (id,filtro,callback) => {
    

    let q_codigo = ' and CODIGO_PRODUCTO like "%'+id+'%"'
    let q_descripcion = ''
    let q_categoria = ''
    let q_quiebre = ''
    let q_desactivado = ''
    let q_temporada = ' and TEMPORADA = "2"'
    let q_bodega = ''

    if(filtro.desactivado){q_desactivado = ' AND DESHABILITAR = "1"'}else{q_desactivado = ' and DESHABILITAR = "0"'}
    if(filtro.quiebre){q_quiebre = ' and STOCK_ACTUAL < STOCK_MINIMO'}
    if(filtro.descripcion){q_descripcion = ' and DESCRIPCION like "%'+filtro.descripcion +'%"'}
    if(filtro.categoria){q_categoria = ' and CATEGORIA like "%'+filtro.categoria +'%"'}


    let query = 'SELECT producto.CODIGO_PRODUCTO, producto.DESCRIPCION, producto.STOCK_ACTUAL, producto.STOCK_MAXIMO, producto.STOCK_MINIMO, categoria_producto.nombre as CATEGORIA FROM producto, categoria_producto WHERE producto.CATEGORIA = categoria_producto.id_categoria_producto '+q_desactivado+q_temporada+q_codigo+q_descripcion+q_categoria+q_quiebre+q_bodega+' ORDER BY CODIGO_PRODUCTO limit '+filtro.limitA+','+filtro.limitB+';' 
    let query1 = 'SELECT count(*) as total FROM producto , categoria_producto WHERE producto.CATEGORIA = categoria_producto.id_categoria_producto '+q_desactivado+q_temporada+q_codigo+q_descripcion+q_categoria+q_quiebre+q_bodega+';' 

    pool.getConnection( (err, connection) => {
        connection.query(query+query1 , (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({productos:rows[0],cuenta:rows[1]})
            }
            else{
              console.log('Error-1 ' + err)
            }
        }) 
    })
  })


  socket.on('allTransito', (producto,callback) => {
    let i, e
    let consulta = ""

    for(i=0;i<producto.length;i++){
      if(i == 0){
        consulta += '"'+producto[i].CODIGO_PRODUCTO+'"'
      }else{
        consulta += ',"'+producto[i].CODIGO_PRODUCTO+'"'
      }
    }

    if(consulta == ""){consulta = '"No producto"'}

    
    let query = 'SELECT sum(oc_producto.CANTIDAD - oc_producto.CANTIDAD_RECIBIDA) as TOTAL,producto.CODIGO_PRODUCTO  FROM oc_producto, producto, orden_de_compra WHERE orden_de_compra.CODIGO_OC = oc_producto.CODIGO_OC and oc_producto.CODIGO_PRODUCTO = producto.CODIGO_PRODUCTO and producto.CODIGO_PRODUCTO IN ('+consulta+') and orden_de_compra.ESTADO = "EN PROCESO" group by producto.CODIGO_PRODUCTO' 
    pool.getConnection( (err, connection) => {
        connection.query(query, (err, rows, fields) => {
            connection.release()
            for(i=0;i<producto.length;i++){
              if(rows.length > 0){
                for(e=0;e<rows.length;e++){
                 if(producto[i].CODIGO_PRODUCTO == rows[e].CODIGO_PRODUCTO){
                    producto[i].TRANSITO = rows[e].TOTAL
                    producto[i].CONTABLE = producto[i].STOCK_ACTUAL + rows[e].TOTAL
                 }else{
                    producto[i].TRANSITO = 0
                    producto[i].CONTABLE = producto[i].STOCK_ACTUAL + 0
                 }
                }
              }else{
                producto[i].TRANSITO = 0
                producto[i].CONTABLE = producto[i].STOCK_ACTUAL + 0
              }
            }
            if (!err){
              callback({productos:producto})
            }
            else{
              console.log('Error-2 ' + err)
            }
        }) 
    })
  })



  socket.on('allVale', (producto,callback) => {
    let i, e
    let consulta = ""
    for(i=0;i<producto.length;i++){
      if(i == 0){
        consulta += '"'+producto[i].CODIGO_PRODUCTO+'"'
      }else{
        consulta += ',"'+producto[i].CODIGO_PRODUCTO+'"'
      }
    }

    if(consulta == ""){consulta = '"No producto"'}

    let query = 'select sum(producto_vale_emision.CANTIDAD_SOLICITADA -  IFNULL(producto_vale_emision.CANTIDAD_ENTREGADA,0)) as TOTAL,producto_vale_emision.CODIGO_PRODUCTO  from vale_emision, producto_vale_emision, producto where vale_emision.COD_VALE = producto_vale_emision.CODIGO_VALE and producto_vale_emision.CODIGO_PRODUCTO = producto.CODIGO_PRODUCTO and producto.CODIGO_PRODUCTO in ('+consulta+')  and vale_emision.ESTADO = "PENDIENTE" group by producto_vale_emision.CODIGO_PRODUCTO' 
    pool.getConnection( (err, connection) => {
        connection.query(query, (err, rows, fields) => {
            connection.release()
            for(i=0;i<producto.length;i++){
              if(rows.length > 0){
                for(e=0;e<rows.length;e++){
                 if(producto[i].CODIGO_PRODUCTO == rows[e].CODIGO_PRODUCTO){
                    producto[i].VALE = rows[e].TOTAL
                    producto[i].DISPONIBLE = producto[i].CONTABLE - rows[e].TOTAL
                 }else{
                    producto[i].VALE = 0
                    producto[i].DISPONIBLE = producto[i].CONTABLE - 0
                 }
                }
              }else{
                producto[i].VALE = 0
                producto[i].DISPONIBLE = producto[i].CONTABLE - 0
              }
            }
            if (!err){
              callback({productos:producto})
            }
            else{
              console.log('Error-3 ' + err)
            }
        }) 
    })
  })
*/


})


}