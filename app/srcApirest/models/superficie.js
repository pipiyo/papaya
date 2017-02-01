let mongoose = require("mongoose")

mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost/papaya")

let Schema = mongoose.Schema

let superficieSchema = new Schema({
	_id: Number,
	name: String,
	alias: String,
	asset: [ { categoria: { type: Schema.Types.ObjectId, ref: 'categoria' },
			   espesor: [ { type: Schema.Types.ObjectId, ref: 'espesor' } ],
			   trascara: [ { type: Schema.Types.ObjectId, ref: 'trascara' } ] } ],
	colores: [ { type: Schema.Types.ObjectId, ref: 'color' } ],
	colores_proveedor: [ { type: Schema.Types.ObjectId, ref: 'color_proveedor' } ]
})

let superficie = mongoose.model('superficie', superficieSchema)

module.exports = superficie


{
	_id: 1,
	name: 'Melamina',
	alias: 'M',
	asset: [ { categoria: 1,
		 	   espesor: [ 1 ] },
			 { categoria: 2,
		 	   espesor: [ 1 ] },
			 { categoria: 3 },
			 { categoria: 4 },
			 { categoria: 5 },
			 { categoria: 6 },
			 { categoria: 7 },
			 { categoria: 8 },
			 { categoria: 9 } ],
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
	asset: [ { categoria: 1,
		 	   espesor: [ 1, 2, 3 ] },
			 { categoria: 2,
		 	   espesor: [ 1, 2, 3 ] },
			 { categoria: 3 },
			 { categoria: 4 },
			 { categoria: 5 },
			 { categoria: 6 },
			 { categoria: 7 } ],
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
	asset: [ { categoria: 1,
		 	   espesor: [ 1 ] },
			 { categoria: 2,
		 	   espesor: [ 1 ] },
			 { categoria: 3 },
			 { categoria: 4 },
			 { categoria: 5 },
			 { categoria: 6 },
			 { categoria: 7 } ],
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
	asset: [ { categoria: 7 } ],
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
	asset: [ { categoria: 18 } ],
	colores: [ 63,
			   64,
			   65,
			   66 ]
},
{
	_id: 6,
	name: 'metalico',
	alias: 'metalico',
	asset: [ { categoria: 15 },
			 { categoria: 16 },
			 { categoria: 17 } ],
	colores: [ ],
	colores_proveedor: [ ]
},
{
	_id: 7,
	name: 'panaleria',
	alias: 'panaleria',
	asset: [ { categoria: 19 } ],
	colores: [ ],
	colores_proveedor: [ ]
}

SELECT DISTINCT FAMILIA FROM `producto` WHERE not FAMILIA = ''

SELECT DISTINCT FAMILIA FROM `producto` WHERE `categoria` = '7'
