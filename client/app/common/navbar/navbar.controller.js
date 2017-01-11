class NavbarController {
  constructor($location, User) {
    "ngInject"
    this.name = 'navbar';
    this.location = $location;
    this.user = User;
  }

  isHomePage() {
    return this.location.path() === '/';
  }

  isLoginPage() {
    return this.location.path() === '/login';
  }

  isSignupPage() {
    return this.location.path() === '/signup';
  }
}

export default NavbarController;
