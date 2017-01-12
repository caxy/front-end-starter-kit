class SignupController {
  constructor(User) {
    "ngInject"
    this.name = 'signup';
    this.user = User
  }

  persist() {
    this.user.persist();
  }
}

export default SignupController;
