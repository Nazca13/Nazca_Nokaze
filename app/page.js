"use client"; // Next.js Client Component
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const slides = [
    {
      image: "/1319608.jpeg",
      title: "Kraven The Hunter",
      buttonText: "Book Now",
      trailerText: "Watch Trailer"
    },
    {
      image: "/soonccc.jpg",
      title: "Sonic The Hedgehog 3",
      buttonText: "Get Tickets",
      trailerText: "Watch Now"
    }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={styles.main}>
      {/* HEADER */}
      <header style={styles.header}>
        <div className="logo">
          <Image src="/Paragon-removebg-preview.png" alt="Paragon Cinemas Logo" width={120} height={90} />
        </div>
        <nav style={styles.navigation}>
          <ul style={styles.navList}>
            <li><a 
            href="/login" 
            style={styles.navLink} 
            onMouseEnter={(e) => e.target.style.color = "red"} 
             onMouseLeave={(e) => e.target.style.color = "white"}
             >
               Login
               </a>
               </li>
          </ul>
        </nav>
      </header>

      {/* SLIDER */}
      <section style={styles.hero}>
        <div style={styles.slider}>
          {slides.map((slide, i) => (
            <div key={i} style={{ ...styles.slide, opacity: i === index ? 1 : 0 }}>
              <Image src={slide.image} alt="Slider Image" width={1920} height={610} style={styles.slideImage} />
              <div style={styles.text}>
                <h1 style={styles.textTitle}>{slide.title}</h1>
                <div style={styles.buttons}>
                  <a href="#" style={styles.bookButton}>{slide.buttonText}</a>
                  <a href="#" style={styles.trailerButton}>{slide.trailerText}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          {/* Garis putih di bawah deskripsi */}
          <div style={styles.footerLine}></div>

          <Image 
            src="/Paragon-removebg-preview.png" 
            alt="Footer Logo" 
            width={300} 
            height={230} 
            style={{ marginBottom: "-100px", marginLeft: "30px" }} 
          />

          <p style={styles.footerDescription}>
            PARAGON is a leading cinema ticket booking platform that provides the best experience in ordering tickets online. We are committed to providing fast, safe, and accessible services, so you can enjoy your favorite films without any hassle. With an intuitive interface and a trusted payment system, PARAGON ensures the convenience and security of every transaction. Enjoy the convenience of booking tickets anytime, anywhere, with just a few clicks!
          </p>

          <div style={styles.footerLine}></div>

          <div style={styles.footerLinks}>
            <a 
              href="#" 
              style={styles.footerLink} 
              onMouseEnter={(e) => e.target.style.color = "red"} 
              onMouseLeave={(e) => e.target.style.color = "#ccc"}
            >
              Instagram
            </a>
            <a 
              href="#" 
              style={styles.footerLink} 
              onMouseEnter={(e) => e.target.style.color = "red"} 
              onMouseLeave={(e) => e.target.style.color = "#ccc"}
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              style={styles.footerLink} 
              onMouseEnter={(e) => e.target.style.color = "red"} 
              onMouseLeave={(e) => e.target.style.color = "#ccc"}
            >
              Contact Us
            </a>
          </div>

          <p style={styles.copyright}>© 2024 Paragon Cinemas. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

const styles = {
  main: { backgroundColor: "#000", color: "white", fontFamily: "Arial, sans-serif", width: "100%", overflowX: "hidden" },

  /* HEADER */
  header: { display: "flex", alignItems: "center", padding: "10px 20px", background: "#000", height: "50px", width: "100%" },
  navigation: { flexGrow: 1, textAlign: "right", marginLeft: "1035px" },
  navList: { listStyle: "none", display: "flex", gap: "20px", padding: 0 },
  navLink: { color: "white", textDecoration: "none", fontSize: "16px", fontWeight: "bold" },

  /* SLIDER */
  hero: { position: "relative", marginBottom: "50px", width: "100%" },
  slider: { position: "relative", width: "100%", overflow: "hidden", height: "610px" },
  slide: { position: "absolute", width: "100%", height: "100%", transition: "opacity 1s ease-in-out" },
  slideImage: { width: "100%", height: "100%", objectFit: "cover" },
  text: { position: "absolute", bottom: "7%", left: "7%", textAlign: "left", color: "white" },
  textTitle: { fontSize: "48px", marginBottom: "20px" },
  buttons: { display: "flex", gap: "20px", justifyContent: "flex-start" },
  bookButton: { padding: "10px 20px", fontSize: "16px", fontWeight: "bold", textDecoration: "none", borderRadius: "5px", backgroundColor: "red", color: "white" },
  trailerButton: { padding: "10px 20px", fontSize: "16px", fontWeight: "bold", textDecoration: "none", borderRadius: "5px", border: "2px solid white", color: "white" },

  /* FOOTER */
  footer: { color: "#fff", padding: "40px 20px", marginTop: "10px", fontFamily: "Arial, sans-serif", width: "100%" },
  footerContent: { maxWidth: "1200px", width: "100%", display: "flex", flexDirection: "column", gap: "15px", margin: "0 auto", padding: "50px" },
  footerDescription: { fontSize: "16px", color: "#ccc", textAlign: "left", width: "30%", maxWidth: "800px", paddingBottom: "20px", marginLeft: "100px" },

  /* Garis putih */
  footerLine: { width: "100%", maxWidth: "1035px", height: "1px", backgroundColor: "white", margin: "20px auto", opacity: "30%" },

  footerLinks: { display: "flex", justifyContent: "center", gap: "15px", width: "100%", marginLeft: "300px" },
  footerLink: { color: "#ccc", textDecoration: "none", fontSize: "12px", transition: "color 0.3s ease" },
  copyright: { fontSize: "12px", color: "#888", letterSpacing: "2px", marginTop: "55px", textAlign: "center", marginRight: "600px", marginTop: "-30px" },
};