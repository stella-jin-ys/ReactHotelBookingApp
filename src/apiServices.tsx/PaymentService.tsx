import React from "react";

const API_URL = "http://localhost:5247/api";

export const PaymentService = {
  createPaymentIntent: async (amount: number) => {
    try {
      const response = await fetch(`${API_URL}/create-payment-intent`, {
        method: "POST",
        headers: { "COntent-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      if (!response.ok) throw new Error("Failed to create payment intent");
      const data = await response.json();
      return data.clientSecret;
    } catch (error) {
      console.error("Payment API error: ", error);
      return null;
    }
  },
};
