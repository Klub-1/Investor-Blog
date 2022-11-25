import { action, makeObservable, observable, computed } from "mobx";
import { Stock } from "../models/Stock";
import { API } from "../Api/api";

class StocksStore {
    stocks = [];
  filter = "";
  api = new API();

    get filteredStocks() {
      
    const filtered = this.stocks.filter((stocks) => {
      return (
        stocks.stockname.toLowerCase().includes(this.filter.toLowerCase())
      );
    });
        
        if (filtered.length === 0) {
            // TODO: MAKE API CALL
            // INSERT INTO stocks
        }

        return filtered;
    }
    
    async syncStocks() {
        const data = await this.api.getStocks();

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
    });
    }
}

export default new StocksStore();

