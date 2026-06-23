"use client";
import { useState, useEffect } from "react";

declare global {
  interface Window {
    Pi: any;
  }
}

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Pi) {
      window.Pi.init({ version: "2.0", sandbox: true });
    }
  }, []);

  const handleBuy = async () => {
    if (!window.Pi) {
      alert("Pi SDK belum ke-load. Buka pake Pi Browser ya");
      return;
    }

    try {
      const auth = await window.Pi.authenticate(['username', 'payments']);
      setUser(auth.user);
      
      window.Pi.createPayment({
        amount: 0.01,
        memo: "Mint NFT Mall Genesis #001",
        metadata: { nftId: "001" }
      }, {
        onReadyForServerApproval: (paymentId) => {
          fetch('/api/payments/approve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId })
          });
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          fetch('/api/payments/complete', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId, txid })
          });
          alert("Pembayaran sukses! NFT lu lagi di-mint 🔥");
        },
        onCancel: () => alert("Batal bayar"),
        onError: (err) => alert("Error: " + err)
      });

    } catch (err) {
      alert("Auth gagal: " + err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Mall Genesis NFT</h1>
      {user ? <p>Hi {user.username}</p> : <p>Login Pi dulu</p>}
      <button 
        onClick={handleBuy}
        className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg font-bold"
      >
        Buy with Pi 0.01
      </button>
    </div>
  );
    }
