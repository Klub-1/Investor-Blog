import React from 'react'
import { useState } from "react";

import {
    AiOutlineStar,
    AiFillStar
} from "react-icons/ai";



export const StockItem = (stock) => {
const [favorite, setFavorite] = useState(false);
  return (
    <div className='h-[200px] w-[300px] shadow rounded-lg bg-[#7382D9] mb-5 md:mb-10 p-2.5'>
        <div className='h-fit flex justify-between align-middle text-white text-2xl md:text-4xl'>
              <h1 className='font-bold text-white'>
                  {stock.symbol}
            </h1>
              <button
                  onClick={() => { setFavorite(!favorite) }}
            >
              {favorite ? (
                <AiFillStar className="text-[#FFF385]" />
              ) : (
                <AiOutlineStar className='text-white' />
              )}
            </button>
        </div>
          <div className='text-2xl md:text-5xl mt-5 text-right font-bold'>
            
              {stock.ppo > 0 && (
                  <h1 className='text-[#7CFF89]'>
                +{stock.ppo}%
            </h1>
              )}

              {stock.ppo < 0 && (
                  <h1 className='text-[#FF82A0]'>
                {stock.ppo}%
            </h1>
              )}

              {stock.ppo === 0 && (
                  <h1 className='text-white'>
                {stock.ppo}%
            </h1>
              )}

        </div>
    </div>
  )
}
