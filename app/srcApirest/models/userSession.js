module.exports = class UserSession {

  constructor() {
    this._id = null
    this._name = null
    this._type = null
  }

  save(user) {
    this._id = user.id
    this._name = user.name
    this._type = user.type
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get type() {
    return this._type
  }

  set id(value) {
    this._id = value
  }

  set name(value) {
    this._name = value
  }

  set type(value) {
    this._type = value
  }

}