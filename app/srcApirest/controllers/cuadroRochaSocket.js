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
 			console.log('llego')

/*let insert = `INSERT INTO producto (CODIGO_PRODUCTO, DESCRIPCION, CATEGORIA, CODIGO_GENERICO, FAMILIA, TEMPORADA, 
						GESTION, DIMENSION, RELACION, TIPO, TERMINO,
						RUTA, RUTA1, RUTA2, CAD_2D, CAD_3D,
						POSICION, CUERPO, FRENTE, CANTO, TRASCARA) VALUES ` */

let array = []
let valA0 = ''
let valA1 = ''
let valR0 = ''
let valR1 = ''

		_.forEach(lista, (v, k) => {
			valA0 = ''
			valA1 = ''
			valR0 = ''
			valR1 = ''
			/*insert += `('${v.cod}','${v.des}','${v.cat}','','generico','2',
					   '${v.pais}','${v.proveedor}','${v.modelo}','${v.mecanismo}','${v.respaldo}',
					   '${v.cod}_img.jpg','${v.cod}_img_1.jpg','${v.producto}','${v.cod}.dwg','${v.cod}.dwg',`*/

			//insert += ( Array.isArray(v.asiento) ) ? `'${v.asiento[0]}','${v.asiento[1]}',` : `'${v.asiento}','0',`

			if (Array.isArray(v.asiento)) {
				valA0 = v.asiento[0]
				valA1 = v.asiento[1]
			} else {
				valA0 = v.asiento
				valA1 = 0
			}

			//insert += (Array.isArray(v.respaldocolor)) ? `'${v.respaldocolor[0]}','${v.respaldocolor[1]}',` : `'${v.respaldocolor}','0',`

			if (Array.isArray(v.respaldocolor)) {
				valR0 = v.respaldocolor[0]
				valR1 = v.respaldocolor[1]
			} else {
				valR0 = v.respaldocolor
				valR1 = 0
			}

			//insert += `'${v.estructura}'),`

			array.push( [ v.cod,v.des,v.cat,``,`generico`,`2`,
					   	  v.pais,v.proveedor,v.modelo,v.mecanismo,v.respaldo,
					   `${v.cod}_img.jpg`,`${v.cod}_img_1.jpg`,`${v.producto}`,`${v.cod}.dwg`,`${v.cod}.dwg`,
					   valA0, valA1, valR0, valR1, v.estructura ] )


			_.forEach(v.hijos, (vv, kk) => {


				/*insert += `('${vv.cod}','${vv.des}','${vv.cat}','${v.cod}','silla','2',
						   '${v.pais}','${v.proveedor}','${v.modelo}','${v.mecanismo}','${v.respaldo}',
						   '${vv.cod}_img.jpg','${vv.cod}_img_1.jpg','${v.producto}','${vv.cod}.dwg','${vv.cod}.dwg',
						   '${vv.asiento}','0','${vv.respaldocolor}','0','${vv.estructura}'),`*/

			array.push( [ vv.cod,vv.des,vv.cat,v.cod,`silla`,`2`,
						   v.pais,v.proveedor,v.modelo,v.mecanismo,v.respaldo,
						   `${vv.cod}_img.jpg`,`${vv.cod}_img_1.jpg`,v.producto,`${vv.cod}.dwg`,`${vv.cod}.dwg`,
						   vv.asiento,`0`,vv.respaldocolor,`0`,vv.estructura ] )


			})

		})

//insert = insert.substring(0, insert.length-1)


//callback( insert )


    pool.getConnection( (err, connection) => {
          connection.query(`INSERT INTO producto (CODIGO_PRODUCTO, DESCRIPCION, CATEGORIA, CODIGO_GENERICO, FAMILIA, TEMPORADA, 
							GESTION, DIMENSION, RELACION, TIPO, TERMINO,
							RUTA, RUTA1, RUTA2, CAD_2D, CAD_3D,
							POSICION, CUERPO, FRENTE, CANTO, TRASCARA) VALUES ?`, [array], (err, rows, fields) => {
            connection.release()
            if (err) console.log( err ) 
            callback( rows )
          })
    })


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



`INSERT INTO producto (CODIGO_PRODUCTO, DESCRIPCION, CATEGORIA, CODIGO_GENERICO, FAMILIA, TEMPORADA, 
						GESTION, DIMENSION, RELACION, TIPO, TERMINO,
						POSICION, CUERPO, FRENTE, CANTO, TRASCARA,
						RUTA, RUTA1, RUTA2, CAD_2D, CAD_3D,
						POSICION, CUERPO, FRENTE, CANTO, TRASCARA) VALUES ${insert}`




*/