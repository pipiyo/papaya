let mongoose = require("mongoose")

mongoose.Promise = global.Promise

mongoose.createConnection("mongodb://localhost/papaya")

let Schema = mongoose.Schema

let colorSchema = new Schema({
	_id: Number,
	name: String,
	code: Number
})

let color = mongoose.model('colore', colorSchema)

module.exports = color


/*
{
	_id: 1,
	name: 'Blanco',
	code: 1
},
{
	_id: 2,
	name: 'Gris Humo',
	code: 2
},
{
	_id: 3,
	name: 'Grafito',
	code: 3
},
{
	_id: 4,
	name: 'Peral',
	code: 4
},
{
	_id: 5,
	name: 'Aluminio',
	code: 5
},
{
	_id: 6,
	name: 'Vison',
	code: 6
},
{
	_id: 7,
	name: 'Coigue Chocolate',
	code: 7
},
{
	_id: 9,
	name: 'Cerezo basic',
	code: 8
},
{
	_id: 10,
	name: 'Vainilla',
	code: 1
},
{
	_id: 11,
	name: 'White Oak',
	code: 2
},
{
	_id: 12,
	name: 'Cypress Camel',
	code: 3
},
{
	_id: 13,
	name: 'Roble Lineal',
	code: 4
},
{
	_id: 14,
	name: 'Noce Caffe Latte',
	code: 5
},
{
	_id: 15,
	name: 'Wengue',
	code: 6
},
{
	_id: 16,
	name: 'Perillo',
	code: 7
},
{
	_id: 17,
	name: 'Maple Fusion',
	code: 8
},
{
	_id: 18,
	name: 'Haya 1750',
	code: 9
},
{
	_id: 19,
	name: 'Wengue, Frente Wengue 1',
	code: 1
},
{
	_id: 20,
	name: 'Wengue, Frente Wengue 2',
	code: 2
},
{
	_id: 21,
	name: 'Cedro, Frente Miel 1',
	code: 3
},
{
	_id: 22,
	name: 'Cedro, Frente Miel 2',
	code: 4
},
{
	_id: 23,
	name: 'Haya Rosada, Frente Tinta Natural',
	code: 5
},
{
	_id: 24,
	name: 'hilat glock rojo',
	code: 1
},
{
	_id: 25,
	name: 'hilat glock azul lago',
	code: 2
},
{
	_id: 26,
	name: 'hilat glock caribe',
	code: 3
},
{
	_id: 27,
	name: 'hilat glock azul',
	code: 4
},
{
	_id: 28,
	name: 'hilat glock mango',
	code: 5
},
{
	_id: 29,
	name: 'hilat glock verde pino',
	code: 6
},
{
	_id: 30,
	name: 'hilat glock esmeralda',
	code: 7
},
{
	_id: 31,
	name: 'hilat glock manzana',
	code: 8
},
{
	_id: 32,
	name: 'hilat glock caoba',
	code: 9
},
{
	_id: 33,
	name: 'hilat glock gris perla',
	code: 10
},
{
	_id: 34,
	name: 'hilat glock plomo',
	code: 11
},
{
	_id: 35,
	name: 'hilat glock negro',
	code: 12
},
{
	_id: 36,
	name: 'hilat escorial plus navy',
	code: 13
},
{
	_id: 37,
	name: 'hilat escorial plus arrecife',
	code: 14
},
{
	_id: 38,
	name: 'hilat escorial plus azul re',
	code: 15
},
{
	_id: 39,
	name: 'hilat escorial plus azul caribe',
	code: 16
},
{
	_id: 40,
	name: 'hilat escorial plus azul lago',
	code: 17
},
{
	_id: 41,
	name: 'hilat escorial plus blue',
	code: 18
},
{
	_id: 42,
	name: 'hilat escorial plus mango',
	code: 19
},
{
	_id: 43,
	name: 'hilat escorial plus azafran',
	code: 20
},
{
	_id: 44,
	name: 'hilat escorial plus naranja',
	code: 21
},
{
	_id: 45,
	name: 'hilat escorial plus scarlati',
	code: 22
},
{
	_id: 46,
	name: 'hilat escorial plus tomate',
	code: 23
},
{
	_id: 47,
	name: 'hilat escorial plus burdeos',
	code: 24
},
{
	_id: 48,
	name: 'hilat escorial plus vino',
	code: 25
},
{
	_id: 49,
	name: 'hilat escorial plus almendra',
	code: 26
},
{
	_id: 50,
	name: 'hilat escorial plus tabaco',
	code: 27
},
{
	_id: 51,
	name: 'hilat escorial plus caoba',
	code: 28
},
{
	_id: 52,
	name: 'hilat escorial plus gris mouse',
	code: 29
},
{
	_id: 53,
	name: 'hilat escorial plus gris perla',
	code: 30
},
{
	_id: 54,
	name: 'hilat escorial plus gris raton',
	code: 31
},
{
	_id: 55,
	name: 'hilat escorial plus gris acero',
	code: 32
},
{
	_id: 56,
	name: 'hilat escorial plus gris nevado',
	code: 33
},
{
	_id: 57,
	name: 'hilat escorial plus negro',
	code: 34
},
{
	_id: 58,
	name: 'hilat escorial plus pera',
	code: 35
},
{
	_id: 59,
	name: 'hilat escorial plus verde tilo',
	code: 36
},
{
	_id: 60,
	name: 'hilat escorial plus green',
	code: 37
},
{
	_id: 61,
	name: 'hilat escorial plus esmeralda',
	code: 38
},
{
	_id: 62,
	name: 'hilat escorial plus verde',
	code: 39
},
{
	_id: 63,
	name: 'film saten',
	code: 1
},
{
	_id: 64,
	name: 'blanco',
	code: 2
},
{
	_id: 65,
	name: 'rojo',
	code: 3
},
{
	_id: 66,
	name: 'negro',
	code: 4
}
*/