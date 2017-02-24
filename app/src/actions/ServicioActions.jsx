import Reflux from 'reflux'

let ServicioActions = Reflux.createActions([
	'addServicio',
	'updateServicio',
	'searchServicio',
	'formTrigger',
	'renderReclamo',
	'renderRochaValue',
	'renderFechaInicio',
	'renderFechaEntrega',
	'renderArea',
	'renderFechaMetales',
	"renderFechaMuebles", 
    "renderFechaEspeciales",
    "renderFechaSillas",
    "renderFechaTela",
    "renderFechaVidrio",
    "renderFechaInsumo",
    "renderFechaImportado",
    'closeDialog'
])

export default ServicioActions