const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/listadoVale')
  .on('connection', (socket) => {


  /* Listar Producto */
  socket.on('allVale', (filtro,callback) => {

    let q_codigo = ""
    let q_departamento = ""
    let q_estado = ""
    let q_rocha = ""
    let q_fecha = ""

    if(filtro.codigo){q_codigo = ' and COD_VALE like "%'+filtro.codigo +'%"'}
    if(filtro.departamento){q_departamento = ' and DEPARTAMENTO like "%'+filtro.departamento +'%"'}
    if(filtro.rocha){q_rocha = ' and CODIGO_PROYECTO like "%'+filtro.rocha +'%"'}
    if(filtro.fechaInicio != null && filtro.fechaEntrega != null){q_fecha = ' and FECHA_TERMINO BETWEEN "'+ filtro.fechaInicio.substring(0,10) +'" and "'+ filtro.fechaEntrega.substring(0,10) +'"'}
    q_estado = ' ESTADO = "'+filtro.estado+'"'

    let query = `select vale_emision.COD_VALE, vale_emision.CODIGO_PROYECTO, vale_emision.DEPARTAMENTO, vale_emision.CODIGO_PROYECTO, vale_emision.FECHA, vale_emision.FECHA_TERMINO, vale_emision.CODIGO_USUARIO, vale_emision.ESTADO, usuario.NOMBRE_USUARIO from vale_emision LEFT JOIN usuario on usuario.CODIGO_USUARIO = vale_emision.CODIGO_USUARIO where ${q_estado} ${q_codigo} ${q_rocha} ${q_departamento} ${q_fecha} order by vale_emision.COD_VALE DESC  limit ${filtro.limit} , ${filtro.limitB} ;`
    let query1 = `select count(*) as total from  vale_emision where ${q_estado} ${q_codigo} ${q_rocha} ${q_departamento} ${q_fecha} ;`
    pool.getConnection( (err, connection) => {
        connection.query(query+query1, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({vale:rows[0], cuenta:rows[1]})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })



})

}