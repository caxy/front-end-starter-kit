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
      console.log(this.user);
    }
  }
}

export default LoginController;
