// app/orders/page.js
"use client";
import { useState, useEffect } from 'react';

const styles = {
    ordersContainer: {
      padding: '40px 20px',
      textAlign: 'center',
      background: '#1a1a1a',
      color: 'white',
      minHeight: '100vh',
    },
    orderCard: {
      backgroundColor: '#222',
      padding: '20px',
      borderRadius: '15px',
      marginBottom: '20px',
      textAlign: 'left',
      maxWidth: '600px',
      margin: '0 auto',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
    },
    title: {
      fontSize: '32px',
      marginBottom: '20px',
      color: '#ff4d4d',
    },
    orderTitle: {
      fontSize: '24px',
      marginBottom: '10px',
      color: '#ff4d4d',
    },
    orderDetail: {
      fontSize: '16px',
      marginBottom: '8px',
      color: '#ccc',
    },
  };

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div style={styles.ordersContainer}>
      <h1 style={styles.title}>Tiket yang Sudah Dipesan</h1>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} style={styles.orderCard}>
            <h2>{order.movie.title}</h2>
            <p>Kursi: {order.seats.join(', ')}</p>
            <p>Tanggal: {order.date.day}, {order.date.date}</p>
            <p>Waktu: {order.time}</p>
            <p>Total Harga: Rp {order.totalPrice.toLocaleString()}</p>
            <p>Metode Pembayaran: {order.paymentMethod}</p>
            <p>Status: {order.status}</p>
          </div>
        ))
      ) : (
        <p>Belum ada tiket yang dipesan.</p>
      )}
    </div>
  );
}