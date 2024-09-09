'use client';
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from 'next/link'

import { useState, useEffect } from "react";


export default function Home() {
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
                    className="mx-auto w-full bg-white rounded-lg p-2 shadow-md flex flex-col items-center w-full max-w-[500px] text-left hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="font-semibold">{stock.symbol}</span>
                    </div>
                    <div className="flex items-center mb-1">
                      <span className="mr-2">Price:</span>
                      <span className="text-green-500">${stock.currentPrice}</span>
                    </div>
                    <div className="flex items-center mb-1">
                      <span className="mr-2">Quantity:</span>
                      <span>{stock.quantity}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">Profit:</span>
                      <span className="text-green-500">${stock.profit}</span>
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


