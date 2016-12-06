const jwt = require('jwt-simple')

module.exports = (token) => {
        
            try {

              token = JSON.parse(token)

              let decode = jwt.decode(token, 'xxx')

              return decode

            } catch (err) {
              throw err
            }

}