import { action, makeObservable, observable } from "mobx";
import { Stock } from "../models/Stock";
import { API } from "../Api/api";
import AuthStore from "./AuthStore";

class StocksStore {
  favorite = [];
  filtered = [];
  filter = "";
  api = new API();

  setFilterValue(value) {
    if (value === "") {
      this.filtered = this.favorite;
    }
    this.filter = value.toUpperCase();
  }

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

  async syncStocks() {
    const user_id = AuthStore.user.id;
    const data = await this.api.getUserFavorites(user_id);
    this.favorite = data.map((stock) => {
      return new Stock(stock.stock_name, stock.ppo, true);
    });
    this.filtered = this.favorite;
  }

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
