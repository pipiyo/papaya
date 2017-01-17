let mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.createConnection("mongodb://localhost/papaya")

let Schema = mongoose.Schema

let areaSchema = new Schema({

     img: String, 
     name: String, 
     icon: String, 
     item: [{
     		nombre: String,
     		ruta: String }]

})

let area = mongoose.model('area', areaSchema)

module.exports = area