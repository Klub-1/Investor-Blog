import React from "react";
import { useEffect } from 'react';
import { StockItem } from "../components/StockItem";
import StocksStore from "../stores/StocksStore";

export const StocksView = () => {  

  useEffect(() => {
    StocksStore.getStocks();
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
            onChange={(e) => { }}
            placeholder="Søg..."
          />
        </div>
      </div>
      {/*  -----------Stock Card content ----------- */}
      
      <div className="grid justify-center grid-cols-5 overflow-y-scroll">
      
        {StocksStore.filteredStocks.map((stock) => (
          <StockItem stock={stock} />
        ))}
    </div>
    </div>
  );
};
