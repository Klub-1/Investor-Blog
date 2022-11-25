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
    console.log(user.status);
    this.isAuth = user.status === "valid";
    return user;
  }

  async login(email, password) {
    const token = await this.api.login(email, password);
    await this.checkAuth();
    window.location.href = `https://investorblog.diplomportal.dk?token=${token}`;
  }

  async register(username, email, password) {
    const ifUSerExist = await (this.api.checkIfUserExists(email));
    if(!ifUSerExist){
      const token = await this.api.registerUser(email, username , password);
      window.location.href = `https://investorblog.diplomportal.dk?token=${token}`;  
      ;
    }
  }
  async getUserID() {
    const id = await this.api.getUserID();
    this.user_id = id.id;
    return id.id;
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
