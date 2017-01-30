let mongoose = require("mongoose")

mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost/papaya")

let Schema = mongoose.Schema

let superficieSchema = new Schema({
	_id: Number,
	name: String,
	alias: String,
	categorias: [ { type: Schema.Types.ObjectId, ref: 'categoria' } ],
	colores: [ { type: Schema.Types.ObjectId, ref: 'color' } ]
})

let superficie = mongoose.model('superficie', superficieSchema)

module.exports = superficie

{
	_id: 1,
	name: 'Melamina',
	alias: 'M',
	categorias: [ 1,
				  2,
				  3,
				  4,
				  5,
				  6,
				  7,
				  8,
				  9 ],
	colores: [ 1,
               2,
               3,
               4,
               5,
               6,
               7,
               9 ]
},
{
	_id: 2,
	name: 'Laminado',
	alias: 'L',
	categorias: [ 1,
				  2,
				  3,
				  4,
				  5,
				  6,
				  7 ],
	colores: [ 10,
               11,
               12,
               13,
               14,
               15,
               16,
               17,
               18 ]
},
{
	_id: 3,
	name: 'Enchape',
	alias: 'E',
	categorias: [ 1,
				  2,
				  3,
				  4,
				  5,
				  6,
				  7 ],
	colores: [ 19,
               20,
               21,
               22,
               23 ]
},
{
	_id: 4,
	name: 'Tapizado',
	alias: 'T',
	categorias: [ 7 ],
	colores: [ 24,
               25,
               26,
               27,
               28,
               29,
               30,
               31,
               32,
               33,
               34,
               35,
               36,
               37,
               38,
               39,
               40,
               41,
               42,
               43,
               44,
               45,
               46,
               47,
               48,
               49,
               50,
               51,
               52,
               53,
               54,
               55,
               56,
               57,
               58,
               59,
               60,
               61,
               62 ]
},
{
	_id: 5,
	name: 'cristal',
	alias: 'C',
	categorias: [ 18 ],
	colores: [ 63,
			   64,
			   65,
			   66 ]
}





