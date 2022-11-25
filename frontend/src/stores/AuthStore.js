import { action, makeObservable, observable } from "mobx";
import { API } from "../Api/api";
import { User } from "../models/User";
import { Constants } from "../Util/Constants";

class AuthStore {
  user = new User(-1, "", [], [], [], "");
  blogposts = [];
  isAuth = false;
  api = new API();

  async checkAuth() {
    const res = await this.api.getUser();
    const user = await res.user;
    this.isAuth = res.status === "valid";
    if (this.isAuth) {
      this.user = new User(
        user.id,
        user.username,
        user.blogposts,
        user.comments,
        user.interactions,
        user.email
      );
    } else {
      this.user = new User(-1, "", [], [], [], "");
    }
  }

  async login(email, password) {
    const token = await this.api.login(email, password);
    await this.checkAuth();
    window.location.href = Constants.BACKEND_URL + `?token=${token}`;
  }

  async register(username, email, password) {
    const ifUSerExist = await this.api.checkIfUserExists(email);
    if (!ifUSerExist) {
      const token = await this.api.registerUser(email, username, password);
      window.location.href = Constants.BACKEND_URL + `?token=${token}`;
    }
  }

  constructor() {
    makeObservable(this, {
      user: observable,
      isAuth: observable,
      checkAuth: action,
      login: action,
      register: action,
    });
  }
}

export default new AuthStore();
