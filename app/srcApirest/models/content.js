let mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.createConnection("mongodb://localhost/papaya")

let Schema = mongoose.Schema

let contentSchema = new Schema({

     name: String,
     icon: { 
     		 color: String,
     		 img: String
     		}, 
     items: [{
     			name: String,
     			path: String }]

})

let content = mongoose.model('content', contentSchema)

module.exports = content