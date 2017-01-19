const User = require('../models/user')
const Area = require('../models/area')

module.exports = (notification, areaForm) => {
           User.
              findOne({ name: global.userName }).
              exec( (err, user) => {
                if (err) console.log( err )
 
                            Area.
                                findOne({ id_name: areaForm }).
                                exec( (err, area) => {
                                  if (err) console.log( err )

                                      notification.user = user._id
                                      notification.area = area._id
                                      notification.read_by[0] = global.userName
                                      notification.save().then( (doc) => {
                                      }, (error) => {
                                        console.log( error )
                                      })

                                    return true
                                })

              })
}