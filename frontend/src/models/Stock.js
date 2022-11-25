import { makeAutoObservable } from "mobx";
import { API } from "../Api/api";

export class Stock {
  stock_name = "";
  ppo = 0.0; //float
  isFavorite = false;

    api = new API();
    
    getFavorite() {
        //TODO: CHECK IF STOCK EXISTS IN USER DB TABLE
        const isFav = false; // TODO: MAKE API CALL
        this.isFavorite = isFav;
    }

  constructor(stockname, ppo) {
      makeAutoObservable(this);
      this.stock_name = stockname;
      this.ppo = ppo;
      this.getFavorite();
  }
  
  toggleFavorite(){
    this.isFavorite = !this.isFavorite;
  }
}