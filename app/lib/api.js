import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"; // Ganti sesuai backend

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error registering user";
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error logging in";
  }
};
