import { makeAutoObservable } from "mobx";
import { API } from "../Api/api";

export class Stock {
  stock_name = "";
  ppo = 0.0; //float
  isFavorite = false;

  api = new API();

  constructor(stockname, ppo, isFavorite) {
      makeAutoObservable(this);
      this.stock_name = stockname;
    this.ppo = ppo;
    this.isFavorite = isFavorite;
  }
  
  toggleFavorite(){
    this.isFavorite = !this.isFavorite;
  }
}