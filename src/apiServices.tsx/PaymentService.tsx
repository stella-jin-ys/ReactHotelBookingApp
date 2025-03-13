import React from "react";

const API_URL = "http://localhost:5247/api/payment";

export const PaymentService = {
  createCheckoutSession: async () => {
    try {
      const response = await fetch(`${API_URL}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to create payment intent");

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Payment API error: ", error);
      return null;
    }
  },
};
