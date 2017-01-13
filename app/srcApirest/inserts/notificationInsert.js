const User = require('../models/user')

module.exports = (notification) => {

           User.
              findOne({ name: global.userName }).
              exec( (err, user) => {
                if (err) console.log( err )
               
                  notification.user = user._id

                  notification.save().then( (doc) => {
                  }, (error) => {
                    console.log( error )
                  })

              })

}