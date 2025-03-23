import MovieBooking from '@/app/components/MovieBooking'; // Sesuaikan dengan struktur direktori
import movies from '@/app/lib/movie';
export default function BookingPage({ params }) {
  const { id } = params;

  // Cari film berdasarkan ID
  const movie = movies.find((m) => m.id === parseInt(id));

  // Jika film tidak ditemukan, tampilkan pesan error
  if (!movie) {
    return <div>Film tidak ditemukan</div>;
  }

  // Render komponen booking dengan data film yang sesuai
  return <MovieBooking movie={movie} />;
}