import React from 'react'
import { useState } from "react";

import {
    AiOutlineStar,
    AiFillStar
} from "react-icons/ai";



export const StockItem = (stock) => {
  const symbol = stock["Meta Data"]["1: Symbol"];
  const ppo = stock["Technical Analysis: PPO"]["2022-11-04"]["PPO"];
const [favorite, setFavorite] = useState(false);
  return (
    <div className='h-max w-11/12 shadow rounded-lg bg-[#7382D9] mb-5 md:mb-10 p-2.5'>
        <div className='h-max flex justify-between align-middle text-white text-1xl md:text-4xl'>
              <h1 className='font-bold text-white'>
                  {symbol}
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
          <div className='text-1xl md:text-5xl mt-5 text-right font-bold'>
            
              {ppo > 0 && (
                  <h1 className='text-[#7CFF89]'>
                +{Math.round(ppo * 100) / 100}%
            </h1>
              )}

              {ppo < 0 && (
                  <h1 className='text-[#FF82A0]'>
                {Math.round(ppo * 100) / 100}%
            </h1>
              )}

              {ppo === 0 && (
                  <h1 className='text-white'>
                {ppo}%
            </h1>
              )}

        </div>
    </div>
  )
}
