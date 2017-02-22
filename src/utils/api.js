import fetch from 'isomorphic-fetch';
import ls from 'local-storage';

class Api {
  static defaultOptions = {
    baseUrl: 'http://symfony-starter-kit.dev/app_dev.php'
  };

  constructor (options) {
    this.options = Object.assign({}, Api.defaultOptions, options);
  }

  authenticate (username, password) {
    const formData = new FormData();
    formData.append('_username', username);
    formData.append('_password', password);

    return this.requestJson('api/login_check', {
      method: 'post',
      body: formData
    })
      .then(json => {
        return json.token;
      });
  }

  getUser (id) {
    return this.requestJson(`users/${id}`);
  }

  putUser (user) {
    return this.requestJson(`users/${user.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
  }

  storeItem (key, value) {
    return ls(key, value);
  }

  getItemFromStorage (key) {
    return ls(key);
  }

  clearItem (key) {
    return ls.remove(key);
  }

  requestJson (url, options) {
    return this.request(url, options)
      .then(response => {
        if (response.status >= 400) {
          throw new Error(`Bad response from server: ${response.statusText}`);
        }

        response.json();
      });
  }

  request (url, options) {
    return fetch(`${this.options.baseUrl}/${url}`, options);
  }
}

const api = new Api();

export default api;
