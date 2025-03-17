import React from "react";

const API_URL = "http://localhost:5247/api/customers";

async function Signup(userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Failed to create account");
    }
    return await response.json();
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
}

export default Signup;
