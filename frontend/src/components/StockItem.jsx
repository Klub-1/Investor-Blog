import React from "react";
import { observer } from "mobx-react-lite";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export const StockItem = observer((_stock) => {
  const stock = _stock.stock;
  return (
    <div className="h-max w-11/12 shadow rounded-lg bg-[#7382D9] mb-5 md:mb-10 p-2.5">
      <div className="h-max flex justify-between align-middle text-white text-1xl md:text-4xl">
        <h1 className="font-bold text-white">{stock.stock_name}</h1>
        <button
          onClick={() => {
            stock.toggleFavorite(stock.stock_name);
          }}
        >
          {stock.isFavorite ? (
            <AiFillStar className="text-[#FFF385]" />
          ) : (
            <AiOutlineStar className="text-white" />
          )}
        </button>
      </div>
      <div className="text-1xl md:text-5xl mt-5 text-right font-bold">
        {stock.ppo > 0 && (
          <h1 className="text-[#7CFF89]">
            +{Math.round(stock.ppo * 100) / 100}%
          </h1>
        )}

        {stock.ppo < 0 && (
          <h1 className="text-[#FF82A0]">
            {Math.round(stock.ppo * 100) / 100}%
          </h1>
        )}

        {stock.ppo === 0 && <h1 className="text-white">{stock.ppo}%</h1>}
      </div>
    </div>
  );
});
