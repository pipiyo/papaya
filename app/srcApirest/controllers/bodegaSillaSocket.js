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

  /* Buscar Silla */
  socket.on( 'buscarBodegaSilla', ( codigo, descripcion, categoria, callback ) => {
////////////////////
    let promesa = new Promise( (resolve, reject) => {  
        
		let buscar_codigo = (codigo.trim().length > 0) ? ` AND producto.CODIGO_PRODUCTO = '${codigo.trim()}' ` : ` `
		let buscar_descripcion = (descripcion.trim().length > 0) ? ` AND producto.DESCRIPCION = '${descripcion.trim()}' ` : ` `
		let buscar_categoria = (categoria.trim().length > 0) ? ` = ${categoria} ` : ` IN(20,21) `

        let query = `SELECT producto.CODIGO_PRODUCTO, 
        					producto.DESCRIPCION, 
        					categoria_producto.nombre as CATEGORIA, 
        					producto.CATEGORIA as CODIGO_CATEGORIA 
        					FROM producto, categoria_producto 
        					WHERE producto.CATEGORIA = categoria_producto.id_categoria_producto 
        					AND producto.CATEGORIA ${buscar_categoria}
        					${buscar_descripcion}
        					${buscar_codigo}
        					AND producto.FAMILIA = 'generico' limit 50;` 
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
        					AND producto.CATEGORIA ${buscar_categoria}
        					${buscar_descripcion}
        					${buscar_codigo}
        					AND producto.FAMILIA = 'generico' limit 50;` 
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