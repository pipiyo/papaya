module.exports = class UserSession {

  constructor() {
    this._name = null
    this._type = null
  }

  save(user) {
    this._name = user.name
    this._type = user.type
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }


  set name(value) {
    this._name = value
  }

  set type(value) {
    this._type = value
  }

}