class Env {

  constructor() {
    this._url = 'http://localhost:9097/'
  }


  get url() {
    return this._url;
  }

  set url(value) {
    this._url = value
  }


}

export default new Env()