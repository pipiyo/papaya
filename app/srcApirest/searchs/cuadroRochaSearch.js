const _ = require('lodash')

module.exports = ( pool, form, callback ) => {

	    pool.getConnection( (err, connection) => {
			connection.beginTransaction(function(err) {
			  if (err) { throw err }

let query
let limit = 50
if (form) {

			if (form.proyecto) {
				//query = `SELECT DISTINCT NOMBRE_PROYECTO AS NOMBRE FROM proyecto WHERE NOMBRE_PROYECTO = '${form.proyecto}' `
			
query = `SELECT DISTINCT proyecto.NOMBRE_PROYECTO AS NOMBRE 
		FROM proyecto WHERE NOMBRE_PROYECTO IN(SELECT madre.NOMBRE 
				FROM madre `


							if (form.estado) {
								query += ` WHERE madre.ESTADO = '${form.estado}'
											AND madre.NOMBRE = '${form.proyecto}' ) `
							}else{
								query += ` WHERE madre.ESTADO = 'EN PROCESO'
											AND madre.NOMBRE = '${form.proyecto}' `
							}



			} else {
				//query = `SELECT DISTINCT NOMBRE_PROYECTO AS NOMBRE FROM proyecto WHERE NOMBRE_PROYECTO != '' `
			
query = `SELECT DISTINCT proyecto.NOMBRE_PROYECTO AS NOMBRE 
		FROM proyecto WHERE NOMBRE_PROYECTO IN(SELECT madre.NOMBRE 
				FROM madre `


							if (form.estado) {
								query += ` WHERE madre.ESTADO = '${form.estado}' ) `
							}else{
								query += ` WHERE madre.ESTADO = 'EN PROCESO' ) `
							}



			}

			if (form.rocha) {
				query += ` AND CODIGO_PROYECTO = '${form.rocha}' `
			}

			if (form.cliente) {
				query += ` AND NOMBRE_CLIENTE = '${form.cliente}' `
			}

			if (form.ejecutivo) {
				query += ` AND EJECUTIVO = '${form.ejecutivo}' `
			}

			if (form.vermas == 0) {
				query += ` limit ${limit} `
			}else{
				query += ` limit ${ ( limit + form.vermas ) } `
			}
			


}else{
/*
	query = `SELECT DISTINCT NOMBRE_PROYECTO 
								FROM proyecto 
								WHERE NOMBRE_PROYECTO != ''
								LIMIT 50`


	query = `SELECT NOMBRE 
				FROM madre
				WHERE ESTADO = 'EN PROCESO'
				AND NOMBRE_PROYECTO = '${form.proyecto}' 
				LIMIT 50`



	query = `SELECT NOMBRE 
				FROM madre
				WHERE ESTADO = 'EN PROCESO'
				LIMIT 50`

*/
}





			    let lista = { np: [],
			    			   cp:[],
			    			   cs: [],
			    			   css: null }

			  connection.query(query, function (errorNombreProyecto, resultsNombreProyecto, fieldsNombreProyecto) {
			    if (errorNombreProyecto) {
			      return connection.rollback(function() {
			        callback( lista )
			      })
			    }

			    let np = []
			    np[0] = [] 
				_.forEach(resultsNombreProyecto, (value, key) => {
				  //np[0][key] = value.NOMBRE_PROYECTO
				  //lista.np[key] = value.NOMBRE_PROYECTO
				  np[0][key] = value.NOMBRE
				  lista.np[key] = value.NOMBRE
				})

			    connection.query(`SELECT 
			    						proyecto.CODIGO_PROYECTO, 
			    						proyecto.NOMBRE_PROYECTO, 
			    						proyecto.FECHA_INGRESO, 
			    						proyecto.FECHA_ENTREGA, 
			    						proyecto.FECHA_CONFIRMACION, 
			    						proyecto.ESTADO,
			    						proyecto.NOMBRE_CLIENTE,
			    						proyecto.EJECUTIVO
	FROM proyecto
	WHERE proyecto.NOMBRE_PROYECTO IN( ? )
	AND proyecto.NOMBRE_PROYECTO != ''`, np,  function (errorCodigoProyecto, resultsCodigoProyecto, fieldsCodigoProyecto) {
			      if (errorCodigoProyecto) {
			        return connection.rollback(function() {
			          callback( lista )
			        })
			      }

						    let cp = []
						    cp[0] = []
							_.forEach(resultsCodigoProyecto, (value, key) => {
							  cp[0][key] = value.CODIGO_PROYECTO
							  lista.cp[key] = { 
							  					np: value.NOMBRE_PROYECTO, 
							  					cp: value.CODIGO_PROYECTO, 
							  					cs: [], 
							  					show: false,
							  					ingreso: value.FECHA_INGRESO,
							  					entrega: value.FECHA_CONFIRMACION,
							  					estado: value.ESTADO,
							  					cliente: value.NOMBRE_CLIENTE,
							  					ejecutivo: value.EJECUTIVO,
							  					dia: null
							  					 }
							})

						    connection.query(`SELECT servicio.CODIGO_SERVICIO, 
						    						 servicio.CODIGO_PROYECTO, 
						    						 servicio.FECHA_INICIO, 
						    						 servicio.FECHA_ENTREGA, 
						    						 servicio.DESCRIPCION, 
						    						 servicio.ESTADO,
						    						 servicio.NOMBRE_SERVICIO,
						    						 servicio.DESCRIPCION
												FROM servicio 
												WHERE servicio.NOMBRE_SERVICIO NOT IN('OC','FI','BODEGA')  
												AND servicio.CODIGO_PROYECTO IN( ? )
												ORDER BY servicio.NOMBRE_SERVICIO ASC`, cp,  function (errorCodigoServicio, resultsCodigoServicio, fieldsCodigoServicio) {
						      if (errorCodigoServicio) {
						        return connection.rollback(function() {
						          callback( lista )
						        })
						      }

								    let cs = []
								    cs[0] = []
									_.forEach(resultsCodigoServicio, (value, key) => {	
									  cs[0][key] = value.CODIGO_SERVICIO
									  lista.cs[key] = { 
									  					cs: value.CODIGO_SERVICIO, 
									  					csnombre: value.DESCRIPCION,
									  					cp: value.CODIGO_PROYECTO,
									  					inicio: value.FECHA_INICIO,
									  					entrega: value.FECHA_ENTREGA,
									  					estado: value.ESTADO,
									  					nombre: value.NOMBRE_SERVICIO,
									  					descripcion: value.DESCRIPCION,
									  					dia: null
									  				}
									})

								    connection.query(`SELECT 
								    						sub_servicio.CODIGO_SUBSERVICIO, 
								    						sub_servicio.SUB_CODIGO_SERVICIO, 
								    						sub_servicio.SUB_CODIGO_PROYECTO, 
								    						sub_servicio.SUB_FECHA_INICIO, 
								    						sub_servicio.SUB_FECHA_ENTREGA, 
								    						sub_servicio.SUB_ESTADO,
								    						sub_servicio.SUB_NOMBRE_SERVICIO AS nombre,
								    						sub_servicio.SUB_DESCRIPCION
			FROM sub_servicio 
			WHERE sub_servicio.SUB_CODIGO_SERVICIO IN( ? )`, cs,  function (errorCodigoSubServicio, resultsCodigoSubServicio, fieldsCodigoSubServicio) {
								      if (errorCodigoSubServicio) {
								        return connection.rollback(function() {
								          callback( lista )
								        })
								      }

/////////////////////////////

						lista.css = resultsCodigoSubServicio


                        connection.query(`select distinct empleado.NOMBRES, empleado.APELLIDO_PATERNO, empleado.APELLIDO_MATERNO 
                          from empleado, usuario, grupo, grupo_usuario 
                          where empleado.RUT = usuario.RUT and usuario.CODIGO_USUARIO = grupo_usuario.CODIGO_USUARIO and grupo_usuario.CODIGO_GRUPO =  grupo.ID_GRUPO and grupo.INICIALES_GRUPO = "VEN" 
                          order by empleado.NOMBRES`,  function (errorForm, resultsForm, fieldsForm) {
                          if (errorForm) {
                            return connection.rollback(function() {
                              callback( lista )
                            })
                          }


                                connection.commit(function(err) {
                                  connection.release()
                                  if (err) {
                                    return connection.rollback(function() {
                                      throw err
                                    })
                                  }
                  
                                    lista.form = resultsForm


                                    callback( lista )
                                  })

                        })//query form


/////////////////////////////



								    })//query CodigoSubServicio

						    })//query CodigoServicio


			    })//query CodigoProyecto 
			  
			  })//query NombreProyecto 

			})//connection.beginTransaction

	  })//pool.getConnection



}//module.exports