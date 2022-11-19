export class AuthHandler {
  test = false;

  constructor(test) {
    this.test = test;
  }

  getToken() {
    if (this.test) {
      return "s205124";
    }
    return localStorage.getItem("portal-jwt-Token");
  }
}
