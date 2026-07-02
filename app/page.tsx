"use client";
import { useEffect } from "react";

const BASE_URL = "https://mytrack-sigma.vercel.app"; // GANTI DOMAIN LU

export default function Home() {
  useEffect(() => {
    Pi.init({ version: "2.0", sandbox: true }); // TRUE = Mode Testnet
  }, []);

  const bayar = async () => {
    const paymentData = {
      amount: 0.01,
      memo: "Test Bayar Sigma",
      metadata: {},
      onReadyForServerApproval: async (paymentId: string) => {
        alert("Nembak ke /approve..."); // TES INI MUNCUL GAK
        await fetch(`${BASE_URL}/api/payments/approve`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ paymentId })
        });
      },
      onReadyForServerCompletion: async (paymentId: string, txid: string) => {
        await fetch(`${BASE_URL}/api/payments/complete`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ paymentId, txid })
        });
        alert("Sukses!");
      },
      onCancel: () => alert("Batal"),
      onError: (error: any) => alert("Error: " + error),
    };
    Pi.createPayment(paymentData);
  };

  return <button onClick={bayar}>Bayar 0.01 Pi</button>
        }
