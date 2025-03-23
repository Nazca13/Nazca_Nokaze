export async function POST(req) {
    try {
      const { email, password } = await req.json();
  
      // Dummy user data (Ganti dengan database nanti)
      const dummyUser = { email: "admin@example.com", password: "123456" };
  
      if (email === dummyUser.email && password === dummyUser.password) {
        return Response.json({ success: true, message: "Login berhasil!" });
      } else {
        return Response.json({ success: false, message: "Email atau password salah" }, { status: 401 });
      }
    } catch (error) {
      return Response.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 });
    }
  }
  