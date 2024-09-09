'use client';
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from 'next/link'

import { useState, useEffect } from "react";


function Home() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch('/api/getStocks');
        if (response.ok) {
          const data = await response.json();
          setStocks(data);
        } else {
          console.error('Failed to fetch stocks');
        }
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchStocks();
  }, []);

  const router = useRouter();
  const handleStockClick = (e, price, quantity) => {
    console.log(e);
       router.push(`/sell/${e}/${price}/${quantity}`)    
  }

  const totalProfit = stocks.reduce((total, stock) => total + stock.profit, 0).toFixed(2);
  const totalValue = stocks.reduce((total, stock) => total + stock.currentPrice * stock.quantity, 0).toFixed(2);

  return (
    <div className="items-center min-h-screen bg-gray-100 py-8">
      <div className="container max-w-lg mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-8">Dashboard</h1>
        <div className="flex flex-wrap justify-between gap-4 mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md flex flex-col items-center  max-w-[150px] w-full">
            <h2 className="text-l font-semibold mb-2">Total Value</h2>
            <p className="text-m font-bold">${totalValue}</p>
          </div>
          <div className="bg-white rounded-lg p-1 shadow-md flex flex-col items-center  max-w-[150px] w-full">
            <h2 className="text-l font-semibold mb-2">Total Profit/Loss</h2>
            <p className="text-m font-bold" style={{ color: totalProfit < 0 ? 'red' : 'green' }}>${totalProfit}</p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Portfolio</h2>
          <p className="mb-4">Click on a stock to sell it!</p>
          <ul className="divide-y divide-gray-200">
            {stocks.length === 0 ? (
              <li className="py-4 text-center">No stocks added yet</li>
            ) : (
              stocks.map((stock) => (
                <li key={stock._id} className="py-4">
  <button
    onClick={() => handleStockClick(stock.symbol, stock.pricePurchased, stock.quantity)}
    className="mx-auto bg-white rounded-lg p-3 shadow-md flex items-center justify-between w-full max-w-[500px] text-left hover:bg-gray-100 transition-colors"
  >
    <div className="flex items-center">
      <span className="font-semibold text-xl">{stock.symbol}</span>
    </div>
    <div className="text-right">
      <div className="text-xl font-semibold">{stock.currentPrice} USD</div>
      <div className={`${stock.profit < 0 ? 'text-red-500' : 'text-green-500'} text-sm`}>
        {stock.profit < 0 ? `-${Math.abs(stock.profit)} USD` : `+${stock.profit} USD`}
      </div>
      <div className="text-xs text-gray-500">
        ({stock.quantity} units)
      </div>
    </div>
  </button>
</li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};


export default Home;