let UserFactory = function ($auth, Restangular, $location) {
  "ngInject";
  const user = {};

  let getUser = () => {
    return user;
  };

  let isAuthenticated = () => {
    return $auth.isAuthenticated();
  };

  let login = (username, password) => {
    $auth.login({_username: username, _password: password}, {
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      },
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(() => {
      Restangular.one('users', $auth.getPayload()['user_id']).get()
        .then((response) => {
          this.user = response;
          $location.path('/');
        });
    }).catch(function(response) {

    });
  };

  let logout = () => {
    $auth.logout();
  };

  let persist = () => {
    $auth.signup(this.user)
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
  }

  return { getUser, isAuthenticated, login, logout, persist };
};

export default UserFactory;
