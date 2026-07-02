"use client";
import { useEffect } from "react";

export default function Home() {
  
    useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://sdk.minepi.com/pi-sdk.js"; // LOAD DULU SDK NYA
  script.async = true;
  script.onload = () => {
    Pi.init({ version: "2.0", sandbox: true }); // BARU INIT KALAU UDAH KELOAD
  };
  document.body.appendChild(script);
}, []);
    const bayar = async () => {
    const paymentData = {
      amount: 0.01,
      memo: "Test Bayar Sigma",
      metadata: {},
      onReadyForServerApproval: async (paymentId: string) => {
        alert("Nembak ke /approve..."); // TES INI MUNCUL GAK
        await fetch(`/api/payments/approve`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ paymentId })
        });
      },
      onReadyForServerCompletion: async (paymentId: string, txid: string) => {
        await fetch(`/api/payments/complete`, {
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
