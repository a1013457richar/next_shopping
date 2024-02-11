"use client";

import { ReactNode } from "react";
import { CartProvider } from "use-shopping-cart";

export default function CartContext({ children }: { children: ReactNode }) {
  return (
    <CartProvider
      shouldPersist={true}
      successUrl="/"
      cancelUrl="/"
      language="en-US"
      currency="USD"
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
    >
      {children}
    </CartProvider>
  );
}
