class LoginController {
  constructor(User) {
    "ngInject";
    this.user = User;
    this.name = 'login';
    this.username = '';
    this.password = '';
  }

  login() {
    if(this.username && this.password) {
      this.user.login(this.username, this.password);
    }
  }
}

export default LoginController;
