import { makeAutoObservable } from "mobx";
import { API } from "../Api/api";
import AuthStore from "../stores/AuthStore";

export class Stock {
  stock_name = "";
  ppo = 0.0; //float
  isFavorite = false;

  api = new API();

  constructor(stockname, ppo, isFavorite = true) {
    makeAutoObservable(this);
    this.stock_name = stockname;
    this.ppo = ppo;
    this.isFavorite = isFavorite;
  }

  async toggleFavorite(stocks_name) {
    const user_id = AuthStore.user.id;
    if (!this.isFavorite) {
      await this.api.createFavorite(user_id, stocks_name);
      this.isFavorite = true;
    } else {
      await this.api.deleteFavorite(user_id, stocks_name);
      this.isFavorite = false;
    }
  }
}
