import { action, makeObservable, observable } from "mobx";
import { Stock } from "../models/Stock";
import { API } from "../Api/api";
import AuthStore from "./AuthStore";

class StocksStore {
  favorite = [];
  filtered = [];
  filter = "";
  api = new API();

  /**
   * Sets the value of the filter to the value of the list of favorite if the filter value is empty
   * Set the filter value to the value of the param
   * @param value - New value of the filter variable
   */
  setFilterValue(value) {
    if (value === "") {
      this.filtered = this.favorite;
    }
    this.filter = value.toUpperCase();
  }

  /**
   * Using the filter variable search for the stock in the backend and add it to the list of favorites
   */
  async searchStocks() {
    // else fetch stock
    const data = await this.api.searchStock(this.filter);

    // Check is stock is in favorites
    const isFavorite = this.favorite.some(
      (stock) => stock.stock_name === data.stock_name
    );

    // create new stock
    const stock = new Stock(data.stock_name, data.ppo, isFavorite);

    if (stock) {
      this.filtered = [];
    }

    this.filtered.push(stock);
  }

  /**
   * Get all user favorite from the database and add them to the list of favorites
   */
  async syncStocks() {
    const user_id = AuthStore.user.id;
    const data = await this.api.getUserFavorites(user_id);
    this.favorite = data.map((stock) => {
      return new Stock(stock.stock_name, stock.ppo, true);
    });
    this.filtered = this.favorite;
  }

  /**
   * Init class
   */

  constructor() {
    makeObservable(this, {
      favorite: observable,
      filtered: observable,
      filter: observable,
      setFilterValue: action,
      searchStocks: action,
      syncStocks: action,
    });

    this.syncStocks();
  }
}

export default new StocksStore();
