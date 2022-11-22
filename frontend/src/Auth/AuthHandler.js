import { redirect } from "react-router-dom";
import { API } from "../Api/api";


export class AuthHandler {
  api = new API();
  test = true;

  getUserName() {
    const user = this.api.getUser();
    if(user.length() > 0) {
      return user.username;
    }else{ window.location.href = "https://investorblog.diplomportal.dk/account/"}
  }
}
