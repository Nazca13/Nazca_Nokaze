"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const MovieBooking = ({ movie }) => {
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [activeDateIndex, setActiveDateIndex] = useState(2);
  const [selectedTime, setSelectedTime] = useState(null);
  const [takenSeats, setTakenSeats] = useState([]);
  const seatPrice = 25000;
  const maxSeats = 6;

  const dates = [
    { day: 'WEN', date: '25' },
    { day: 'THU', date: '26' },
    { day: 'FRI', date: '27' },
    { day: 'SAT', date: '28' },
    { day: 'SUN', date: '29' },
    { day: 'MON', date: '30' },
  ];

  const times = ['09:15', '11:10', '13:05', '15:00', '16:55', '18:50', '20:45'];

  // Data kursi dibagi menjadi 3 kolom
  const seatsData = {
    kolom1: ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3', 'D1', 'D2', 'D3', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'H1', 'H2', 'H3', 'J1', 'J2', 'J3'],
    kolom2: ['A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'J4', 'J5', 'J6', 'J7', 'J8', 'J9'],
    kolom3: ['A10', 'A11', 'A12', 'B10', 'B11', 'B12', 'C10', 'C11', 'C12', 'D10', 'D11', 'D12', 'E10', 'E11', 'E12', 'F10', 'F11', 'F12', 'G10', 'G11', 'G12', 'H10', 'H11', 'H12', 'J10', 'J11', 'J12'],
  };

  useEffect(() => {
    const fetchTakenSeats = async () => {
      const response = await fetch('/api/taken-seats');
      const data = await response.json();
      setTakenSeats(data.takenSeats);
    };

    fetchTakenSeats();
  }, []);

  const handleSeatClick = (seat) => {
    if (!takenSeats.includes(seat)) {
      if (selectedSeats.includes(seat)) {
        setSelectedSeats((prev) => prev.filter((s) => s !== seat));
      } else {
        if (selectedSeats.length < maxSeats) {
          setSelectedSeats((prev) => [...prev, seat]);
        } else {
          alert(`Maksimal hanya dapat memilih ${maxSeats} kursi!`);
        }
      }
    }
  };

  const handleTimeClick = (time) => {
    if (selectedTime === time) {
      setSelectedTime(null);
    } else {
      setSelectedTime(time);
    }
  };

  const handleDateNavigation = (direction) => {
    if (direction === "prev" && activeDateIndex > 0) {
      setActiveDateIndex((prev) => prev - 1);
    } else if (direction === "next" && activeDateIndex < dates.length - 1) {
      setActiveDateIndex((prev) => prev + 1);
    }
  };

  const handleBuyTicket = () => {
    if (selectedSeats.length === 0 || !selectedTime) {
      alert('Silakan pilih kursi dan waktu terlebih dahulu!');
      return;
    }

    const selectedDate = dates[activeDateIndex];
    const totalPrice = selectedSeats.length * seatPrice;

    // Simpan data ke localStorage
    const bookingData = {
      movie,
      selectedSeats,
      selectedDate,
      selectedTime,
      totalPrice,
    };
    localStorage.setItem('bookingData', JSON.stringify(bookingData));

    // Arahkan ke halaman pembayaran
    router.push('/payment');
  };

  return (
    <div style={styles.container}>
      <div style={styles.moviePoster}>
        <img src={movie.src} alt={movie.alt} style={styles.posterImage} />
      </div>
      <div style={styles.bookingPanel}>
        <h2 style={styles.movieTitle}>{movie.title}</h2>
        <div style={styles.datePicker}>
          <button style={styles.navArrow} id="prev-date" onClick={() => handleDateNavigation("prev")}>&lt;</button>
          <div style={styles.dates}>
            {dates.map((date, index) => (
              <div
                key={index}
                style={styles.date}
                onClick={() => setActiveDateIndex(index)}
              >
                <span style={styles.day}>{date.day}</span>
                <span
                  style={{
                    ...styles.dateNumber,
                    ...(index === activeDateIndex ? styles.dateNumberActive : {}),
                  }}
                >
                  {date.date}
                </span>
              </div>
            ))}
          </div>
          <button style={styles.navArrow} id="next-date" onClick={() => handleDateNavigation("next")}>&gt;</button>
        </div>
        <div style={styles.seatGridContainer}>
          {/* Kolom 1 */}
          <div style={{ ...styles.seatGrid, ...styles.seatGridKolom1, marginLeft: '20px' }}>
            {seatsData.kolom1.map((seat) => (
              <div
                key={seat}
                className={`seat ${takenSeats.includes(seat) ? 'taken' : ''} ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                onClick={() => handleSeatClick(seat)}
                style={{
                  ...styles.seat,
                  ...(takenSeats.includes(seat) ? styles.taken : {}),
                  ...(selectedSeats.includes(seat) ? styles.selected : {}),
                }}
              >
                {seat}
              </div>
            ))}
          </div>
          {/* Kolom 2 */}
          <div style={{ ...styles.seatGrid, ...styles.seatGridKolom2 }}>
            {seatsData.kolom2.map((seat) => (
              <div
                key={seat}
                className={`seat ${takenSeats.includes(seat) ? 'taken' : ''} ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                onClick={() => handleSeatClick(seat)}
                style={{
                  ...styles.seat,
                  ...(takenSeats.includes(seat) ? styles.taken : {}),
                  ...(selectedSeats.includes(seat) ? styles.selected : {}),
                }}
              >
                {seat}
              </div>
            ))}
          </div>
          {/* Kolom 3 */}
          <div style={{ ...styles.seatGrid, ...styles.seatGridKolom3, marginRight: '20px' }}>
            {seatsData.kolom3.map((seat) => (
              <div
                key={seat}
                className={`seat ${takenSeats.includes(seat) ? 'taken' : ''} ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                onClick={() => handleSeatClick(seat)}
                style={{
                  ...styles.seat,
                  ...(takenSeats.includes(seat) ? styles.taken : {}),
                  ...(selectedSeats.includes(seat) ? styles.selected : {}),
                }}
              >
                {seat}
              </div>
            ))}
          </div>
        </div>
        <div style={styles.seatInfo}>
          <span style={{ ...styles.seatInfoBox, ...styles.available }}></span> Available
          <span style={{ ...styles.seatInfoBox, ...styles.taken }}></span> Taken
          <span style={{ ...styles.seatInfoBox, ...styles.selected }}></span> Your Selection
        </div>
        <div style={styles.timeSelection}>
          <div style={styles.timeRow}>
            {times.slice(0, 4).map((time) => (
              <button
                key={time}
                className={`time ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => handleTimeClick(time)}
                style={{
                  ...styles.time,
                  ...(selectedTime === time ? styles.timeSelected : {}),
                }}
              >
                {time}
              </button>
            ))}
          </div>
          <div style={styles.timeRow}>
            {times.slice(4).map((time) => (
              <button
                key={time}
                className={`time ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => handleTimeClick(time)}
                style={{
                  ...styles.time,
                  ...(selectedTime === time ? styles.timeSelected : {}),
                }}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        <div style={styles.bottomBar}>
          <div style={styles.selectedSeats}>
            <strong>Selected:</strong>
            {selectedSeats.map((seat) => (
              <span key={seat} style={styles.selectedSeat}>{seat}</span>
            ))}
          </div>
          <div style={styles.totalPrice}>
            <strong>Total:</strong> Rp{selectedSeats.length * seatPrice}
          </div>
          <button style={styles.buyTicket} onClick={handleBuyTicket}>Buy Ticket</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    maxWidth: '1200px',
    height: '700px',
    backgroundColor: '#1a1a1a',
    borderRadius: '15px',
    overflow: 'hidden',
    margin: '20px auto',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
  },
  moviePoster: {
    width: '40%',
    background: '#222',
    height: '100%',
    position: 'relative',
  },
  posterImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '15px 0 0 15px',
  },
  bookingPanel: {
    width: '60%',
    padding: '20px',
    color: 'white',
    height: '100%',
    overflowY: 'auto',
    backgroundColor: '#1a1a1a',
  },
  movieTitle: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#d50000',
  },
  datePicker: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  navArrow: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
    transition: '0.3s',
    ':hover': {
      color: '#d50000',
    },
  },
  dates: {
    display: 'flex',
    gap: '10px',
    textAlign: 'center',
  },
  date: {
    fontSize: '14px',
    color: 'white',
    cursor: 'pointer',
    transition: '0.3s',
  },
  day: {
    display: 'block',
    fontSize: '12px',
    color: '#888',
  },
  dateNumber: {
    display: 'block',
    fontSize: '18px',
    color: '#888',
    transition: '0.3s',
  },
  dateNumberActive: {
    color: '#d50000',
    fontWeight: 'bold',
  },
  seatGridContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    margin: '20px 0',
    padding: '0 20px',
  },
  seatGrid: {
    display: 'grid',
    gap: '5px',
    textAlign: 'center',
  },
  seatGridKolom1: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    marginLeft: '50px', // Geser kolom pertama ke kanan sejauh 50px
  },
  seatGridKolom2: {
    gridTemplateColumns: 'repeat(6, 1fr)',
  },
  seatGridKolom3: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  seat: {
    width: '30px',
    height: '30px',
    backgroundColor: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: '0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    border: '2px solid #ccc',
    color: 'black', // Warna teks hitam untuk kursi tersedia
    ':hover': {
      backgroundColor: '#f0f0f0', // Efek hover tanpa mengubah ukuran
    },
  },
  taken: {
    backgroundColor: '#444',
    cursor: 'not-allowed',
    color: 'white', // Warna teks putih untuk kursi yang sudah diambil
    ':hover': {
      backgroundColor: '#444', // Tetap sama saat hover
    },
  },
  selected: {
    backgroundColor: '#d50000',
    color: 'white', // Warna teks putih untuk kursi yang dipilih
    border: 'none',
    ':hover': {
      backgroundColor: '#d50000', // Tetap sama saat hover
    },
  },
  seatInfo: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    fontSize: '14px',
    marginBottom: '20px',
  },
  seatInfoBox: {
    width: '20px',
    height: '20px',
    borderRadius: '5px',
    display: 'inline-block',
    marginRight: '5px',
  },
  available: {
    backgroundColor: 'white',
  },
  takenInfo: {
    backgroundColor: '#444',
  },
  selectedInfo: {
    backgroundColor: '#d50000',
  },
  timeSelection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
    marginBottom: '20px',
  },
  timeRow: {
    display: 'flex',
    gap: '5px',
    justifyContent: 'center',
  },
  time: {
    backgroundColor: 'transparent',
    color: 'white',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'white',
    padding: '5px 10px',
    fontSize: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    minWidth: '60px',
    transition: '0.3s',
    ':hover': {
      borderColor: '#d50000',
    },
  },
  timeSelected: {
    borderColor: '#d50000',
    color: '#d50000',
  },
  bottomBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    padding: '0 20px',
  },
  selectedSeats: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    fontSize: '14px',
  },
  selectedSeat: {
    backgroundColor: '#444',
    padding: '5px',
    borderRadius: '5px',
  },
  totalPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#d50000',
  },
  buyTicket: {
    backgroundColor: '#d50000',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: '0.3s',
    ':hover': {
      backgroundColor: '#b30000',
    },
  },
};

export default MovieBooking;
