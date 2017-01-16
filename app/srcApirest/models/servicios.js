let mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.createConnection("mongodb://localhost/papaya")

let Schema = mongoose.Schema

let servicioSchema = new Schema({

     img: String, 
     name: String, 
     icon: String, 
     item: []


})

let servicio = mongoose.model('servicio', servicioSchema)

module.exports = servicio