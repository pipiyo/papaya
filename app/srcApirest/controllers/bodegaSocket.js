const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/bodega')
  .on('connection', (socket) => {

 /* Producto */
  socket.on('allBodega', (area,filtro,callback) => {
    

    let q_codigo = ''
    let q_descripcion = ''
    let q_categoria = ''
    let q_quiebre = ''
    let q_desactivado = ''
    let q_temporada = ' and TEMPORADA = "0"'
    let q_bodega = ''

    if(filtro.desactivado){q_desactivado = ' DESHABILITAR = "1"'}else{q_desactivado = ' DESHABILITAR = "0"'}
    if(filtro.quiebre){q_quiebre = ' and STOCK_ACTUAL < STOCK_MINIMO'}
    if(filtro.codigo){q_codigo = ' and CODIGO_PRODUCTO like "%'+filtro.codigo +'%"'}
    if(filtro.descripcion){q_descripcion = ' and DESCRIPCION like "%'+filtro.descripcion +'%"'}
    if(filtro.categoria){q_categoria = ' and CATEGORIA like "%'+filtro.categoria +'%"'}

    switch(area) {
    case 'insumo':
        q_bodega = ' and CATEGORIA IN("Cubiertas","Baldosas Tapizadas","Baldosas Vidrio","Baldosas Metalica","Baldosas Melamina","Articulo Electrico","Maquinas y Herramientas","Embalaje","sillas","Tornillos","Baldosas Laminadas","Tela","Laminados","Maderas","Tapacantos")'
        filtro_categoria = [
          {id:'Cubiertas',name:'Cubiertas'},
          {id:'Baldosas Tapizadas',name:'Baldosas Tapizadas'},
          {id:'Baldosas Vidrio',name:'Baldosas Vidrio'},
          {id:'Baldosas Metalica',name:'Baldosas Metalica'},
          {id:'Baldosas Melamina',name:'Baldosas Melamina'},
          {id:'Articulo Electrico',name:'Articulo Electrico'},
          {id:'Maquinas y Herramientas',name:'Maquinas y Herramientas'},
          {id:'Embalaje',name:'Embalaje'},
          {id:'sillas',name:'Sillas'},
          {id:'Tornillos',name:'Tornillos'}
        ]
        break;
    case 'terminado':
        q_bodega = ' and CATEGORIA IN("Muebles De Linea","Full Space","Cajoneras")'
        filtro_categoria = [
          {id:'Muebles De Linea',name:'Muebles De Linea'},
          {id:'Full Space',name:'Full Space'},
          {id:'Cajoneras',name:'Cajoneras'}
        ]
        break;
    case 'importado':
        q_bodega = ' and CATEGORIA IN("ACTIU")'
        filtro_categoria = [
          {id:'ACTIU',name:'ACTIU'}
        ]
        break;
    case 'sillas':
        q_bodega = ' and CATEGORIA IN("Embalaje","sillas","Tornillos","Baldosas Tapizadas","Baldosas Laminadas","Tela","Laminados","Maderas","Tapacantos")'
        filtro_categoria = [
          {id:'Embalaje',name:'Baldosas Tapizadas'},
          {id:'sillas',name:'Baldosas Laminadas'},
          {id:'Tornillos',name:'Tela'},
          {id:'Laminados',name:'Laminados'},
          {id:'Maderas',name:'Maderas'},
          {id:'Tapacantos',name:'Tapacantos'}
        ]
        break;
    }  
    let query = 'SELECT * FROM producto WHERE '+q_desactivado+q_temporada+q_codigo+q_descripcion+q_categoria+q_quiebre+q_bodega+' ORDER BY CODIGO_PRODUCTO limit '+filtro.limitA+','+filtro.limitB+';' 
    let query1 = 'SELECT count(*) as total FROM producto WHERE '+q_desactivado+q_temporada+q_codigo+q_descripcion+q_categoria+q_quiebre+q_bodega+';' 

    pool.getConnection( (err, connection) => {
        connection.query(query+query1 , (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({productos:rows[0],cuenta:rows[1],categoria:filtro_categoria})
            }
            else{
              console.log('Error-1 ' + err)
            }
        }) 
    })
  })

  /* Producto New */
  socket.on('allBodegaNew', (area,filtro,callback) => {
    

    let q_codigo = ''
    let q_descripcion = ''
    let q_categoria = ''
    let q_quiebre = ''
    let q_desactivado = ''
    let q_temporada = ' and TEMPORADA = "2"'
    let q_bodega = ''

    if(filtro.desactivado){q_desactivado = ' AND DESHABILITAR = "1"'}else{q_desactivado = ' and DESHABILITAR = "0"'}
    if(filtro.quiebre){q_quiebre = ' and STOCK_ACTUAL < STOCK_MINIMO'}
    if(filtro.codigo){q_codigo = ' and CODIGO_PRODUCTO like "%'+filtro.codigo +'%"'}
    if(filtro.descripcion){q_descripcion = ' and DESCRIPCION like "%'+filtro.descripcion +'%"'}
    if(filtro.categoria){q_categoria = ' and CATEGORIA like "%'+filtro.categoria +'%"'}

    switch(area) {
    case 'insumo':
        q_bodega = ' and CATEGORIA IN("1","2","3")'
        filtro_categoria = [
          {id:'1',name:'Superficies curvas'},
          {id:'2',name:'Superficies Rectas'},
          {id:'3',name:'Almacenamientos'}
        ]
        break;
    case 'terminado':
        q_bodega = ' and CATEGORIA IN("4","5","6")'
        filtro_categoria = [
          {id:'4',name:'Cajoneras'},
          {id:'5',name:'Muebles de linea'},
          {id:'6',name:'Parte y piezas'}
        ]
        break;
    case 'importado':
        q_bodega = ' and CATEGORIA IN("7","8","9")'
        filtro_categoria = [
          {id:'7',name:'Pantalla'},
          {id:'8',name:'Soportes'},
          {id:'9',name:'Faldon'}
        ]
        break;
    case 'sillas':
        q_bodega = ' and CATEGORIA IN("10","11","12")'
        filtro_categoria = [
          {id:'10',name:'Insumo'},
          {id:'11',name:'Herraje'},
          {id:'12',name:'Recurso'}
        ]
        break;
    }  
    let query = 'SELECT producto.CODIGO_PRODUCTO, producto.DESCRIPCION, producto.STOCK_ACTUAL, producto.STOCK_MAXIMO, producto.STOCK_MINIMO, categoria_producto.nombre as CATEGORIA FROM producto, categoria_producto WHERE producto.CATEGORIA = categoria_producto.id_categoria_producto '+q_desactivado+q_temporada+q_codigo+q_descripcion+q_categoria+q_quiebre+q_bodega+' ORDER BY CODIGO_PRODUCTO limit '+filtro.limitA+','+filtro.limitB+';' 
    let query1 = 'SELECT count(*) as total FROM producto , categoria_producto WHERE producto.CATEGORIA = categoria_producto.id_categoria_producto '+q_desactivado+q_temporada+q_codigo+q_descripcion+q_categoria+q_quiebre+q_bodega+';' 

    pool.getConnection( (err, connection) => {
        connection.query(query+query1 , (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({productos:rows[0],cuenta:rows[1],categoria:filtro_categoria})
            }
            else{
              console.log('Error-1 ' + err)
            }
        }) 
    })
  })

  /* Producto Son */
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

  /* Transito */
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


  /* Vale */
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

})

}