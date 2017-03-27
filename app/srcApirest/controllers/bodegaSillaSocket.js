const pool = require('../models/connection')
const Promise = require('promise')


module.exports = (io) => {

  io
  .of('/bodega-silla')
  .on('connection', (socket) => {


  /* Silla */
  socket.on( 'getBodegaSilla', ( callback ) => {
////////////////////
    let promesa = new Promise( (resolve, reject) => {  
        let query = `SELECT producto.CODIGO_PRODUCTO, 
        					producto.DESCRIPCION, 
        					categoria_producto.nombre as CATEGORIA, 
        					producto.CATEGORIA as CODIGO_CATEGORIA 
        					FROM producto, categoria_producto 
        					WHERE producto.CATEGORIA = categoria_producto.id_categoria_producto 
        					AND producto.CATEGORIA IN(20,21)
        					AND producto.FAMILIA = 'generico' limit 50;` 

        let query1 = `SELECT count(producto.CODIGO_PRODUCTO) as total
                  FROM producto, categoria_producto 
                  WHERE producto.CATEGORIA = categoria_producto.id_categoria_producto 
                  AND producto.CATEGORIA IN(20,21)
                  AND producto.FAMILIA = 'generico'` 

        pool.getConnection( (err, connection) => {
            connection.query( query+query1 , (err, rows, fields) => {
                connection.release()
                if (!err){
                  resolve( {productos:rows[0],cuenta:rows[1]} )
                }else{
                	reject( err )
                }
            }) 
        })     
    })
    promesa.then( producto => {
    		callback( producto )
    }).catch( rason => console.log(rason) )
////////////////
  })



  /* Buscar Silla */
  socket.on( 'buscarBodegaSilla', ( codigo, descripcion, categoria, producto, pais, proveedor, mecanismo, respaldo, limita, limitb, callback ) => {
////////////////////
    let promesa = new Promise( (resolve, reject) => {  
		let buscar_codigo = (codigo.trim().length > 0) ? ` AND producto.CODIGO_PRODUCTO = '${codigo.trim()}' ` : ` `
		let buscar_descripcion = (descripcion.trim().length > 0) ? ` AND producto.DESCRIPCION = '${descripcion.trim()}' ` : ` `
		let buscar_categoria = (categoria.trim().length > 0) ? ` = '${categoria}' ` : ` IN(20,21) `


let buscar_producto = (producto.trim().length > 0) ? ` AND producto.RUTA2 = '${producto.trim()}' ` : ` `

let buscar_pais = (pais.trim().length > 0) ? ` AND producto.GESTION = '${pais.trim()}' ` : ` `

let buscar_proveedor = (proveedor.trim().length > 0) ? ` AND producto.DIMENSION = '${proveedor.trim()}' ` : ` `

let buscar_mecanismo = (mecanismo.trim().length > 0) ? ` AND producto.TIPO = '${mecanismo.trim()}' ` : ` `

let buscar_respaldo = (respaldo.trim().length > 0) ? ` AND producto.TERMINO = '${respaldo.trim()}' ` : ` `


        let query = `SELECT producto.CODIGO_PRODUCTO, 
        					producto.DESCRIPCION, 
        					categoria_producto.nombre as CATEGORIA, 
        					producto.CATEGORIA as CODIGO_CATEGORIA 
        					FROM producto, categoria_producto 
        					WHERE producto.CATEGORIA = categoria_producto.id_categoria_producto 
        					AND producto.CATEGORIA ${buscar_categoria}
                  ${buscar_producto}
                  ${buscar_pais}
                  ${buscar_proveedor}
                  ${buscar_mecanismo}
                  ${buscar_respaldo}
        					${buscar_descripcion}
        					${buscar_codigo}
        					AND producto.FAMILIA = 'generico'
                  AND producto.TEMPORADA = '2' limit ${limita}, ${limitb};` 

          let query1 = `SELECT count(producto.CODIGO_PRODUCTO) as total
                  FROM producto, categoria_producto 
                  WHERE producto.CATEGORIA = categoria_producto.id_categoria_producto 
                  AND producto.CATEGORIA ${buscar_categoria}
                  ${buscar_producto}
                  ${buscar_pais}
                  ${buscar_proveedor}
                  ${buscar_mecanismo}
                  ${buscar_respaldo}
                  ${buscar_descripcion}
                  ${buscar_codigo}
                  AND producto.FAMILIA = 'generico'
                  AND producto.TEMPORADA = '2';` 

        pool.getConnection( (err, connection) => {
            connection.query( query+query1 , (err, rows, fields) => {
                connection.release()
                if (!err){
                  resolve( {productos:rows[0],cuenta:rows[1]} )
                }else{
                	reject( err )
                }
            }) 
        })     
    })
    promesa.then( producto => {
    		callback( producto )
    }).catch( rason => console.log(rason) )
////////////////
  })


  /* Buscar Hijo Silla */
  socket.on( 'buscarHijoSilla', ( codigo, callback ) => {
////////////////////
    let promesa = new Promise( (resolve, reject) => {  

        let query = `SELECT producto.CODIGO_PRODUCTO, 
        					producto.DESCRIPCION, 
        					categoria_producto.nombre as CATEGORIA, 
        					producto.CATEGORIA as CODIGO_CATEGORIA 
        					FROM producto, categoria_producto 
        					WHERE producto.CATEGORIA = categoria_producto.id_categoria_producto 
        					AND producto.CODIGO_GENERICO = '${codigo}';` 
        pool.getConnection( (err, connection) => {
            connection.query( query, (err, rows, fields) => {
                connection.release()
                if (!err){
                  //callback({productos:rows[0],cuenta:rows[1]})
                  resolve( rows )
                }else{
                	reject( err )
                }
            }) 
        })     
    })
    promesa.then( producto => {
    		callback( producto )
    }).catch( rason => console.log(rason) )
////////////////
  })

  /* Filtro Hijo Silla */
  socket.on( 'filtroHijoSilla', ( generico, codigo, descripcion, callback ) => {
////////////////////
    let promesa = new Promise( (resolve, reject) => {  
        
    let buscar_codigo = (codigo.trim().length > 0) ? ` AND producto.CODIGO_PRODUCTO = '${codigo.trim()}' ` : ` `
    let buscar_descripcion = (descripcion.trim().length > 0) ? ` AND producto.DESCRIPCION = '${descripcion.trim()}' ` : ` `

        let query = `SELECT producto.CODIGO_PRODUCTO, 
                  producto.DESCRIPCION, 
                  categoria_producto.nombre as CATEGORIA, 
                  producto.CATEGORIA as CODIGO_CATEGORIA 
                  FROM producto, categoria_producto 
                  WHERE producto.CATEGORIA = categoria_producto.id_categoria_producto 
                  ${buscar_descripcion}
                  ${buscar_codigo}
                  AND producto.CODIGO_GENERICO = '${generico}';` 
        pool.getConnection( (err, connection) => {
            connection.query( query , (err, rows, fields) => {
                connection.release()
                if (!err){
                  //callback({productos:rows[0],cuenta:rows[1]})
                  resolve( rows )
                }else{
                  reject( err )
                }
            }) 
        })     
    })
    promesa.then( producto => {
        callback( producto )
    }).catch( rason => console.log(rason) )
////////////////
  })



})


}