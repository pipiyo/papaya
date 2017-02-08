let mongoose = require("mongoose")

mongoose.Promise = global.Promise

mongoose.createConnection("mongodb://localhost/papaya")

let Schema = mongoose.Schema

let espesorSchema = new Schema({
	_id: Number,
	name: String,
	code: Number
})

let espesor = mongoose.model('espesore', espesorSchema)

module.exports = espesor

/*
{
	_id: 1,
	name: 'A 24',
	code: 24
},
{
	_id: 2,
	name: 'MDF 25',
	code: 25
},
{
	_id: 3,
	name: 'MDF 30',
	code: 30
}
*/