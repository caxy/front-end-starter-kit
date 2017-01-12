class HomeController {
  constructor(User) {
    "ngInject"
    this.name = 'home';
    this.user = User;
  }
}

export default HomeController;
