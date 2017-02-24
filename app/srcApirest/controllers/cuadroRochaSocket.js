const pool = require('../models/connection')
const _ = require('lodash')

module.exports = (io) => {




  io
  .of('/cuadroRocha')
  .on('connection', (socket) => {


	  socket.on('getRochaFiltro', (form, callback) => {

/////////////////////////////////////

	    pool.getConnection( (err, connection) => {
			connection.beginTransaction(function(err) {
			  if (err) { throw err }

/*
NOMBRE_CLIENTE = form.cliente
CODIGO_PROYECTO = form.rocha
NOMBRE_PROYECTO = form.proyecto
EJECUTIVO = form.ejecutivo
*/
		
let query

if (form.proyecto) {
	query = `SELECT DISTINCT NOMBRE_PROYECTO FROM proyecto WHERE NOMBRE_PROYECTO = '${form.proyecto}' `
} else {
	query = `SELECT DISTINCT NOMBRE_PROYECTO FROM proyecto WHERE NOMBRE_PROYECTO != '' `
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

	query += ` limit 50 `

			    let lista = { np: [],
			    			   cp:[],
			    			   cs: [],
			    			   css: null,
			    			   form: null }



			  connection.query(query, function (errorNombreProyecto, resultsNombreProyecto, fieldsNombreProyecto) {
			    if (errorNombreProyecto) {
			      return connection.rollback(function() {
			        
			      	callback( lista )

			        //throw errorNombreProyecto
			      })
			    }




			    let np = []
			    np[0] = [] 
				_.forEach(resultsNombreProyecto, (value, key) => {
				  np[0][key] = value.NOMBRE_PROYECTO
				  lista.np[key] = value.NOMBRE_PROYECTO
				})






			    connection.query(`SELECT proyecto.CODIGO_PROYECTO,  proyecto.NOMBRE_PROYECTO, proyecto.FECHA_INGRESO, proyecto.FECHA_ENTREGA
	FROM proyecto
	WHERE proyecto.NOMBRE_PROYECTO IN( ? )
	AND proyecto.NOMBRE_PROYECTO != ''`, np,  function (errorCodigoProyecto, resultsCodigoProyecto, fieldsCodigoProyecto) {
			      if (errorCodigoProyecto) {
			        return connection.rollback(function() {

			        	callback( lista )

			          //throw errorCodigoProyecto
			        })
			      }

						    let cp = []
						    cp[0] = []
							_.forEach(resultsCodigoProyecto, (value, key) => {
							  cp[0][key] = value.CODIGO_PROYECTO
							  lista.cp[key] = { np: value.NOMBRE_PROYECTO, cp: value.CODIGO_PROYECTO, cs: [], show: false,
							  					ingreso: value.FECHA_INGRESO,
							  					entrega: value.FECHA_ENTREGA }
							})

						    connection.query(`SELECT servicio.CODIGO_SERVICIO,  servicio.CODIGO_PROYECTO, servicio.FECHA_INICIO, servicio.FECHA_ENTREGA
	FROM servicio 
	WHERE servicio.CODIGO_PROYECTO IN( ? )`, cp,  function (errorCodigoServicio, resultsCodigoServicio, fieldsCodigoServicio) {
						      if (errorCodigoServicio) {
						        return connection.rollback(function() {
						        	callback( lista )
						          //throw errorCodigoServicio
						        })
						      }

								    let cs = []
								    cs[0] = []
									_.forEach(resultsCodigoServicio, (value, key) => {
									  cs[0][key] = value.CODIGO_SERVICIO
									  lista.cs[key] = { cs: value.CODIGO_SERVICIO, cp: value.CODIGO_PROYECTO,
									  					inicio: value.FECHA_INICIO,
									  					entrega: value.FECHA_ENTREGA }
									})



								    connection.query(`SELECT sub_servicio.CODIGO_SUBSERVICIO, sub_servicio.SUB_CODIGO_SERVICIO, sub_servicio.SUB_CODIGO_PROYECTO, sub_servicio.SUB_FECHA_INICIO, sub_servicio.SUB_FECHA_ENTREGA
			FROM sub_servicio 
			WHERE sub_servicio.SUB_CODIGO_SERVICIO IN( ? )`, cs,  function (errorCodigoSubServicio, resultsCodigoSubServicio, fieldsCodigoSubServicio) {
								      if (errorCodigoSubServicio) {
								        return connection.rollback(function() {
								        	callback( lista )
								          //throw errorCodigoSubServicio
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
                              //throw errorForm
                            })
                          }


                                connection.commit(function(err) {
                                  connection.release()
                                  if (err) {
                                    return connection.rollback(function() {
                                    	callback( lista )
                                      //throw err
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




//////////////////////////////////////

	  })




	  socket.on('getRochas', (callback) => {

	    pool.getConnection( (err, connection) => {
			connection.beginTransaction(function(err) {
			  if (err) { throw err }

			  connection.query(`SELECT DISTINCT NOMBRE_PROYECTO 
								FROM proyecto 
								WHERE NOMBRE_PROYECTO != ''
								LIMIT 50`, function (errorNombreProyecto, resultsNombreProyecto, fieldsNombreProyecto) {
			    if (errorNombreProyecto) {
			      return connection.rollback(function() {
			        throw errorNombreProyecto
			      })
			    }


			    let lista = { np: [],
			    			   cp:[],
			    			   cs: [],
			    			   css: null }

			    let np = []
			    np[0] = [] 
				_.forEach(resultsNombreProyecto, (value, key) => {
				  np[0][key] = value.NOMBRE_PROYECTO
				  lista.np[key] = value.NOMBRE_PROYECTO
				})

			    connection.query(`SELECT proyecto.CODIGO_PROYECTO, proyecto.NOMBRE_PROYECTO, proyecto.FECHA_INGRESO, proyecto.FECHA_ENTREGA
	FROM proyecto
	WHERE proyecto.NOMBRE_PROYECTO IN( ? )
	AND proyecto.NOMBRE_PROYECTO != ''`, np,  function (errorCodigoProyecto, resultsCodigoProyecto, fieldsCodigoProyecto) {
			      if (errorCodigoProyecto) {
			        return connection.rollback(function() {
			          throw errorCodigoProyecto
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
							  					entrega: value.FECHA_ENTREGA
							  					 }
							})

						    connection.query(`SELECT servicio.CODIGO_SERVICIO, servicio.CODIGO_PROYECTO, servicio.FECHA_INICIO, servicio.FECHA_ENTREGA
	FROM servicio 
	WHERE servicio.CODIGO_PROYECTO IN( ? )`, cp,  function (errorCodigoServicio, resultsCodigoServicio, fieldsCodigoServicio) {
						      if (errorCodigoServicio) {
						        return connection.rollback(function() {
						          throw errorCodigoServicio
						        })
						      }

								    let cs = []
								    cs[0] = []
									_.forEach(resultsCodigoServicio, (value, key) => {
									  cs[0][key] = value.CODIGO_SERVICIO
									  lista.cs[key] = { 
									  					cs: value.CODIGO_SERVICIO, 
									  					cp: value.CODIGO_PROYECTO,
									  					inicio: value.FECHA_INICIO,
									  					entrega: value.FECHA_ENTREGA
									  				}
									})

								    connection.query(`SELECT sub_servicio.CODIGO_SUBSERVICIO, sub_servicio.SUB_CODIGO_SERVICIO, sub_servicio.SUB_CODIGO_PROYECTO, sub_servicio.SUB_FECHA_INICIO, sub_servicio.SUB_FECHA_ENTREGA
			FROM sub_servicio 
			WHERE sub_servicio.SUB_CODIGO_SERVICIO IN( ? )`, cs,  function (errorCodigoSubServicio, resultsCodigoSubServicio, fieldsCodigoSubServicio) {
								      if (errorCodigoSubServicio) {
								        return connection.rollback(function() {
								          throw errorCodigoSubServicio
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
                              throw errorForm
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
  })//on getRochas

 })//connection socket

}//module.exports