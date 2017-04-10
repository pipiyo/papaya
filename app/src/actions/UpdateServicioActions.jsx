import Reflux from 'reflux'

let UpdateServicioActions = Reflux.createActions([
	'addServicio',
	'updateServicio',
	'searchServicio',
	'formTrigger',
	'selectOption',
	'renderFechaInicio',
	'renderFechaEntrega',
	'renderInput',
	'renderCheck',
	'renderFechaMetales',
	"renderFechaMuebles", 
    "renderFechaEspeciales",
    "renderFechaSillas",
    "renderFechaTela",
    "renderFechaVidrio",
    "renderFechaInsumo",
    "renderFechaImportado",
    "subServicioFecha"
])

export default UpdateServicioActions