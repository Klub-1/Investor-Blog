import { action, makeObservable, observable } from "mobx";
import { API } from "../Api/api";

class AuthStore {
  user_name = "";
  api = new API();

  async getUserName() {
    const user = await this.api.getUserName();
    this.user_name = user.username;
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
      getUserName: action,
      login: action,
      register: action,
    });
  }
}

export default new AuthStore();
