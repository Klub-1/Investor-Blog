import { makeAutoObservable } from "mobx";
import { API } from "../Api/api";
import AuthStore from "../stores/AuthStore";

export class Stock {
  stock_name = "";
  ppo = 0.0;
  isFavorite = false;

  api = new API();

  /**
   * Init class
   * @param stockname - The name of the stock
   * @param ppo - The PPO value of the stock
   * @param isFavorite - If the stock is a favorite for the user
   */
  constructor(stockname, ppo, isFavorite = false) {
    makeAutoObservable(this);
    this.stock_name = stockname;
    this.ppo = ppo;
    this.isFavorite = isFavorite;
  }

  /**
   * If the user has the stock as favorite, the stock is removed from the favorites.
   * If the user does not have the stock as favorite, the stock is added to the favorites.
   */
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
