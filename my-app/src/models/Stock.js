import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  pricePurchased: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Stock || mongoose.model('Stock', stockSchema);