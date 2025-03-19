import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://localhost:5247/api";

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

// Function to login user
export const loginUser = async (
  username: string,
  password: string
): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });

    const { token, user } = response.data;

    // Store the token in localStorage
    localStorage.setItem("token", token);

    // Set the token for all future requests
    setAuthHeader(token);

    return user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        throw new Error("Invalid username or password");
      } else {
        throw new Error(error.response.data.message || "Login failed");
      }
    }
    throw new Error("Network error. Please try again later.");
  }
};

// Function to logout
export const logoutUser = (): void => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
};

// Function to get current user from token
export const getCurrentUser = async (): Promise<User | null> => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    setAuthHeader(token);
    const response = await axios.get(`${API_URL}/auth/me`);
    return response.data;
  } catch (error) {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    return null;
  }
};

// Helper function to set auth header
const setAuthHeader = (token: string): void => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
