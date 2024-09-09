'use client';
import {redirect, useRouter} from 'next/navigation';

import { useState, useEffect, handleSubmit } from "react";
export default function Buy(){
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [addedToDb, setaddedToDb] = useState("False");
    const [errorMessage, setErrorMessage] = useState("Please enter a valid stock name");
    //upong change to the stock name part of the form
    const handleChange = (e) => {
        const value = e.target.value;
        console.log(value);
        setStock(value);
    }

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        setQuantity(value);
    }
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        const struct = { stock, price, quantity };
    
        try {
            const response = await fetch('/api/addStock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(struct),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log('Stock added successfully:', result);
                router.push('/'); // Redirect after successful submission
            } else {
                console.log('Failed to add stock');
            }
        } catch (error) {
            console.error('Error submitting stock:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
        console.log("CHECK DATAB")

        try { 
            const response = await fetch(`/api/checkStock?stock=${stock}`);
            const data = await response.json();
            setPrice(data);
        } catch (error){
            console.log("Error fetching stock data: ", error);
            setStock("");
            setErrorMessage("Invalid Stock, please enter a valid stock")
        
        }
    }
    const debounceFetch = setTimeout(fetchData, 500);

    return () => clearTimeout(debounceFetch); // Cleanup debounce timeout

}, [stock])     

    // Delay API fetch to avoid calling on every keystroke (debouncing)

    return (
        <div className="max-w-md md:max-w-lg lg:max-w-xl mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-4">Buy Stocks</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nasdaqCode" className="block text-gray-700 font-bold mb-2">
                NASDAQ Code
              </label>
              <input
                type="text"
                id="nasdaqCode"
                name="nasdaqCode"
                value={stock}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 sm:px-3 sm:py-1"
              />
            </div>
            <div className="mb-4">   
    
              <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"   
    
                value={quantity}
                onChange={handleQuantityChange}   
    
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 sm:px-3 sm:py-1"
              />
            </div>
            <div className="mb-4">   
    
              <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
                Price
              </label>
              <input
                type="number"
                step="0.01"   
    
                id="price"
                name="price"
                value={price}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 sm:px-3 sm:py-1"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-gray-500 sm:py-1 sm:px-3"   
    
            >
              Buy
            </button>
          </form>
        </div>
      );
}

