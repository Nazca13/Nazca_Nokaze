"use client"; // Next.js Client Component

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link untuk navigasi

export default function AllMovies() {
  
  // State untuk slider hero
  const [heroIndex, setHeroIndex] = useState(0);
  const heroSlides = [
    {
      src: "/soonccc.jpg",
      alt: "Sonic The Hedgehog 3",
      title: "Sonic The Hedgehog 3",
      buttonText: "Book Now",
      trailerText: "Watch Trailer",
      bookLink: "/booking/sonic",
      trailerLink: "/trailer/sonic",
    },
    {
      src: "/1319608.jpeg",
      alt: "Kraven The Hunter",
      title: "Kraven The Hunter",
      buttonText: "Book Now",
      trailerText: "Watch Trailer",
      bookLink: "/booking/kraven",
      trailerLink: "/trailer/kraven",
    },
  ];

  // Auto-slide untuk hero section
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Fungsi untuk navigasi slide
  const nextSlide = () => {
    setHeroIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setHeroIndex((prevIndex) => (prevIndex - 1 + heroSlides.length) % heroSlides.length);
  };

  // Data poster film
  const moviePosters = [
    { src: "/movieposter/1ea5bb93c0964c108a60e8941a7a087a 2.png", name: "Kraven The Hunter", id: 1, detailPage: "/booking/1" },
    { src: "/movieposter/08a07e21bc8648268a5ab0d64197374a 1.png", name: "Wicked", id: 2, detailPage: "/booking/2" },
    { src: "/movieposter/64d4ba8931d24bd0ab19c25af6f0ce25 1.png", name: "Den Of Thieves 2:Pantera", id: 3, detailPage: "/booking/3" },
    { src: "/movieposter/172a6c5f73c3433e94f9bc3f2175f63f 1.png", name: "Red One", id: 4, detailPage: "/booking/4" },
    { src: "/movieposter/0341fbc0122b4b2b8c2cc1d19da3348a 1.png", name: "Utusan Iblis", id: 5, detailPage: "/booking/5" },
    { src: "/movieposter/342e1375f12b4209b74b876d70224d29 1.png", name: "Santet segoro Pitu", id: 6, detailPage: "/booking/6" },
    { src: "/movieposter/88096e26ffde412193c8597fd46bb94c 1.png", name: "Ketindihan", id: 7, detailPage: "/booking/7" },
    { src: "/movieposter/be19a93cabf644209d00bed2b9ffa423.png", name: "Hutang Nyawa", id: 8, detailPage: "/booking/8" },
    { src: "/movieposter/c275f631d4944b8ba283abcf7296ec0a 1.png", name: "2ND Miracle In Cell No.7", id: 9, detailPage: "/booking/9" },
    { src: "/movieposter/ce82fa8c1da94bbabfb6203b8e2f61e7 1.png", name: "Hear Me: Our Summer", id: 10, detailPage: "/booking/10" },
    { src: "/movieposter/d88f9d3ed4584ef3a6225f6d1f200c7e 1.png", name: "Baby John", id: 11, detailPage: "/booking/11" },
    { src: "/movieposter/fb5539e3326542ad91aaa13a5463c0ff 1.png", name: "The Prosecutor", id: 12, detailPage: "/booking/12" },
    { src: "/movieposter/fd41cc58175b4f7b90e1bc1689e6bee9 1.png", name: "Mufasa: The Lion King", id: 13, detailPage: "/booking/13" },
    { src: "/movieposter/harbin 1.png", name: "Harbin", id: 14, detailPage: "/booking/14" },
    { src: "/movieposter/sonic.png", name: "Sonic The Hedgehog 3", id: 15, detailPage: "/booking/15" },
    { src: "/movieposter/thumb-1920-1380668 2.png", name: "Venom The Last dance", id: 16, detailPage: "/booking/16" },
  ];

  return (
    <main style={styles.main}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <Image
            src="/Paragon-removebg-preview.png"
            alt="Paragon Cinemas Logo"
            width={120}
            height={90}
          />
        </div>
        <nav style={styles.navigation}>
          <ul style={styles.navList}>
            <li>
              <a
                href="/homepage"
                style={styles.navLink}
                onMouseEnter={(e) => (e.target.style.color = "red")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                HomePage
              </a>
            </li>
            <li>
              <a
                href="#"
                style={styles.navLink}
                onMouseEnter={(e) => (e.target.style.color = "red")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                Tickets
              </a>
            </li>
            <li>
              <a
                href="/login"
                style={styles.navLink}
                onMouseEnter={(e) => (e.target.style.color = "red")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                Profile
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* SLIDER */}
      <section style={styles.hero}>
        <div style={styles.slider}>
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              style={{ ...styles.slide, opacity: idx === heroIndex ? 1 : 0 }}
            >
              <Image src={slide.src} alt={slide.alt} width={1920} height={610} style={styles.slideImage} />
              <div style={styles.text}>
                <h1 style={styles.textTitle}>{slide.title}</h1>
                <div style={styles.buttons}>
                  <Link href={slide.bookLink} passHref legacyBehavior>
                    <a style={styles.bookButton}>{slide.buttonText}</a>
                  </Link>
                  <Link href={slide.trailerLink} passHref legacyBehavior>
                    <a style={styles.trailerButton}>{slide.trailerText}</a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button style={styles.prevButton} onClick={prevSlide}>
          &#10094;
        </button>
        <button style={styles.nextButton} onClick={nextSlide}>
          &#10095;
        </button>
      </section>

      {/* MOVIE POSTERS */}
      <section style={styles.moviePosters}>
        <h1 style={styles.movieTitle}>Now Showing</h1>
        <div style={styles.posterGrid}>
          {moviePosters.map((movie, index) => (
            <div key={index} style={styles.poster}>
              {/* Hapus Link dari poster */}
              <div style={styles.posterLink}>
                <Image
                  src={movie.src}
                  alt={`Movie Poster ${index + 1}`}
                  width={250}
                  height={375}
                  style={styles.posterImage}
                />
                <div style={styles.posterDetails}>
                  <p style={styles.movieName}>{movie.name}</p>
                  {/* Tambahkan Link hanya pada tombol panah merah */}
                  <Link href={movie.detailPage} passHref legacyBehavior>
                    <button style={styles.arrowButton}>&#10095;</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
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
              onMouseEnter={(e) => (e.target.style.color = "red")}
              onMouseLeave={(e) => (e.target.style.color = "#ccc")}
            >
              Instagram
            </a>
            <a
              href="#"
              style={styles.footerLink}
              onMouseEnter={(e) => (e.target.style.color = "red")}
              onMouseLeave={(e) => (e.target.style.color = "#ccc")}
            >
              Terms of Service
            </a>
            <a
              href="#"
              style={styles.footerLink}
              onMouseEnter={(e) => (e.target.style.color = "red")}
              onMouseLeave={(e) => (e.target.style.color = "#ccc")}
            >
              Contact Us
            </a>
          </div>
          <p style={styles.copyright}>© 2025 Paragon Cinemas. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

// Styles
const styles = {
  main: { backgroundColor: "#000", color: "white", fontFamily: "Arial, sans-serif", width: "100%", overflowX: "hidden" },

  /* HEADER */
  header: { display: "flex", alignItems: "center", padding: "10px 20px", background: "#000", height: "70px", width: "100%" },
  logo: { marginRight: "100px" },
  logoImage: { height: "90px" },
  navigation: { flexGrow: 1, textAlign: "right", marginLeft: "770px" },
  navList: { listStyle: "none", display: "flex", gap: "20px", padding: 0 },
  navLink: { color: "white", textDecoration: "none", fontSize: "16px", fontWeight: "bold" },

  /* SLIDER */
  hero: { position: "relative", marginBottom: "50px", width: "100%" },
  slider: { position: "relative", width: "100%", overflow: "hidden", height: "610px" },
  slide: { position: "absolute", width: "100%", height: "100%", opacity: 0, transition: "opacity 1s ease-in-out" },
  slideImage: { width: "100%", height: "100%", objectFit: "cover" },
  text: { position: "absolute", bottom: "7%", left: "7%", textAlign: "left", color: "white" },
  textTitle: { fontSize: "48px", marginBottom: "20px" },
  buttons: { display: "flex", gap: "20px", justifyContent: "flex-start" },
  bookButton: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    borderRadius: "5px",
    backgroundColor: "red",
    color: "white",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    ":hover": {
      backgroundColor: "#cc0000",
      transform: "scale(1.05)",
    },
  },
  trailerButton: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    borderRadius: "5px",
    border: "2px solid white",
    color: "white",
    transition: "background-color 0.3s ease, color 0.3s ease, transform 0.3s ease",
    ":hover": {
      backgroundColor: "white",
      color: "black",
      transform: "scale(1.05)",
    },
  },
  prevButton: { position: "absolute", top: "50%", left: "20px", transform: "translateY(-50%)", background: "red", color: "white", border: "none", padding: "15px", fontSize: "24px", cursor: "pointer", borderRadius: "50%", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center" },
  nextButton: { position: "absolute", top: "50%", right: "20px", transform: "translateY(-50%)", background: "red", color: "white", border: "none", padding: "15px", fontSize: "24px", cursor: "pointer", borderRadius: "50%", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center" },

  /* MOVIE POSTERS */
  moviePosters: { padding: "20px", textAlign: "center", background: "#000" },
  movieTitle: { fontSize: "36px", color: "red", marginBottom: "20px" },
  posterGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", maxWidth: "1200px", margin: "0 auto", padding: "20px" },
  poster: {
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    ":hover": {
      transform: "scale(1.05)",
      boxShadow: "0 4px 8px rgba(255, 0, 0, 0.5)",
    },
  },
  posterLink: { textDecoration: "none", color: "inherit", display: "block" },
  posterImage: {
    width: "100%",
    maxWidth: "250px",
    height: "auto",
    borderRadius: "10px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    ":hover": {
      transform: "scale(1.05)",
      boxShadow: "0 4px 8px rgba(255, 0, 0, 0.5)",
    },
  },
  posterDetails: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px", padding: "0 10px" },
  movieName: { fontSize: "14px", color: "white", textAlign: "left", margin: 0 },
  arrowButton: {
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginLeft: "auto",
    textDecoration: "none",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    ":hover": {
      backgroundColor: "#cc0000",
      transform: "scale(1.1)",
    },
  },

  /* FOOTER */
  footer: { color: "#fff", padding: "40px 20px", marginTop: "10px", fontFamily: "Arial, sans-serif", width: "100%" },
  footerContent: { maxWidth: "1200px", width: "100%", display: "flex", flexDirection: "column", gap: "15px", margin: "0 auto", padding: "50px" },
  footerDescription: { fontSize: "16px", color: "#ccc", textAlign: "left", width: "30%", maxWidth: "800px", paddingBottom: "20px", marginLeft: "100px" },
  footerLine: { width: "100%", maxWidth: "1035px", height: "1px", backgroundColor: "white", margin: "20px auto", opacity: "30%" },
  footerLinks: { display: "flex", justifyContent: "center", gap: "15px", width: "100%", marginLeft: "300px" },
  footerLink: { color: "#ccc", textDecoration: "none", fontSize: "12px", transition: "color 0.3s ease" },
  copyright: { fontSize: "12px", color: "#888", letterSpacing: "2px", marginTop: "55px", textAlign: "center", marginRight: "600px", marginTop: "-30px" },
};