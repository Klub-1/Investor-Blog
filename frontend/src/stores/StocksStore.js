import { action, makeObservable, observable, computed } from "mobx";
import { Stock } from "../models/Stock";
import { API } from "../Api/api";
import AuthStore from "./AuthStore";

class StocksStore {
    stocks = [];
  filter = "";
  api = new API();

  setFilterValue(value) {
    this.filter = value;
  }

    get filteredStocks() {
      
    let filtered = this.stocks.filter((stocks) => {
      return (
        stocks.stockname.toLowerCase().includes(this.filter.toLowerCase())
      );
    });
        
      if (this.filter.length > 3 && filtered.length === 0) {
        const data = this.api.searchStock(this.filter)
      }
      
      return filtered;
    }
    
    async syncStocks() {
        const user_id = AuthStore.user.id;
    const data = await this.api.getUserFavorites(user_id);
        this.stocks = data.map((stock) => {
            return new Stock(stock.stock_name, stock.ppo)
    });        
  }
  

 
  constructor() {
    makeObservable(this, {
        stocks: observable,
        filter: observable,
        setFilterValue: action,
      filteredStocks: computed,
      syncStocks: action
    });

    this.syncStocks();
    }
}

export default new StocksStore();

