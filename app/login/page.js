"use client"; // Next.js Client Component

import { useState } from "react";
import Image from "next/image";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("✅ Login Berhasil!");
        // Redirect ke halaman lain (contoh: dashboard)
        window.location.href = "/dashboard";
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (error) {
      setMessage("⚠️ Terjadi kesalahan. Coba lagi.");
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.mainContainer}>
        <Image src="/Paragon-removebg-preview.png" alt="Paragon Logo" width={120} height={100} style={styles.paragonImage} />
        <div style={styles.loginBox}>
          <h2 style={styles.loginTitle}>Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" style={styles.label}>Email or Phone</label>
            <input type="text" id="email" placeholder="Enter your email or phone" value={formData.email} onChange={handleChange} required style={styles.input} />

            <label htmlFor="password" style={styles.label}>Password</label>
            <input type="password" id="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required style={styles.input} />

            <div style={styles.forgotSignup}>
              <a href="#" style={styles.forgotPassword}>Forgot Password?</a>
              <a href="/register" style={styles.signup}>Signup now</a>
            </div>

            <button type="submit" style={styles.loginBtn}>Login</button>
          </form>
          <p style={{ color: "white", marginTop: "10px" }}>{message}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  body: { fontFamily: "'Plus Jakarta Sans', sans-serif", background: "linear-gradient(to bottom, #1a1a1a, #000000)", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", padding: "20px" },
  mainContainer: { textAlign: "center", width: "100%", maxWidth: "350px", padding: "40px 25px", background: "rgba(38, 37, 37, 0.9)", borderRadius: "20px", boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.5)", transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", backdropFilter: "blur(10px)" },
  paragonImage: { width: "120px", height: "auto", marginBottom: "15px" },
  loginTitle: { color: "#ffffff", fontSize: "26px", marginBottom: "25px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1.2px" },
  label: { display: "block", textAlign: "left", color: "#D50000", fontSize: "14px", margin: "10px 0 5px", fontWeight: "500" },
  input: { width: "85%", padding: "12px", border: "2px solid #171717", borderRadius: "10px", background: "#171717", color: "#D50000", fontSize: "16px", transition: "all 0.3s ease" },
  forgotSignup: { display: "flex", justifyContent: "space-between", marginTop: "10px" },
  forgotPassword: { color: "#d40000", textDecoration: "none", fontSize: "13px", fontWeight: "500", transition: "color 0.3s ease" },
  signup: { color: "#d40000", textDecoration: "none", fontSize: "13px", fontWeight: "500", transition: "color 0.3s ease" },
  loginBtn: { width: "100%", padding: "14px", background: "#d40000", color: "#ffffff", border: "none", borderRadius: "10px", fontSize: "18px", fontWeight: "600", cursor: "pointer", marginTop: "15px", transition: "background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease" }
};
