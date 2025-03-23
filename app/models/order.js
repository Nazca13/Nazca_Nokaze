// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  movie: { type: Object, required: true }, // Data film
  seats: { type: Array, required: true },  // Kursi yang dipilih
  date: { type: Object, required: true },  // Tanggal yang dipilih
  time: { type: String, required: true },  // Waktu yang dipilih
  totalPrice: { type: Number, required: true }, // Total harga
  paymentMethod: { type: String, required: true }, // Metode pembayaran
  status: { type: String, default: 'Paid' }, // Status pembayaran
}, { timestamps: true });

// Export model Order
export default mongoose.models.Order || mongoose.model('Order', orderSchema);