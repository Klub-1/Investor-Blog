import { action, makeObservable, observable } from "mobx";
import { API } from "../Api/api";

class StocksStore {
    stocks = [];
  filter = "";
  api = new API();

  get filteredStocks() {
    return this.stocks.filter((stocks) => {
      return (
        stocks.stockname.toLowerCase().includes(this.filter.toLowerCase())
      );
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

