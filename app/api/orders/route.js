import { NextResponse } from 'next/server';
import connectToDB from '@/lib/database'; // Import koneksi database

// POST: Menyimpan data tiket ke database
export async function POST(request) {
  try {
    const { movie, selectedSeats, selectedDate, selectedTime, totalPrice, paymentMethod } = await request.json();

    // Hubungkan ke database
    const connection = await connectToDB();

    // Query untuk menyimpan data tiket
    const query = `
      INSERT INTO orders (movie, seats, date, time, total_price, payment_method, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      JSON.stringify(movie), // Simpan data film sebagai JSON
      JSON.stringify(selectedSeats), // Simpan kursi sebagai JSON
      JSON.stringify(selectedDate), // Simpan tanggal sebagai JSON
      selectedTime,
      totalPrice,
      paymentMethod,
      'Paid', // Status default
    ];

    // Eksekusi query
    const [result] = await connection.execute(query, values);

    // Tutup koneksi
    await connection.end();

    return NextResponse.json({ message: 'Order created successfully!', id: result.insertId }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ message: 'Failed to create order!' }, { status: 500 });
  }
}

// GET: Mengambil data tiket dari database
export async function GET() {
  try {
    // Hubungkan ke database
    const connection = await connectToDB();

    // Query untuk mengambil semua tiket
    const query = 'SELECT * FROM orders ORDER BY created_at DESC';
    const [rows] = await connection.execute(query);

    // Tutup koneksi
    await connection.end();

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ message: 'Failed to fetch orders!' }, { status: 500 });
  }
}