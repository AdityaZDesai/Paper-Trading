
import connectToDatabase from '@/lib/db';
import Stock from '@/models/Stock';


export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Only POST requests are allowed' });
    }
  
    try {
      // Connect to the database
      await connectToDatabase();
  
      // Parse the incoming request body
      const { stock, price, quantity } = req.body;
  
      // Validate request body
      if (!stock || !price || !quantity) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      // Create a new stock entry
      const newStock = new Stock({
        symbol: stock,
        pricePurchased: price,
        quantity,
      });
  
      // Save the stock to the database
      await newStock.save();
  
      // Respond with success message
      res.status(200).json({ message: 'Stock added successfully' });
    } catch (error) {
      console.error('Error adding stock:', error);
      res.status(500).json({ error: 'Failed to add stock' });
    }
  }