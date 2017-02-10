let mongoose = require("mongoose")

mongoose.Promise = global.Promise

mongoose.createConnection("mongodb://localhost/papaya")

let Schema = mongoose.Schema

let trascaraSchema = new Schema({
	_id: Number,
	name: String,
	code: String
})

let trascara = mongoose.model('trascara', trascaraSchema)

module.exports = trascara

/*
{
	_id: 1,
	name: 'Pintura',
	code: 'P'
},
{
	_id: 2,
	name: 'Balance',
	code: 'B'
}
*/