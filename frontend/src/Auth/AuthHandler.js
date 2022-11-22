import { redirect } from "react-router-dom";
import { API } from "../Api/api";


export class AuthHandler {
  api = new API();
  test = true;

  async agetUserName() {
    const user = await this.api.getUser();
    console.log(user);
    if(user == null) {
      return user.username;
    }
  }
}
