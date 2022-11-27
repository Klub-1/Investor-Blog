import React from "react";
import { observer } from "mobx-react-lite";
import { StockItem } from "../components/StockItem";
import StocksStore from "../stores/StocksStore";

import { FiSearch } from "react-icons/fi";
import { useEffect } from "react";

export const StocksView = observer(() => {
  useEffect(() => {
    StocksStore.syncStocks();
  }, []);

  return (
    <div>
      {/*  -----------Search Bar content ----------- */}
      <div className="h-fit w-full shadow rounded-lg bg-white mb-5 md:mb-10 p-3">
        <div className="h-4/6 flex justify-center items-center p-3">
          <h1 className="font-bold text-2xl md:text-4xl">Søg efter aktie</h1>
        </div>
        <div className="flex justify-center pb-3">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
            placeholder="Søg efter aktie..."
            onChange={(e) => StocksStore.setFilterValue(e.target.value)}
          />
          <button
            type="submit"
            className="text-white bg-[#7382D9] hover:bg-[#7382D9] font-medium rounded-lg text-sm w-auto ml-1 px-5 py-2.5 text-center"
            onClick={() => {
              StocksStore.searchStocks();
            }}
          >
            <FiSearch className="text-white" />
          </button>
        </div>
        {/*  -----------Stock Card content ----------- */}

        <div className="grid justify-center grid-cols-5 overflow-y-scroll">
          {StocksStore.filtered.map((stock) => (
            <StockItem key={stock.stock_name} stock={stock} />
          ))}
        </div>
      </div>
    </div>
  );
});
