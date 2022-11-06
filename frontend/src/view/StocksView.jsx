import React from "react";
import { useState, useEffect } from 'react';
import { StocksData } from "../Data/TestData/StocksData";
import { StockItem } from "../components/StockItem";
import axios from 'axios';

function Stocks() {
  // 👇️ using window.location.href 👇️
  window.location.href = 'http://localhost:8000/stocks';
  return null;
}


// const personsJson = `{
//   "1":{
//       "firstName":"Jan",
//       "lastName":"Kowalski"
//   },
//   "2":{
//       "firstName":"Justyna",
//       "lastName":"Kowalczyk"
//   }
// }`;
// const res = JSON.parse(xhr.responseText);
// for (const key in res){
//   if(obj.hasOwnProperty(key)){
//     console.log(`${key} : ${res[key]}`)
//   }
// }


export const StocksView = () => {

  const [stocks, setStocks] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/stocks')
      .then(res => {
        console.log(res.data);
        const ppoData = res.data["Technical Analysis: PPO"];
        const date = Object.keys(ppoData)[0];
        console.log(res.data["Meta Data"]["1: Symbol"]);
        console.log(res.data["Technical Analysis: PPO"][date]["PPO"]);        
        setStocks(res.data);     
        const personsObject = JSON.parse(res.data);
        console.log(personsObject);
        const personsMap = new Map(Object.entries(personsObject));
        console.log(personsMap);
      })
      .catch(err => console.log(err));
  }, ['http://localhost:8000/stocks']);


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
      
        {stocks.map((stock) => (
          <StockItem stock={stock} />
        ))}
    </div>
    </div>
  );
};
