import Nav from "../components/Nav";
import { useCallback, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

export default function Payment() {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch(
      "http://localhost:5247/api/payment/create-checkout-session/2",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);
  const options = { fetchClientSecret };

  return (
    <div>
      <Nav />
      <div>
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}
