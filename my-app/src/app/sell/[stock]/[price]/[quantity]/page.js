'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SellStock({params}){
    const [sell, setSell] = useState(0);
    const {stock, price, quantity} = params;
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        // Convert sell to a number
        const quantityToSell = Number(sell);
        const struct = { stock, sell: quantityToSell };
        console.log(struct);
        try {
            const response = await fetch('/api/sellStocks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(struct),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log('Stock sold successfully:', result);
                router.push('/'); // Redirect after successful submission
            } else {
                console.log('Failed to sell stock');
            }
        } catch (error) {
            console.error('Error submitting stock:', error);
        }
    };


    return (
        <div className="max-w-md md:max-w-lg lg:max-w-xl mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-4">Sell {stock}</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nasdaqCode" className="block text-gray-700 font-bold mb-2">
                You bought {quantity} shares at the price of {price} each
              </label>
              
            </div>
            <div className="mb-4">   
    
              <label htmlFor="sell" className="block text-gray-700 font-bold mb-2">
                Quantity
              </label>
              <input
                type="number"
                id="sell"
                name="sell"   
                value={sell}
                onChange={(e) => {setSell(e.target.value);}}   
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 sm:px-3 sm:py-1"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-gray-500 sm:py-1 sm:px-3"   
    
            >
              Sell
            </button>
          </form>
        </div>
      );
}