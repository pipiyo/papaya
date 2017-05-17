const jwt = require('jwt-simple')
const moment = require('moment')
const User = require('../models/user')
const pokemonGif = require('pokemon-gif')

const Promise = require('promise')

module.exports = (io, request) => {

  io
  .of('/login')
  .on('connection', (socket) => {

    socket.on('checkUser', (token, callback) => {
////////

const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, global.secret)

      if (payload.exp <= moment().unix()) {
        reject({
          status: 103,
          message: 'Su tiempo de sesion a expirado, no se duerma!'
        })
      }

      payload.exp = moment().add(14, 'days').unix()
   
      resolve({
          status: 101,
          token: jwt.encode(payload, global.secret),
          message: 'Todo bien papu'
        })
    
    } catch (err) {
      reject({
          status: 102,
          message: 'Tenga la amabilidad de loguearse c:'
        })
    }
})
  decoded
    .then(response => {
      callback(response)
    })
    .catch(response => {
      callback(response)
    })


/*
      if (global.token == token && !(token == null) ) {
        callback(true)
      } else{
        global.token = null
        global.userName = null
        callback(false)
      }
*/

/////////




    })

    socket.on('checkToken', (token, callback) => {




const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, global.secret)

      if (payload.exp <= moment().unix()) {
        reject({
          status: 103,
          message: 'El token ha expirado'
        })
      }

      payload.exp = moment().add(14, 'days').unix()
   
      resolve({
          status: 101,
          token: jwt.encode(payload, global.secret),
          message: 'El token es valido'
        })
    
    } catch (err) {
      reject({
          status: 102,
          message: 'El token es invalido'
        })
    }
})
  decoded
    .then(response => {
      callback(response)
    })
    .catch(response => {
      callback(response)
    })






/*
      if (global.token == token && !(token == null) ) {
        callback(true)
      } else{
        global.token = null
        global.userName = null
        callback(false)
      }
*/   
    })

    socket.on('login', ( data, callback, token = null) => {

let userScope = data.userName.toLowerCase()
userScope = userScope.trim()

User.
  findOne({ name: userScope }).
  exec( (err, user) => {
    if (err) throw err

    if (user) {

      if (user.password == data.pass) {

        token = jwt.encode( { 
                              name: `${user.name}`, 
                              type: `${user.type}`, 
                              iat: moment().unix(),
                              exp: moment().add(14, 'days').unix(),
                              profile_picture: `${user.profile_picture}` }, 
                              global.secret)

        global.token = token
        global.userName = user.name

        callback({ 
                    token: token,
                    name: `${user.name}`, 
                    type: `${user.type}`, 
                    full_name: `${user.employee.name} ${user.employee.last_name} ${user.employee.second_name}`, 
                    profile_picture: `${user.profile_picture}`
                  })
      

      } else {
        callback(false)
      }

    } else {

        request.post({
          uri: process.env.apiLogin,
          form: {
            user: userScope,
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
                                  profile_picture: `http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/42/42ea908a8b3eac00fdff247abdb6420a21933839_full.jpg`,
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

                  token = jwt.encode( { 
                                        name: `${doc.name}`, 
                                        type: `${doc.type}`, 
                                        iat: moment().unix(),
                                        exp: moment().add(14, 'days').unix(),
                                        profile_picture: `${doc.profile_picture}` }, 
                                        global.secret )

                  global.token = token
                  global.userName = doc.name

                    callback({ 
                                token: token,
                                name: `${doc.name}`, 
                                type: `${doc.type}`, 
                                full_name: `${doc.employee.name} ${doc.employee.last_name} ${doc.employee.second_name}`, 
                                profile_picture: `${doc.profile_picture}` 
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