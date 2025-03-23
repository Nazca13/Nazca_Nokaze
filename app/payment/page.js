"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const styles = {
  paymentContainer: {
    padding: "40px 20px",
    textAlign: "center",
    background: "#000",
    color: "white",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  paymentForm: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "500px",
    width: "100%",
    padding: "30px",
    backgroundColor: "#111",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(255, 0, 0, 0.3)",
    border: "1px solid #333",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
    color: "red",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  infoSection: {
    textAlign: "left",
    marginBottom: "20px",
  },
  infoLabel: {
    fontSize: "14px",
    color: "#888",
    marginBottom: "5px",
  },
  infoValue: {
    fontSize: "18px",
    color: "white",
    fontWeight: "bold",
  },
  paymentOption: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  paymentButton: {
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "2px solid red",
    backgroundColor: "transparent",
    color: "white",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    ":hover": {
      backgroundColor: "red",
      transform: "scale(1.05)",
    },
  },
  selectedPayment: {
    backgroundColor: "red",
    borderColor: "red",
  },
  payButton: {
    padding: "15px 30px",
    fontSize: "18px",
    fontWeight: "bold",
    textDecoration: "none",
    borderRadius: "8px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    ":hover": {
      backgroundColor: "#cc0000",
      transform: "scale(1.05)",
    },
  },
};

export default function PaymentPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    // Ambil data dari localStorage
    const data = JSON.parse(localStorage.getItem('bookingData'));
    if (!data) {
      router.push('/'); // Jika tidak ada data, arahkan ke halaman utama
    } else {
      setBookingData(data);
    }
  }, [router]);

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Pilih metode pembayaran terlebih dahulu!');
      return;
    }

    // Simpan data pembayaran ke localStorage
    const order = {
      ...bookingData,
      paymentMethod,
      status: 'Paid',
    };
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    savedOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(savedOrders));
    router.push('/orders');
  };

  if (!bookingData) {
    return <div>Loading...</div>;
  }

  const { movie, selectedSeats, selectedDate, selectedTime, totalPrice } = bookingData;

  return (
    <div style={styles.paymentContainer}>
      <h1 style={styles.title}>Payment</h1>
      <div style={styles.paymentForm}>
        <div style={styles.infoSection}>
          <p style={styles.infoLabel}>Film:</p>
          <p style={styles.infoValue}>{movie.title}</p>
        </div>
        <div style={styles.infoSection}>
          <p style={styles.infoLabel}>Seat:</p>
          <p style={styles.infoValue}>{selectedSeats.join(", ")}</p>
        </div>
        <div style={styles.infoSection}>
          <p style={styles.infoLabel}>Date:</p>
          <p style={styles.infoValue}>{selectedDate.day}, {selectedDate.date}</p>
        </div>
        <div style={styles.infoSection}>
          <p style={styles.infoLabel}>Time:</p>
          <p style={styles.infoValue}>{selectedTime}</p>
        </div>
        <div style={styles.infoSection}>
          <p style={styles.infoLabel}>Total:</p>
          <p style={styles.infoValue}>Rp {totalPrice.toLocaleString()}</p>
        </div>

        <h2 style={{ fontSize: "20px", marginBottom: "15px", color: "white" }}>Payment</h2>
        <div style={styles.paymentOption}>
          <button
            style={{
              ...styles.paymentButton,
              ...(paymentMethod === "tunai" && styles.selectedPayment),
            }}
            onClick={() => setPaymentMethod("tunai")}
          >
            Cash
          </button>
          <button
            style={{
              ...styles.paymentButton,
              ...(paymentMethod === "qris" && styles.selectedPayment),
            }}
            onClick={() => setPaymentMethod("qris")}
          >
            QRIS
          </button>
        </div>

        <button type="button" onClick={handlePayment} style={styles.payButton}>
          Pay Now
        </button>
      </div>
    </div>
  );
}