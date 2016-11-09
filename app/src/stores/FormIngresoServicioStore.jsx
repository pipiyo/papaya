class FormIngresoServicioStore {

  constructor() {
    this._comunas = null
    this._vehiculos = null
  }


  get comunas() {
    return this._comunas
  }

  set comunas(value) {
    this._comunas = value
  }

  get vehiculos() {
    return this._vehiculos
  }

  set vehiculos(value) {
    this._vehiculos = value
  }


}

export default new FormIngresoServicioStore()