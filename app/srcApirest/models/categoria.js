let mongoose = require("mongoose")

mongoose.Promise = global.Promise

mongoose.createConnection("mongodb://localhost/papaya")

let Schema = mongoose.Schema

let categoriaSchema = new Schema({
	_id: Number,
	name: String,
	frente: Boolean,
	proovedor: Boolean,
	colores: [{ color: { type: Schema.Types.ObjectId, ref: 'colore' },
				cantos: [ { canto: { type: Schema.Types.ObjectId, ref: 'canto' }  } ] 
			 }]
})



let categoria = mongoose.model('categoria', categoriaSchema)

module.exports = categoria

/*
{
	_id: 1,
	name: 'Superficies curvas',
	posicion: {
		frente: false,
		cuerpo: true
	},
	proovedor: false,
	colores: [{ color: 1,
			    cantos: [ 1 ] 
			 },
			 { color: 9,
			   cantos: [ 2 ] 
			 },
			 { color: 7,
			   cantos: [ 3 ] 
			 },
			 { color: 4,
			   cantos: [ 4 ] 
			 },
			 { color: 10,
			   cantos: [ 1 ] 
			 },
			 { color: 13,
			   cantos: [ 1,
                          5,
                          6,
                          7,
                          8 ] 
			 },
			 { color: 15,
			   cantos: [ 9 ] 
			 },
			 { color: 14,
			   cantos: [ 10,
			   			 1,
			   			 5,
			   			 6,
			   			 7,
			   			 8 ] 
			 },
			 { color: 12,
			   cantos: [ 1,
			   			 5,
                         6,
                         7,
                         8,
                         11 ] 
			 },
			 { color: 11,
			   cantos: [ 1,
			   			 5,
			   			 12 ] 
			 },
			 { color: 16,
			   cantos: [ 5 ] 
			 },
			 { color: 17,
			   cantos: [ 13 ] 
			 },
			 { color: 18,
			   cantos: [ 14 ] 
			 },
			 { color: 19,
			   cantos: [ 20 ] 
			 },
			 { color: 20,
			   cantos: [ 20 ] 
			 },
			 { color: 21,
			   cantos: [ 20 ] 
			 },
			 { color: 22,
			   cantos: [ 20 ] 
			 },
			 { color: 23,
			   cantos: [ 20 ] 
			 }]
},

{
	_id: 2,
	name: 'Superficies Rectas',
	posicion: {
		frente: false,
		cuerpo: true
	},
	proovedor: false,
	colores: [{ color: 1,
			    cantos: [ 1 ] 
			 },
			 { color: 9,
			   cantos: [ 2 ] 
			 },
			 { color: 7,
			   cantos: [ 3 ] 
			 },
			 { color: 4,
			   cantos: [ 4 ] 
			 },
			 { color: 10,
			   cantos: [ 1 ] 
			 },
			 { color: 13,
			   cantos: [ 1,
                          5,
                          6,
                          7,
                          8 ] 
			 },
			 { color: 15,
			   cantos: [ 9 ] 
			 },
			 { color: 14,
			   cantos: [ 10,
			   			 1,
			   			 5,
			   			 6,
			   			 7,
			   			 8 ] 
			 },
			 { color: 12,
			   cantos: [ 1,
			   			 5,
                         6,
                         7,
                         8,
                         11 ] 
			 },
			 { color: 11,
			   cantos: [ 1,
			   			 5,
			   			 12 ] 
			 },
			 { color: 16,
			   cantos: [ 5 ] 
			 },
			 { color: 17,
			   cantos: [ 13 ] 
			 },
			 { color: 18,
			   cantos: [ 14 ] 
			 },
			 { color: 19,
			   cantos: [ 20 ] 
			 },
			 { color: 20,
			   cantos: [ 20 ] 
			 },
			 { color: 21,
			   cantos: [ 20 ] 
			 },
			 { color: 22,
			   cantos: [ 20 ] 
			 },
			 { color: 23,
			   cantos: [ 20 ] 
			 }]
},

{
	_id: 3,
	name: 'Almacenamientos',
	posicion: {
		frente: false,
		cuerpo: true
	},
	proovedor: false,
	colores: [{ color: 1,
			    cantos: [ 1 ] 
			 },
			 { color: 2,
			    cantos: [ 6 ] 
			 },
			 { color: 3,
			    cantos: [ 7 ] 
			 },
			 { color: 5,
			    cantos: [ 5 ] 
			 },
			 { color: 6,
			    cantos: [ 16 ] 
			 },
			 { color: 7,
			    cantos: [ 3 ] 
			 },
			 { color: 4,
			    cantos: [ 4 ] 
			 },
			 { color: 9,
			    cantos: [ 2 ] 
			 },
			 { color: 10,
			    cantos: [ 1 ] 
			 },
			 { color: 13,
			    cantos: [ 18 ] 
			 },
			 { color: 15,
			    cantos: [ 9 ] 
			 },
			 { color: 14,
			    cantos: [ 19 ] 
			 },
			 { color: 12,
			    cantos: [ 1,
                          5,
                          6,
                          7 ] 
			 },
			 { color: 11,
			    cantos: [ 12 ] 
			 },
			 { color: 16,
			    cantos: [ 17 ] 
			 },
			 { color: 17,
			    cantos: [ 13 ] 
			 },
			 { color: 18,
			    cantos: [ 14 ] 
			 },
			 { color: 19,
			    cantos: [ 20 ] 
			 },
			 { color: 20,
			    cantos: [ 20 ] 
			 },
			 { color: 21,
			    cantos: [ 20 ] 
			 },
			 { color: 22,
			    cantos: [ 20 ] 
			 },
			 { color: 23,
			    cantos: [ 20 ] 
			 }]
},

{
	_id: 4,
	name: 'Cajoneras',
	posicion: {
		frente: true,
		cuerpo: true
	},
	proovedor: false,
	colores: [{ color: 1,
			    cantos: [ 1 ] 
			 },
			 { color: 2,
			    cantos: [ 6 ] 
			 },
			 { color: 3,
			    cantos: [ 7 ] 
			 },
			 { color: 5,
			    cantos: [ 5 ] 
			 },
			 { color: 6,
			    cantos: [ 16 ] 
			 },
			 { color: 7,
			    cantos: [ 3 ] 
			 },
			 { color: 4,
			    cantos: [ 4 ] 
			 },
			 { color: 9,
			    cantos: [ 2 ] 
			 },
			 { color: 10,
			    cantos: [ 1 ] 
			 },
			 { color: 13,
			    cantos: [ 18 ] 
			 },
			 { color: 15,
			    cantos: [ 9 ] 
			 },
			 { color: 14,
			    cantos: [ 19 ] 
			 },
			 { color: 12,
			    cantos: [ 1,
			              5,
			              6,
			              7,
			              8 ] 
			 },
			 { color: 11,
			    cantos: [ 12 ] 
			 },
			 { color: 16,
			    cantos: [ 17 ] 
			 },
			 { color: 17,
			    cantos: [ 13 ] 
			 },
			 { color: 18,
			    cantos: [ 14 ] 
			 },
			 { color: 19,
			    cantos: [ 20 ] 
			 },
			 { color: 20,
			    cantos: [ 20 ] 
			 },
			 { color: 21,
			    cantos: [ 20 ] 
			 },
			 { color: 22,
			    cantos: [ 20 ] 
			 },
			 { color: 23,
			    cantos: [ 20 ] 
			 }]
},

{
	_id: 5,
	name: 'Mueble de linea',
	posicion: {
		frente: true,
		cuerpo: true
	},
	proovedor: false,
	colores: [{ color: 1,
			    cantos: [ 1 ] 
			 },
			 { color: 2,
			    cantos: [ 6 ] 
			 },
			 { color: 3,
			    cantos: [ 7 ] 
			 },
			 { color: 5,
			    cantos: [ 5 ] 
			 },
			 { color: 6,
			    cantos: [ 16 ] 
			 },
			 { color: 7,
			    cantos: [ 3 ] 
			 },
			 { color: 4,
			    cantos: [ 4 ] 
			 },
			 { color: 9,
			    cantos: [ 2 ] 
			 },
			 { color: 10,
			    cantos: [ 1 ] 
			 },
			 { color: 13,
			    cantos: [ 18 ] 
			 },
			 { color: 15,
			    cantos: [ 9 ] 
			 },
			 { color: 14,
			    cantos: [ 19 ] 
			 },
			 { color: 12,
			    cantos: [ 1,
                          5,
                          6,
                          7,
                          8 ] 
			 },
			 { color: 11,
			    cantos: [ 12 ] 
			 },
			 { color: 16,
			    cantos: [ 17 ] 
			 },
			 { color: 17,
			    cantos: [ 13 ] 
			 },
			 { color: 18,
			    cantos: [ 14 ] 
			 },
			 { color: 19,
			    cantos: [ 20 ] 
			 },
			 { color: 20,
			    cantos: [ 20 ] 
			 },
			 { color: 21,
			    cantos: [ 20 ] 
			 },
			 { color: 22,
			    cantos: [ 20 ] 
			 },
			 { color: 23,
			    cantos: [ 20 ] 
			 }]
},

{
	_id: 6,
	name: 'Parte y piezas',
	posicion: {
		frente: true,
		cuerpo: true
	},
	proovedor: false,
	colores: [{ color: 1,
			    cantos: [ 1 ] 
			 },
			 { color: 2,
			    cantos: [ 6 ] 
			 },
			 { color: 3,
			    cantos: [ 7 ] 
			 },
			 { color: 5,
			    cantos: [ 5 ] 
			 },
			 { color: 6,
			    cantos: [ 16 ] 
			 },
			 { color: 7,
			    cantos: [ 3 ] 
			 },
			 { color: 4,
			    cantos: [ 4 ] 
			 },
			 { color: 9,
			    cantos: [ 2 ] 
			 },
			 { color: 10,
			    cantos: [ 1 ] 
			 },
			 { color: 13,
			    cantos: [ 18 ] 
			 },
			 { color: 15,
			    cantos: [ 9 ] 
			 },
			 { color: 14,
			    cantos: [ 19 ] 
			 },
			 { color: 12,
			    cantos: [ 1,
                          5,
                          6,
                          7,
                          8 ] 
			 },
			 { color: 11,
			    cantos: [ 12 ] 
			 },
			 { color: 16,
			    cantos: [ 17 ] 
			 },
			 { color: 17,
			    cantos: [ 13 ] 
			 },
			 { color: 18,
			    cantos: [ 14 ] 
			 },
			 { color: 19,
			    cantos: [ 20 ] 
			 },
			 { color: 20,
			    cantos: [ 20 ] 
			 },
			 { color: 21,
			    cantos: [ 20 ] 
			 },
			 { color: 22,
			    cantos: [ 20 ] 
			 },
			 { color: 23,
			    cantos: [ 20 ] 
			 }]
},

{
	_id: 7,
	name: 'Pantalla',
	posicion: {
		frente: false,
		cuerpo: false
	},
	proovedor: false,
	colores: [{ color: 1,
			    cantos: [ 1 ] 
			 },
			 { color: 2,
			    cantos: [ 6 ] 
			 },
			 { color: 3,
			    cantos: [ 7 ] 
			 },
			 { color: 5,
			    cantos: [ 8 ] 
			 },
			 { color: 6,
			    cantos: [ 16 ] 
			 },
			 { color: 4,
			    cantos: [ 4 ] 
			 },
			 { color: 9,
			    cantos: [ 2 ] 
			 },
			 { color: 10,
			    cantos: [ 1 ] 
			 },
			 { color: 13,
			    cantos: [ 18 ] 
			 },
			 { color: 15,
			    cantos: [ 9 ] 
			 },
			 { color: 14,
			    cantos: [ 19 ] 
			 },
			 { color: 14,
			    cantos: [ 19 ] 
			 },
			 { color: 12,
			    cantos: [ 11 ] 
			 },
			 { color: 16,
			    cantos: [ 17 ] 
			 },
			 { color: 17,
			    cantos: [ 13 ] 
			 },
			 { color: 18,
			    cantos: [ 14 ] 
			 },
			 { color: 19,
			    cantos: [ 20 ] 
			 },
			 { color: 20,
			    cantos: [ 20 ] 
			 },
			 { color: 21,
			    cantos: [ 20 ] 
			 },
			 { color: 22,
			    cantos: [ 20 ] 
			 },
			 { color: 23,
			    cantos: [ 20 ] 
			 },
			 { color: 24,
			    cantos: [ 21 ] 
			 },
			 { color: 25,
			    cantos: [ 22 ] 
			 },
			 { color: 26,
			    cantos: [ 23 ] 
			 },
			 { color: 27,
			    cantos: [ 24 ] 
			 },
			 { color: 28,
			    cantos: [ 25 ] 
			 },
			 { color: 29,
			    cantos: [ 26 ] 
			 },
			 { color: 30,
			    cantos: [ 27 ] 
			 },
			 { color: 31,
			    cantos: [ 28 ] 
			 },
			 { color: 32,
			    cantos: [ 29 ] 
			 },
			 { color: 33,
			    cantos: [ 30 ] 
			 },
			 { color: 34,
			    cantos: [ 31 ] 
			 },
			 { color: 35,
			    cantos: [ 32 ] 
			 },
			 { color: 36,
			    cantos: [ 33 ] 
			 },
			 { color: 37,
			    cantos: [ 34 ] 
			 },
			 { color: 38,
			    cantos: [ 35 ] 
			 },
			 { color: 39,
			    cantos: [ 36 ] 
			 },
			 { color: 40,
			    cantos: [ 37 ] 
			 },
			 { color: 41,
			    cantos: [ 38 ] 
			 },
			 { color: 42,
			    cantos: [ 39 ] 
			 },
			 { color: 43,
			    cantos: [ 40 ] 
			 },
			 { color: 44,
			    cantos: [ 41 ] 
			 },
			 { color: 45,
			    cantos: [ 42 ] 
			 },
			 { color: 46,
			    cantos: [ 43 ] 
			 },
			 { color: 47,
			    cantos: [ 44 ] 
			 },
			 { color: 48,
			    cantos: [ 45 ] 
			 },
			 { color: 49,
			    cantos: [ 46 ] 
			 },
			 { color: 50,
			    cantos: [ 47 ] 
			 },
			 { color: 51,
			    cantos: [ 48 ] 
			 },
			 { color: 52,
			    cantos: [ 49 ] 
			 },
			 { color: 53,
			    cantos: [ 50 ] 
			 },
			 { color: 54,
			    cantos: [ 51 ] 
			 },
			 { color: 55,
			    cantos: [ 52 ] 
			 },
			 { color: 56,
			    cantos: [ 53 ] 
			 },
			 { color: 57,
			    cantos: [ 54 ] 
			 },
			 { color: 58,
			    cantos: [ 55 ] 
			 },
			 { color: 59,
			    cantos: [ 56 ] 
			 },
			 { color: 60,
			    cantos: [ 57 ] 
			 },
			 { color: 61,
			    cantos: [ 58 ] 
			 },
			 { color: 62,
			    cantos: [ 59 ] 
			 }]
},

{
	_id: 8,
	name: 'Soportes',
	posicion: {
		frente: false,
		cuerpo: false
	},
	proovedor: false,
	colores: [{ color: 1,
			    cantos: [ 1 ] 
			 },
			 { color: 3,
			    cantos: [ 7 ] 
			 }]
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
	proovedor: false,
	colores: [{ color: 1,
			    cantos: [ 1 ] 
			 },
			 { color: 63,
			    cantos: [ 60 ] 
			 },
			 { color: 64,
			    cantos: [ 61 ] 
			 },
			 { color: 65,
			    cantos: [ 62 ] 
			 },
			 { color: 66,
			    cantos: [ 63 ] 
			 }]
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

*/
