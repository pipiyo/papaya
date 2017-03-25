const pool = require('../models/connection')
const cuadroRochaSearch = require('../searchs/cuadroRochaSearch')
const _ = require('lodash')

module.exports = (io) => {

  io
  .of('/cuadroRocha')
  .on('connection', (socket) => {

	  socket.on('getRochaFiltro', (form, callback) => {

/////////////////////////////////////

		cuadroRochaSearch( pool, form, callback )

//////////////////////////////////////

	  }),//on getRochasFiltro

	  socket.on('getRochas', (form, callback) => {

		cuadroRochaSearch( pool, form, callback )

	  })//on getRochas

	  socket.on('sillas', (lista, callback) => {


let insert = `INSERT INTO producto (CODIGO_PRODUCTO, DESCRIPCION, CATEGORIA, CODIGO_GENERICO, FAMILIA, TEMPORADA, 
						GESTION, DIMENSION, RELACION, TIPO, TERMINO,
						RUTA, RUTA1, RUTA2, CAD_2D, CAD_3D,
						POSICION, CUERPO, FRENTE, CANTO, TRASCARA) VALUES ` 

		_.forEach(lista, (v, k) => {

			insert += `('${v.cod}','${v.des}','${v.cat}','','generico','2',
					   '${v.pais}','${v.proveedor}','${v.modelo}','${v.mecanismo}','${v.respaldo}',
					   '${v.cod}_img.jpg','${v.cod}_img_1.jpg','${v.cod}_img_2.jpg','${v.cod}.dwg','${v.cod}.dwg',`


			insert += ( Array.isArray(v.asiento) ) ? `'${v.asiento[0]}','${v.asiento[1]}',` : `'${v.asiento}','0',`

			insert += (Array.isArray(v.respaldocolor)) ? `'${v.respaldocolor[0]}','${v.respaldocolor[1]}',` : `'${v.respaldocolor}','0',`

			insert += `'${v.estructura}'),`




			_.forEach(v.hijos, (vv, kk) => {


				insert += `('${vv.cod}','${vv.des}','${vv.cat}','${v.cod}','silla','2',
						   '${v.pais}','${v.proveedor}','${v.modelo}','${v.mecanismo}','${v.respaldo}',
						   '${vv.cod}_img.jpg','${vv.cod}_img_1.jpg','${vv.cod}_img_2.jpg','${vv.cod}.dwg','${vv.cod}.dwg',
						   '${vv.asiento}','0','${vv.respaldocolor}','0','${vv.estructura}'),`

			})

		})

insert = insert.substring(0, insert.length-1)

callback( insert )

/*
    pool.getConnection( (err, connection) => {
          connection.query(`INSERT INTO producto (CODIGO_PRODUCTO, DESCRIPCION, CATEGORIA, CODIGO_GENERICO, FAMILIA, TEMPORADA, 
						GESTION, DIMENSION, RELACION, TIPO, TERMINO,
						POSICION, CUERPO, FRENTE, CANTO, TRASCARA,
						RUTA, RUTA1, RUTA2, CAD_2D, CAD_3D,
						POSICION, CUERPO, FRENTE, CANTO, TRASCARA) VALUES ${insert}`, (err, rows, fields) => {
            connection.release()
            if (err) console.log( err ) 
            callback( rows )
          })
    })
*/

	  })//on getRochas


 })//connection socket

}//module.exports



/*
	      pool.getConnection( (err, connection) => {
	          connection.query(query+query1+query2, (err, rows, fields) => {
	              connection.release()
	              if (!err)
	                resolve( callback({ sub:rows[0], total:rows[1], ejecutivo:rows[2]}) )
	              else
	                reject( console.log('Error ' + err) )
	          }) 
	      })
*/