import React from "react";
import { observer } from "mobx-react-lite";
import { useEffect } from 'react';
import { StockItem } from "../components/StockItem";
import StocksStore from "../stores/StocksStore";

export const StocksView = observer(() => {  

  useEffect(() => {
    StocksStore.syncStocks();
  });

  return (
    <div>
      {/*  -----------Search Bar content ----------- */}
      <div className="h-fit w-full shadow rounded-lg bg-white mb-5 md:mb-10 p-3">
        <div className="h-4/6 flex justify-center items-center p-3">
          <h1 className="font-bold text-2xl md:text-4xl">Søg efter aktie</h1>
        </div>
        <div className="flex justify-center">
          <input
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 mb-3"
            id="SearchInputField"
            onChange={(e) => { StocksStore.setFilterValue(e.target.value); }}
            placeholder="Søg..."
          />
        </div>
        <div>
          <button variant="Outlined">
            Søg
          </button>
        </div>
      </div>
      {/*  -----------Stock Card content ----------- */}
      
      <div className="grid justify-center grid-cols-5 overflow-y-scroll">
      
        {StocksStore.filteredStocks.map((stock) => (
          <StockItem key={stock.stock_name} stock={stock} />
        ))}
    </div>
    </div>
  );
});
