"use client"; // Karena kita menggunakan state dan event handlers

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0); // State untuk slider hero
  const [cinemaMainLogo, setCinemaMainLogo] = useState("/Group 39.png"); // State untuk gambar utama cinema gallery

  // Data untuk slider hero
  const heroSlides = [
    {
      src: "/soonccc.jpg", // Langsung di folder public
      alt: "Sonic The Hedgehog 3",
      title: "Sonic The Hedgehog 3",
      buttonText: "Book Now",
      trailerText: "Watch Trailer",
    },
    {
      src: "/1319608.jpeg", // Langsung di folder public
      alt: "Kraven The Hunter",
      title: "Kraven The Hunter",
      buttonText: "Book Now",
      trailerText: "Watch Trailer",
    },
  ];

  // Data untuk movie slider
  const movies = [
    {
      src: "/thumb-1920-1380668 2.png", // Langsung di folder public
      alt: "Venom",
    },
    {
      src: "/sonic.png", // Langsung di folder public
      alt: "Sonic 3",
    },
    {
      src: "/172a6c5f73c3433e94f9bc3f2175f63f 1.png", // Langsung di folder public
      alt: "Red One",
    },
    {
      src: "/1ea5bb93c0964c108a60e8941a7a087a 2.png", // Langsung di folder public
      alt: "Kraven",
    },
    {
      src: "/fd41cc58175b4f7b90e1bc1689e6bee9 1.png", // Langsung di folder public
      alt: "Mufasa",
    },
  ];

  // Data untuk promotions
  const promotions = [
    {
      src: "/1.png", // Langsung di folder public
      alt: "Buy 1 Get 1 Free Ticket",
    },
    {
      src: "/2.png", // Langsung di folder public
      alt: "Cashback 35%",
    },
  ];

  // Data untuk cinema gallery
  const cinemaImages = [
    {
      src: "/89.png", // Langsung di folder public
      alt: "Cinema Hall",
    },
    {
      src: "/Rectangle 172.png", // Langsung di folder public
      alt: "Cinema Seating",
    },
    {
      src: "/Group 39.png", // Langsung di folder public
      alt: "VIP Lounge",
    },
  ];

  // Fungsi untuk mengubah slide hero
  const nextHeroSlide = () => {
    setHeroIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const prevHeroSlide = () => {
    setHeroIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Fungsi untuk mengubah slide movie
  const scrollMovies = (direction) => {
    const container = document.querySelector(".movies");
    if (container) {
      const scrollAmount = direction === "next" ? 200 : -200;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Fungsi untuk mengubah gambar utama cinema gallery
  const changeCinemaMainLogo = (src) => {
    setCinemaMainLogo(src);
  };

  // Auto-slide untuk hero section
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Styles
  const styles = {
    header: { display: "flex", alignItems: "center", padding: "10px 20px", background: "#000", height: "70px", width: "100%" },
  logo: { marginRight: "100px" },
  logoImage: { height: "90px" },
  navigation: { flexGrow: 1, textAlign: "right", marginLeft: "770px" },
  navList: { listStyle: "none", display: "flex", gap: "20px", padding: 0 },
  navLink: { color: "white", textDecoration: "none", fontSize: "16px", fontWeight: "bold" },
    hero: { position: "relative", marginBottom: "50px" },
    slider: { position: "relative", width: "100%", overflow: "hidden", height: "610px" },
    slide: { position: "absolute", width: "100%", height: "100%", opacity: 0, transition: "opacity 1s ease-in-out" },
    slideActive: { opacity: 1 },
    slideImage: { width: "100%", height: "100%", objectFit: "cover" },
    text: { position: "absolute", bottom: "7%", left: "7%", textAlign: "left", color: "white" },
    textTitle: { fontSize: "48px", marginBottom: "20px" },
    buttons: { display: "flex", gap: "20px", justifyContent: "flex-start" },
    bookButton: { padding: "10px 20px", fontSize: "16px", fontWeight: "bold", textDecoration: "none", borderRadius: "5px", backgroundColor: "red", color: "white" },
    trailerButton: { padding: "10px 20px", fontSize: "16px", fontWeight: "bold", textDecoration: "none", borderRadius: "5px", border: "2px solid white", color: "white" },
    prevNextButton: { position: "absolute", top: "50%", transform: "translateY(-50%)", backgroundColor: "red", color: "white", border: "none", padding: "15px", fontSize: "24px", cursor: "pointer", borderRadius: "50%", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center" },
    prevButton: { left: "20px" },
    nextButton: { right: "20px" },
    movieSlider: { textAlign: "center", margin: "50px 0" },
    movieTitle: { fontSize: "36px", color: "red", marginBottom: "5px" },
    movieSubtitle: { fontSize: "20px", marginBottom: "20px" },
    sliderContainer: { position: "relative", display: "flex", alignItems: "center", justifyContent: "center", maxWidth: "900px", margin: "auto" },
    movies: { display: "flex", gap: "10px", overflowX: "auto", scrollBehavior: "smooth", scrollbarWidth: "none", whiteSpace: "nowrap" },
    movieImage: { width: "160px", height: "250px", borderRadius: "10px", objectFit: "cover", transition: "transform 0.3s" },
    prevNextMovieButton: { position: "absolute", backgroundColor: "red", color: "white", border: "none", fontSize: "24px", width: "50px", height: "50px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
    prevMovieButton: { left: "-40px" },
    nextMovieButton: { right: "-40px" },
    promotions: { textAlign: "center", margin: "50px 0" },
    promotionTitle: { fontSize: "32px", color: "red", marginBottom: "20px" },
    promotionsContainer: { display: "flex", justifyContent: "center", gap: "20px", marginBottom: "40px" },
    promotionCard: { width: "300px", height: "180px", borderRadius: "10px", overflow: "hidden", boxShadow: "0 0 10px rgba(255, 0, 0, 0.5)", transition: "transform 0.3s" },
    promotionImage: { width: "100%", height: "100%", objectFit: "cover" },
    cinemaGallery: { display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", padding: "20px", backgroundColor: "#000", borderRadius: "15px", maxWidth: "1200px", margin: "0 auto" },
    cinemaMainLogo: { width: "80vw", height: "60vh", objectFit: "cover", display: "block", margin: "20px auto", borderRadius: "10px", transition: "transform 0.3s ease, box-shadow 0.3s ease" },
    cinemaImages: { display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" },
    cinemaImage: { width: "120px", height: "80px", objectFit: "cover", borderRadius: "8px", transition: "transform 0.3s ease", cursor: "pointer" },
    footer: { color: "#fff", padding: "40px 20px", marginTop: "50px", fontFamily: "Arial, sans-serif" },
    footerContent: { maxWidth: "1200px", width: "100%", display: "flex", flexDirection: "column", gap: "15px", margin: "0 auto", padding: "50px" },
    footerDescription: { fontSize: "16px", color: "#ccc", textAlign: "left", width: "30%", maxWidth: "800px", paddingBottom: "20px", marginLeft: "100px" },
    footerLine: { width: "100%", maxWidth: "1035px", height: "1px", backgroundColor: "white", margin: "20px auto", opacity: "30%" },
    footerLinks: { display: "flex", justifyContent: "center", gap: "15px", width: "100%", marginLeft: "300px" },
    footerLink: { color: "#ccc", textDecoration: "none", fontSize: "12px", transition: "color 0.3s ease" },
    copyright: { fontSize: "12px", color: "#888", letterSpacing: "2px", marginTop: "55px", textAlign: "center", marginRight: "600px", marginTop: "-30px" },
  };

  return (
    <div style={styles.body}>
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
              href="/allmovie"
              style={styles.navLink}
              onMouseEnter={(e) => (e.target.style.color = "red")}
              onMouseLeave={(e) => (e.target.style.color = "white")}
            >
              Movie
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
              href="#"
              style={styles.navLink}
              onMouseEnter={(e) => (e.target.style.color = "red")}
              onMouseLeave={(e) => (e.target.style.color = "white")}
            >
              profile
            </a>
          </li>
        </ul>
      </nav>
    </header>

      {/* HERO SLIDER */}
      <section style={styles.hero}>
        <div style={styles.slider}>
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              style={{
                ...styles.slide,
                ...(idx === heroIndex ? styles.slideActive : {}),
              }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={1920}
                height={610}
                style={styles.slideImage}
              />
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
        <button
          style={{ ...styles.prevNextButton, ...styles.prevButton }}
          onClick={prevHeroSlide}
        >
          &#10094;
        </button>
        <button
          style={{ ...styles.prevNextButton, ...styles.nextButton }}
          onClick={nextHeroSlide}
        >
          &#10095;
        </button>
      </section>

      {/* MOVIE SLIDER */}
      <section style={styles.movieSlider}>
        <h1 style={styles.movieTitle}>Choose Your Movie</h1>
        <h2 style={styles.movieSubtitle}>Now Showing</h2>
        <div style={styles.sliderContainer}>
          <button
            style={{ ...styles.prevNextMovieButton, ...styles.prevMovieButton }}
            onClick={() => scrollMovies("prev")}
          >
            &#10094;
          </button>
          <div style={styles.movies}>
            {movies.map((movie, idx) => (
              <Image
                key={idx}
                src={movie.src}
                alt={movie.alt}
                width={160}
                height={250}
                style={styles.movieImage}
              />
            ))}
          </div>
          <button
            style={{ ...styles.prevNextMovieButton, ...styles.nextMovieButton }}
            onClick={() => scrollMovies("next")}
          >
            &#10095;
          </button>
        </div>
      </section>

      {/* PROMOTIONS */}
      <section style={styles.promotions}>
        <h2 style={styles.promotionTitle}>Promotions</h2>
        <div style={styles.promotionsContainer}>
          {promotions.map((promotion, idx) => (
            <div key={idx} style={styles.promotionCard}>
              <Image
                src={promotion.src} // Langsung di folder public
                alt={promotion.alt}
                width={300}
                height={180}
                style={styles.promotionImage}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CINEMA GALLERY */}
      <section style={styles.cinemaGallery}>
        <Image
          src={cinemaMainLogo}
          alt="Paragon Cinemas"
          width={800}
          height={450}
          style={styles.cinemaMainLogo}
        />
        <div style={styles.cinemaImages}>
          {cinemaImages.map((image, idx) => (
            <Image
              key={idx}
              src={image.src}
              alt={image.alt}
              width={120}
              height={80}
              style={styles.cinemaImage}
              onClick={() => changeCinemaMainLogo(image.src)}
            />
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
    </div>
  );
}