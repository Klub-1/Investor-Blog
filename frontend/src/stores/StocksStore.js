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
    this.filter = value.toUpperCase();
  }

  async searchStocks() {
    this.filtered = [];
    this.filtered = this.stocks.filter((stock) => {
      return stock.stockname.includes(this.filter);
    });
    // If stock is in stocks
    if (!this.filtered.length > 0) {
      // else fetch stock
      const data = await this.api.searchStock(this.filter);
      // create new stock
      const stock = new Stock(data.stock_name, data.ppo, false);

      this.filtered.push(stock);
    }
  }

  async syncStocks() {
    const user_id = AuthStore.user.id;
    const data = await this.api.getUserFavorites(user_id);
    this.favorite = data.map((stock) => {
      console.log(stock);
      return new Stock(stock.stock_name, stock.ppo);
    });
    this.filtered = this.favorite;
    console.log(this.stocks[0]);
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
