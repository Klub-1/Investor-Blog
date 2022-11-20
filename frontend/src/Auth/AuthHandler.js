export class AuthHandler {
  test = true;

  getUserName() {
    if (this.test) {
      return "s205124";
    }
    return localStorage.getItem("portal-jwt-Token");
  }
}
