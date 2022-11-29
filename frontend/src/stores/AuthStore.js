import { action, makeObservable, observable } from "mobx";
import { API } from "../Api/api";
import { User } from "../models/User";
import { Constants } from "../Util/Constants";

class AuthStore {
  user = new User(-1, "", "", []);
  blogposts = [];
  isAuth = false;
  api = new API();
  constants = new Constants();
  frontend_url = this.constants.FRONTEND_URL();

  setUser(user) {
    this.user = user;
  }

  setAuth(value) {
    this.isAuth = value;
  }

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

  async login(email, password) {
    const token = await this.api.login(email, password);
    await this.checkAuth();
    window.location.href = this.frontend_url + `?token=${token}`;
  }

  async register(username, email, password) {
    const ifUSerExist = await this.api.checkIfUserExists(email);
    if (!ifUSerExist) {
      const token = await this.api.registerUser(email, username, password);
      window.location.href = this.frontend_url + `?token=${token}`;
    }
  }

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
