'use client'
import { useState } from 'react'

declare global {
  interface Window {
    Pi: any;
  }
}

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await window.Pi.init({
        version: "2.0",
        sandbox: true
      })

      const scopes = ['username'];

      const auth = await window.Pi.authenticate(scopes, (payment: any) => {
        console.log("Incomplete payment:", payment.identifier)
      })

      setUser(auth.user);
      console.log("Login success:", auth.user);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }

  const handlePayment = async () => {
    const paymentData = {
      amount: 1,
      memo: "Mint NFT Genesis",
      metadata: { item: "NFT Genesis" }
    }

    const paymentId = await window.Pi.createPayment(paymentData, {
      onReadyForServerApproval: async (paymentId: string) => {
        await fetch('/api/payments/approve', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ paymentId })
        })
      },
      onReadyForServerCompletion: async (paymentId: string, txid: string) => {
        await fetch('/api/payments/complete', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ paymentId, txid })
        })
        alert("NFT Berhasil di-Mint! 🎉")
      },
      onCancel: () => console.log("Cancel"),
      onError: (error: any) => console.error(error)
    })
  }

  return (
    <div>
      <h1>NFT Social</h1>
      {!user ? (
        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Loading..." : "Login Pi"}
        </button>
      ) : (
        <button onClick={handlePayment}>Mint NFT Genesis - 1 Pi</button>
      )}
    </div>
  )
}
