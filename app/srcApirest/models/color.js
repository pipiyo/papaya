let mongoose = require("mongoose")

mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost/papaya")

let Schema = mongoose.Schema

let colorSchema = new Schema({
	_id: Number,
	name: String,
	code: Number
})

let color = mongoose.model('color', colorSchema)

module.exports = color



1	Blanco		1	1
2	Gris Humo		2	1
3	Grafito		3	1
4	Peral		4	1
5	Aluminio		5	1
6	Vison		6	1
7	Coigue Chocolate		7	1
9	Cerezo basic		8	1
10	Vainilla		1	2
11	White Oak		2	2
12	Cypress Camel		3	2
13	Roble Lineal		4	2
14	Noce Caffe Latte		5	2
15	Wengue		6	2
16	Perillo		7	2
17	Maple Fusion		8	2
18	Haya 1750		9	2
19	Wengue, Frente Wengue 1		1	3
20	Wengue, Frente Wengue 2		2	3
21	Cedro, Frente Miel 1		3	3
22	Cedro, Frente Miel 2		4	3
23	Haya Rosada, Frente Tinta Natural		5	3
