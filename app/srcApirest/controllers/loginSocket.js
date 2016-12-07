const jwt = require('jwt-simple')
const moment = require('moment')
const User = require('../models/user')
const Userr = require('../models/user')

module.exports = (io, request) => {

  io
  .of('/login')
  .on('connection', (socket) => {

    socket.on('login', ( data, callback) => {

User.
  findOne({ name: data.userName }).
  exec( (err, user) => {
    if (err) throw err

    if (user) {

      if (user.password == data.pass) {


        callback({ 
                    token: jwt.encode( { name: `${user.name}`, type: `${user.type}`, expire: `${moment().format('h:mm:ss')}` }, 'xxx'),
                    name: `${user.name}`, type: `${user.type}`, nombre_completo: `${user.employee.name} ${user.employee.last_name} ${user.employee.second_name}`
                  })
      

      } else {
        callback(false)
      }

    } else {

        request.post({
          uri: process.env.apiLogin,
          form: {
            user: data.userName,
            pass: data.pass
          }
        }, (error, response, auht) => {
          if (error) throw error
            auht = JSON.parse(auht)
          if(auht.on){


            let user = new User({ 
                                  name: auht.name,
                                  password: data.pass,
                                  type: auht.type,
                                  profile_picture: `http://pokeapi.co/media/img/${Math.floor(Math.random() * 718) + 1}.png`,
                                  employee: {
                                    rut: auht.employee.rut,
                                    name: auht.employee.name,
                                    last_name: auht.employee.last_name,
                                    second_name: auht.employee.second_name,
                                    email: auht.employee.email,
                                    phone: auht.employee.phone,
                                    mobile: auht.employee.mobile,
                                    department: auht.employee.department,
                                    distric: auht.employee.distric,
                                    nationality: auht.employee.nationality,
                                    position: auht.employee.position,
                                    address: auht.employee.address
                                  }
                                  })

                  user.save().then( (doc) => {

                    callback({ 
                                token: jwt.encode( { name: `${doc.name}`, type: `${doc.type}`, expire: `${moment().format('h:mm:ss')}` }, 'xxx'),
                                name: `${doc.name}`, type: `${doc.type}`, nombre_completo: `${doc.employee.name} ${doc.employee.last_name} ${doc.employee.second_name}`
                              })


                  }, (error) => {
                    console.log( error )
                    callback(false)
                  })


          }else{

            callback(false)

          }
        })

    }

  } )




/*
        request.post({
          uri: process.env.apiLogin,
          form: {
            user: data.userName,
            pass: data.pass
          }
        }, (error, response, auht) => {
          if (error) throw error
            auht = JSON.parse(auht)
            console.log( auht )
          if(auht.on){
            
            let token = { token: jwt.encode( { name: `${auht.name}`, type: `${auht.type}`, expire: `${moment().format('h:mm:ss')}` }, 'xxx'), name: `${auht.name}`, type: `${auht.type}`}

            callback(token)
          }else{
            callback(false)
          }
        })
*/



    })

/*
    socket.on('checkUser', (token, callback) => {

        token = JSON.parse(token)
        
          if (token) {
            try {
              let decode = jwt.decode(token, 'xxx')

              callback(token)

            } catch (err) {
              return callback(false)
            }
          } else {
            callback(false)
          }
    })
*/

  })

}