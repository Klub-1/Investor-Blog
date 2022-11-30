import { action, makeObservable, observable } from "mobx";
import { API } from "../Api/api";
import { User } from "../models/User";
import { Constants } from "../Util/Constants";

// SOURCE: https://github.com/dube-academy/mobx-objects-arrays

class AuthStore {
  user = new User(-1, "", "", []);
  blogposts = [];
  isAuth = false;
  api = new API();
  constants = new Constants();
  frontend_url = this.constants.FRONTEND_URL();

  /**
   * Sets the user the the value from the param
   * @param user - The user object that you want to set.
   */
  setUser(user) {
    this.user = user;
  }

  /**
   * Sets the value of isAuth to the value of the param
   * @param value - If the user is logged in.
   */
  setAuth(value) {
    this.isAuth = value;
  }

  /**
   * Gets the user from the database and checks the validation of the token.
   * If the token is valid, it sets the user and isAuth to true.
   * If the token is invalid, it sets the user to a default user with id -1 and isAuth to false.
   * @returns The user object
   */
  async checkAuth() {
    const res = await this.api.getUser();
    if (
      !res ||
      res.status === "Invalid token" ||
      res.status === "Token expired"
    ) {
      this.setAuth(false);
      localStorage.clear();
      this.setUser(new User(-1, "", "", []));
      return;
    }

    const user = res.user;
    this.setAuth(res.status === "valid");
    if (this.isAuth) {
      this.setUser(
        new User(user.id, user.username, user.email, user.blogposts)
      );
    } else {
      localStorage.clear();
      this.setAuth(new User(-1, "", "", []));
    }
  }

  /**
   * Log the user in and redirects to the frontend with the newly created token.
   * @param email - The email address of the user
   * @param password - The password of the user
   */
  async login(email, password) {
    const token = await this.api.login(email, password);
    await this.checkAuth();
    window.location.href = this.frontend_url + `?token=${token}`;
  }

  /**
   * Creates a new user in the backend if the user do not exist already and redirects to the frontend with the newly created token.
   * @param username - The username of the user
   * @param email - The email address of the user
   * @param password - The password you want to use for your account.
   */
  async register(username, email, password) {
    const ifUSerExist = await this.api.checkIfUserExists(email);
    if (!ifUSerExist) {
      const token = await this.api.registerUser(email, username, password);
      window.location.href = this.frontend_url + `?token=${token}`;
    }
  }

  /**
   * `Init class
   */
  constructor() {
    makeObservable(this, {
      user: observable,
      isAuth: observable,
      setUser: action,
      setAuth: action,
      checkAuth: action,
      login: action,
      register: action,
    });
  }
}

export default new AuthStore();
