import { makeAutoObservable } from "mobx";
import { API } from "../Api/api";
import AuthStore from "../stores/AuthStore";

export class Stock {
  stock_name = "";
  ppo = 0.0;
  isFavorite = false;

  api = new API();

  constructor(stockname, ppo, isFavorite = false) {
    makeAutoObservable(this);
    this.stock_name = stockname;
    this.ppo = ppo;
    this.isFavorite = isFavorite;
  }

  async toggleFavorite() {
    const user_id = AuthStore.user.id;
    if (!this.isFavorite) {
      await this.api.createFavorite(user_id, this.stock_name);
      this.isFavorite = true;
    } else {
      await this.api.deleteFavorite(user_id, this.stocks_name);
      this.isFavorite = false;
    }
  }
}
