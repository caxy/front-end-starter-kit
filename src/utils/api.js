import fetch from 'isomorphic-fetch';

class Api {
  static defaultOptions = {
    baseUrl: 'localhost'
  };

  constructor (options) {
    this.options = Object.assign({}, Api.defaultOptions, options);
  }

  authenticate (username, password) {
    return this.request('/api/login', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _username: username, _password: password })
    });
  }

  request (url, options) {
    return fetch(url, options);
  }
}
