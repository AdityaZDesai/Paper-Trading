import connectToDatabase from '@/lib/db';
import Stock from '@/models/Stock';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Connect to the database
      await connectToDatabase();
      const finnhub = require('finnhub');

    //using the finnhub api in order to get the stock prices
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = process.env.API_KEY;
    const finnhubClient = new finnhub.DefaultApi();
      // Retrieve all stocks from the database
      const stocks = await Stock.find({});
      const stocksWithCurrentPrice = await Promise.all(
        stocks.map(async (stock) => {
          return new Promise((resolve, reject) => {
            // Get current stock price using the Finnhub API
            finnhubClient.quote(stock.symbol, (error, data, response) => {
              if (error) {
                console.error(`Error fetching price for ${stock.symbol}:`, error);
                return resolve({
                  symbol: stock.symbol,
                  pricePurchased: stock.pricePurchased,
                  quantity: stock.quantity,
                  currentPrice: 'N/A', // Could not fetch the price
                  profit: 'N/A',
                });
              }

              const currentPrice = data.c; // The current price from Finnhub
              const profit = (currentPrice - stock.pricePurchased) * stock.quantity;

              resolve({
                symbol: stock.symbol,
                pricePurchased: stock.pricePurchased,
                quantity: stock.quantity,
                currentPrice: currentPrice,
                profit: profit,
              });
            });
          });
        })
      );

      // Respond with the enhanced stock data
      res.status(200).json(stocksWithCurrentPrice);
    } catch (error) {
      console.error('Error fetching stocks:', error);
      res.status(500).json({ error: 'Failed to fetch stocks' });
    }
  } else {
    // If not a GET request, return a 405 Method Not Allowed error
    res.status(405).json({ message: 'Only GET requests are allowed' });
  }
}