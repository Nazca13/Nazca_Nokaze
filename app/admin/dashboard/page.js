"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const styles = {
  body: {
    padding: "40px 20px",
    textAlign: "center",
    background: "#000",
    color: "white",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Pusatkan logo
    padding: "10px 20px",
    background: "#000",
    height: "70px",
    width: "100%",
    borderBottom: "1px solid #444",
  },
  logo: {
    marginRight: "100px",
  },
  adminContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  userStatus: {
    padding: "20px",
    backgroundColor: "#111",
    borderRadius: "10px",
    marginBottom: "20px",
    textAlign: "left",
    boxShadow: "0 4px 8px rgba(255, 0, 0, 0.3)",
  },
  userActivity: {
    marginTop: "10px",
  },
  addMovieForm: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "500px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#111",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(255, 0, 0, 0.3)",
  },
  input: {
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #444",
    fontSize: "16px",
    backgroundColor: "#222",
    color: "white",
    outline: "none",
    transition: "border-color 0.3s ease",
    ":focus": {
      borderColor: "red",
    },
  },
  fileInput: {
    display: "none",
  },
  fileInputLabel: {
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
    backgroundColor: "red",
    color: "white",
    cursor: "pointer",
    textAlign: "center",
    transition: "background-color 0.3s ease",
    ":hover": {
      backgroundColor: "#cc0000",
    },
  },
  addButton: {
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
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
  movieList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    margin: "40px auto",
    maxWidth: "1200px",
  },
  movieCard: {
    backgroundColor: "#111",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "left",
    boxShadow: "0 4px 8px rgba(255, 0, 0, 0.3)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    ":hover": {
      transform: "scale(1.05)",
      boxShadow: "0 8px 16px rgba(255, 0, 0, 0.5)",
    },
  },
  movieImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  deleteButton: {
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "bold",
    borderRadius: "5px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    ":hover": {
      backgroundColor: "#cc0000",
      transform: "scale(1.1)",
    },
  },
};

export default function AdminDashboard() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: "", image: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [users, setUsers] = useState([]); // State untuk data user

  // Fetch movies from localStorage
  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    setMovies(savedMovies);
  }, []);

  // Fetch user data from backend every 5 seconds
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Fetch data immediately
    const interval = setInterval(fetchUserData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewMovie({ ...newMovie, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addMovie = () => {
    const newMovieData = {
      id: Date.now(), // Generate unique ID
      title: newMovie.title,
      src: newMovie.image, // Simpan URL gambar
    };

    const updatedMovies = [...movies, newMovieData];
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies)); // Simpan ke localStorage
    setNewMovie({ title: "", image: null });
    setImagePreview(null);
  };

  const deleteMovie = (id) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
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
      </header>

      {/* User Status */}
      <div style={styles.adminContainer}>
        <div style={styles.userStatus}>
          <h2>User Status</h2>
          <div style={styles.userActivity}>
            {users.map((user) => (
              <div key={user.id}>
                <p>
                  <strong>Username:</strong> {user.username}
                </p>
                <p>
                  <strong>Status:</strong> {user.isActive ? "Active" : "Inactive"}
                </p>
                <p>
                  <strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Last Activity:</strong> {new Date(user.lastActivity).toLocaleString()}
                </p>
                <hr style={{ borderColor: "#444", margin: "10px 0" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Add Movie Form */}
        <div style={styles.addMovieForm}>
          <input
            type="text"
            placeholder="Movie Title"
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
            style={styles.input}
          />
          <label htmlFor="image-upload" style={styles.fileInputLabel}>
            Choose Image
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={styles.fileInput}
          />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Preview"
              width={200}
              height={200}
              style={{ borderRadius: "10px", margin: "10px auto" }}
            />
          )}
          <button onClick={addMovie} style={styles.addButton}>
            Add Movie
          </button>
        </div>

        {/* Movie List */}
        <div style={styles.movieList}>
          {movies.map((movie) => (
            <div key={movie.id} style={styles.movieCard}>
              <h2>{movie.title}</h2>
              {movie.src && (
                <Image
                  src={movie.src}
                  alt={movie.title}
                  width={300}
                  height={200}
                  style={styles.movieImage}
                />
              )}
              <button onClick={() => deleteMovie(movie.id)} style={styles.deleteButton}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}