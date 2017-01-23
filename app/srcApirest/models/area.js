let mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.createConnection("mongodb://localhost/papaya")

let Schema = mongoose.Schema

let areaSchema = new Schema({

     id_name: String,
     name: String,
     icon: {
     		color: String,
     		img: String
     }

})

let area = mongoose.model('area', areaSchema)

module.exports = area