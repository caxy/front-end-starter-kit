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

    return this.request('/api/login_check', {
      method: 'post',
      body: formData
    })
      .then(response => {
        if (response.status >= 400) {
          throw new Error(`Bad response from server: ${response.statusText}`);
        }

        return response.json().token;
      });
  }

  storeItem (key, value) {
    return ls(key, value);
  }

  clearItem (key) {
    return ls.remove(key);
  }

  request (url, options) {
    return fetch(`${this.options.baseUrl}${url}`, options);
  }
}

const api = new Api();

export default api;
