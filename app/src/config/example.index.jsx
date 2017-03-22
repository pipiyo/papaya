class Env {

  constructor() {
    this._url = 'http://localhost:9097/'
    this._url1 = 'http://localhost:8888/'
  }


  get url() {
    return this._url;
  }
  get urlSytem1() {
    return this._url1;
  }


  set url(value) {
    this._url = value
  }


}

export default new Env()