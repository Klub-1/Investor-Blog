import { action, makeObservable, observable } from "mobx";
import { API } from "../Api/api";

class AuthStore {
  user_name = "";
  isAuth = false;
  api = new API();

  async getUserName() {
    const user = await this.checkAuth();
    this.user_name = user.username;
    return user.username;
  }

  async checkAuth() {
    const user = await this.api.getUserName();
    this.isAuth = user.status === "success";
    return user;
  }

  async login(username, password) {
    /*TODO: implement login */
  }

  async register(username, email, password) {
    /* TODO: implement register */
  }

  constructor() {
    makeObservable(this, {
      user_name: observable,
      isAuth: observable,
      getUserName: action,
      checkAuth: action,
      login: action,
      register: action,
    });
  }
}

export default new AuthStore();
