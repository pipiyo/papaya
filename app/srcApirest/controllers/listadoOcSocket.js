const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/listadoOc')
  .on('connection', (socket) => {


  /* Listar Producto */
  socket.on('allOc', (filtro,callback) => {

    let q_codigo = ""
    let q_proveedor = ""
    let q_estado = ""
    let q_rocha = ""
    let q_fecha = ""

    if(filtro.codigo){q_codigo = ' and CODIGO_OC like "%'+filtro.codigo +'%"'}
    if(filtro.proveedor){q_proveedor = ' and NOMBRE_PROVEEDOR like "%'+filtro.proveedor +'%"'}
    if(filtro.rocha){q_rocha = ' and ROCHA_PROYECTO like "%'+filtro.rocha +'%"'}
    if(filtro.fechaInicio != null && filtro.fechaEntrega != null){q_fecha = ' and FECHA_CONFIRMACION BETWEEN "'+ filtro.fechaInicio.substring(0,10) +'" and "'+ filtro.fechaEntrega.substring(0,10) +'"'}
    q_estado = ' ESTADO = "'+filtro.estado+'"'

    let query = `select * from orden_de_compra where ${q_estado} ${q_codigo} ${q_rocha} ${q_proveedor} ${q_fecha}  limit ${filtro.limit} , ${filtro.limitB} ;`
    let query1 = `select count(*) as total from  orden_de_compra where ${q_estado} ${q_codigo} ${q_rocha} ${q_proveedor} ${q_fecha} ;`
    let query2 = `select distinct RAZON_SOCIAL from proveedor order by RAZON_SOCIAL`

    pool.getConnection( (err, connection) => {
        connection.query(query+query1+query2, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({oc:rows[0], cuenta:rows[1], proveedor:rows[2]})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })



})

}