import connectToDatabase from '@/lib/db';
import Stock from '@/models/Stock';


async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Only POST requests are allowed' });
    }
  
    try {
      // Connect to the database
      await connectToDatabase();
  
      // Parse the incoming request body
      const { stock, sell } = req.body;
  
      // Validate request body
      if (!stock || !sell) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      // Create a new stock entry
      const oldQuantity = await Stock.findOne({symbol: `${stock}`});
      console.log(oldQuantity.quantity, sell)
      const newQuantity = oldQuantity.quantity - sell
      console.log("NEW QUANTITY", newQuantity);
      newQuantity == 0 ? await Stock.findOneAndDelete({symbol: `${stock}`}) : await Stock.findOneAndUpdate({symbol: `${stock}`}, {quantity: newQuantity});
      
    
      // Save the stock to the database
      
  
      // Respond with success message
      res.status(200).json({ message: 'Stock sold successfully' });
    } catch (error) {
      console.error('Error adding stock:', error);
      res.status(500).json({ error: 'Failed to add stock' });
    }
  }

export default handler;