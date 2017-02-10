let mongoose = require("mongoose")

mongoose.Promise = global.Promise

mongoose.createConnection("mongodb://localhost/papaya")

let Schema = mongoose.Schema

let color_proveedorSchema = new Schema({
	_id: Number,
	name: String,
	code: Number,
	codigo_proveedor: Number
})

let color_proveedor = mongoose.model('color_proveedore', color_proveedorSchema)

module.exports = color_proveedor

/*
{
	_id: 1,
	name: 'Gris MT',
	code: 1,
	codigo_proveedor: 36
},
{
	_id: 2,
	name: 'Gris Nopal',
	code: 2,
	codigo_proveedor: 36
},
{
	_id: 3,
	name: 'Negro Mt',
	code: 3,
	codigo_proveedor: 36
},
{
	_id: 4,
	name: 'Blanco MT',
	code: 4,
	codigo_proveedor: 36
},
{
	_id: 5,
	name: 'Gris Mexico',
	code: 5,
	codigo_proveedor: 36
},
{
	_id: 6,
	name: 'Gris Metalizado',
	code: 6,
	codigo_proveedor: 36
},
{
	_id: 7,
	name: 'Aluminio Mt',
	code: 7,
	codigo_proveedor: 36
},
{
	_id: 8,
	name: 'Gris Estrella',
	code: 8,
	codigo_proveedor: 36
},
{
	_id: 9,
	name: 'Mexico',
	code: 1,
	codigo_proveedor: 30
},
{
	_id: 10,
	name: 'Terrano',
	code: 2,
	codigo_proveedor: 30
},
{
	_id: 11,
	name: 'Estrella',
	code: 3,
	codigo_proveedor: 30
},
{
	_id: 12,
	name: 'Negro',
	code: 4,
	codigo_proveedor: 30
},
{
	_id: 13,
	name: 'Gris MT',
	code: 5,
	codigo_proveedor: 30
},
{
	_id: 14,
	name: 'Nopal',
	code: 6,
	codigo_proveedor: 30
},
{
	_id: 15,
	name: 'Grafito',
	code: 7,
	codigo_proveedor: 30
}
*/