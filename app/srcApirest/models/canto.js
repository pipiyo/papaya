let mongoose = require("mongoose")

mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost/papaya")

let Schema = mongoose.Schema

let cantoSchema = new Schema({
	_id: Number,
	name: String,
	code: String
})

let canto = mongoose.model('canto', cantoSchema)

module.exports = canto

{
	_id: 1,
	name: 'Blanco',
	code: 'a'
},
{
	_id: 2,
	name: 'Granadillo',
	code: 'b'
},
{
	_id: 3,
	name: 'Coigue Chocolate',
	code: 'c'
},
{
	_id: 4,
	name: 'Peral',
	code: 'd'
},
{
	_id: 5,
	name: 'Almendra',
	code: 'e'
},
{
	_id: 6,
	name: 'Gris Humo',
	code: 'f'
},
{
	_id: 7,
	name: 'Grafito',
	code: 'g'
},
{
	_id: 8,
	name: 'Aluminio',
	code: 'h'
},
{
	_id: 9,
	name: 'Wengue',
	code: 'i'
},
{
	_id: 10,
	name: 'Nogal Clásico',
	code: 'j'
},
{
	_id: 11,
	name: 'Cypress Camel',
	code: 'k'
},
{
	_id: 12,
	name: 'White Oak',
	code: 'l'
},
{
	_id: 13,
	name: 'Maple',
	code: 'm'
},
{
	_id: 14,
	name: 'Peral',
	code: 'n'
},
{
	_id: 16,
	name: 'Vison',
	code: 'o'
},
{
	_id: 17,
	name: 'Maple claro',
	code: 'p'
},
{
	_id: 18,
	name: 'Caravalo',
	code: 'q'
},
{
	_id: 19,
	name: 'Acacia',
	code: 'r'
},
{
	_id: 20,
	name: 'Teñido',
	code: 's'
},
{
	_id: 21,
	name: 'hilat glock rojo',
	code: 'T'
},
{
	_id: 22,
	name: 'hilat glock azul lago',
	code: 'U'
},
{
	_id: 23,
	name: 'hilat glock caribe',
	code: 'V'
},
{
	_id: 24,
	name: 'hilat glock azul',
	code: 'W'
},
{
	_id: 25,
	name: 'hilat glock mango',
	code: 'X'
},
{
	_id: 26,
	name: 'hilat glock verde pino',
	code: 'Y'
},
{
	_id: 27,
	name: 'hilat glock esmeralda',
	code: 'Z'
},
{
	_id: 28,
	name: 'hilat glock manzana',
	code: 'A1'
},
{
	_id: 29,
	name: 'hilat glock caoba',
	code: 'B1'
},
{
	_id: 30,
	name: 'hilat glock gris perla',
	code: 'C1'
},
{
	_id: 31,
	name: 'hilat glock plomo',
	code: 'D1'
},
{
	_id: 32,
	name: 'hilat glock negro',
	code: 'E1'
},
{
	_id: 33,
	name: 'hilat escorial plus navy',
	code: 'F1'
},
{
	_id: 34,
	name: 'hilat escorial plus arrecife',
	code: 'G1'
},
{
	_id: 35,
	name: 'hilat escorial plus azul re',
	code: 'H1'
},
{
	_id: 36,
	name: 'hilat escorial plus azul caribe',
	code: 'I1'
},
{
	_id: 37,
	name: 'hilat escorial plus azul lago',
	code: 'J1'
},
{
	_id: 38,
	name: 'hilat escorial plus blue',
	code: 'K1'
},
{
	_id: 39,
	name: 'hilat escorial plus mango',
	code: 'L1'
},
{
	_id: 40,
	name: 'hilat escorial plus azafran',
	code: 'M1'
},
{
	_id: 41,
	name: 'hilat escorial plus naranja',
	code: 'N1'
},
{
	_id: 42,
	name: 'hilat escorial plus scarlati',
	code: 'O1'
},
{
	_id: 43,
	name: 'hilat escorial plus tomate',
	code: 'P1'
},
{
	_id: 44,
	name: 'hilat escorial plus burdeos',
	code: 'Q1'
},
{
	_id: 45,
	name: 'hilat escorial plus vino',
	code: 'R1'
},
{
	_id: 46,
	name: 'hilat escorial plus almendra',
	code: 'S1'
},
{
	_id: 47,
	name: 'hilat escorial plus tabaco',
	code: 'T1'
},
{
	_id: 48,
	name: 'hilat escorial plus caoba',
	code: 'U1'
},
{
	_id: 49,
	name: 'hilat escorial plus gris mouse',
	code: 'V1'
},
{
	_id: 50,
	name: 'hilat escorial plus gris perla',
	code: 'W1'
},
{
	_id: 51,
	name: 'hilat escorial plus gris raton',
	code: 'X1'
},
{
	_id: 52,
	name: 'hilat escorial plus gris acero',
	code: 'Y1'
},
{
	_id: 53,
	name: 'hilat escorial plus gris nevado',
	code: 'Z1'
},
{
	_id: 54,
	name: 'hilat escorial plus negro',
	code: 'A2'
},
{
	_id: 55,
	name: 'hilat escorial plus pera',
	code: 'B2'
},
{
	_id: 56,
	name: 'hilat escorial plus verde tilo',
	code: 'C2'
},
{
	_id: 57,
	name: 'hilat escorial plus green',
	code: 'D2'
},
{
	_id: 58,
	name: 'hilat escorial plus esmeralda',
	code: 'E2'
},
{
	_id: 59,
	name: 'hilat escorial plus verde',
	code: 'F2'
},
{
	_id: 60,
	name: 'film saten',
	code: 'G3'
},
{
	_id: 61,
	name: 'blanco',
	code: 'H3'
},
{
	_id: 62,
	name: 'rojo',
	code: 'I3'
},
{
	_id: 63,
	name: 'negro',
	code: 'J3'
}