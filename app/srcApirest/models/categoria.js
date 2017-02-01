let mongoose = require("mongoose")

mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost/papaya")

let Schema = mongoose.Schema

let categoriaSchema = new Schema({
	_id: Number,
	name: String,
	frente: Boolean,
	proovedor: Boolean
})

let categoria = mongoose.model('categoria', categoriaSchema)

module.exports = categoria




{
	_id: 1,
	name: 'Superficies curvas',
	posicion: {
		frente: false,
		cuerpo: true
	},
	proovedor: false
},

{
	_id: 2,
	name: 'Superficies Rectas',
	posicion: {
		frente: false,
		cuerpo: true
	},
	proovedor: false
},

{
	_id: 3,
	name: 'Almacenamientos',
	posicion: {
		frente: false,
		cuerpo: true
	},
	proovedor: false
},

{
	_id: 4,
	name: 'Cajoneras',
	posicion: {
		frente: true,
		cuerpo: true
	},
	proovedor: false
},

{
	_id: 5,
	name: 'Mueble de linea',
	posicion: {
		frente: true,
		cuerpo: true
	},
	proovedor: false
},

{
	_id: 6,
	name: 'Parte y piezas',
	posicion: {
		frente: true,
		cuerpo: true
	},
	proovedor: false
},

{
	_id: 7,
	name: 'Pantalla',
	posicion: {
		frente: false,
		cuerpo: false
	},
	proovedor: false
},

{
	_id: 8,
	name: 'Soportes',
	posicion: {
		frente: false,
		cuerpo: false
	},
	proovedor: false
},

{
	_id: 9,
	name: 'Faldon',
	posicion: {
		frente: false,
		cuerpo: false
	},
	proovedor: false
},

{
	_id: 10,
	name: 'Insumo',
	posicion: {
		frente: false,
		cuerpo: false
	},
	proovedor: false
},

{
	_id: 11,
	name: 'Herraje',
	posicion: {
		frente: false,
		cuerpo: false
	},
	proovedor: false
},

{
	_id: 12,
	name: 'Recurso',
	posicion: {
		frente: false,
		cuerpo: false
	},
	proovedor: false
},

{
	_id: 13,
	name: 'Maderas',
	posicion: {
		frente: false,
		cuerpo: false
	},
	proovedor: false
},

{
	_id: 14,
	name: 'Laminados',
	posicion: {
		frente: false,
		cuerpo: false
	},
	proovedor: false
},

{
	_id: 15,
	name: 'Accesorios',
	posicion: {
		frente: false,
		cuerpo: false
	},
	proovedor: true
},

{
	_id: 16,
	name: 'Soportes metalicos',
	posicion: {
		frente: false,
		cuerpo: false
	},
	proovedor: true
},

{
	_id: 17,
	name: 'Almacenamiento metalico',
	posicion: {
		frente: false,
		cuerpo: false
	},
	proovedor: true
},

{
	_id: 18,
	name: 'Pantalla cristal',
	posicion: {
		frente: false,
		cuerpo: false
	},
	proovedor: false
},

{
	_id: 19,
	name: 'Panaleria',
	posicion: {
		frente: false,
		cuerpo: false
	},
	proovedor: true
}
