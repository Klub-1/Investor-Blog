import { makeAutoObservable } from "mobx";

export class User {
  id = 0;
  username = "";
  email = "";

  constructor(id, username, email) {
    makeAutoObservable(this);
    this.id = id;
    this.username = username;
    this.email = email;
  }
}
