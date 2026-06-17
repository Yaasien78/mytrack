"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Pi: any;
  }
}

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Init Pi SDK pas app kebuka
  useEffect(() => {
    if (typeof window !== "undefined" && window.Pi) {
      window.Pi.init({ version: "2.0" });
    }
  }, []);

  // Login pake Pi
  const login = async () => {
    setLoading(true);
    try {
      const scopes = ["username", "payments"];
      const auth = await window.Pi.authenticate(scopes, () => {});
      setUser(auth.user);
    } catch (err) {
      alert("Login gagal: " + err);
    }
    setLoading(false);
  };

  // Test payment 0.001 Pi
  const testPayment = async () => {
    if (!user) return alert("Login dulu bang!");
    
    try {
      await window.Pi.createPayment({
        amount: 0.001,
        memo: "Test NFT Social - Step 10",
        metadata: { app: "nft-social", type: "test" }
      }, {
        onReadyForServerApproval: async (paymentId: string) => {
          console.log("Approval:", paymentId);
          // Sementara skip backend dulu, langsung approve
        },
        onReadyForServerCompletion: async (paymentId: string, txid: string) => {
          alert("✅ Payment SUKSES!\nTxID: " + txid);
          console.log("Complete:", paymentId, txid);
        },
        onCancel: () => alert("❌ Payment dibatalin"),
        onError: (error: any) => alert("Error: " + error)
      });
    } catch (err) {
      alert("Gagal create payment: " + err);
    }
  };

  return (
    <main style={{ padding: 40, textAlign: "center" }}>
      <h1>Welcome, {user ? user.username : "Guest"}!</h1>
      
      {!user ? (
        <button 
          onClick={login}
          disabled={loading}
          style={{ padding: "12px 24px", fontSize: 16, cursor: "pointer" }}
        >
          {loading ? "Loading..." : "Login with Pi"}
        </button>
      ) : (
        <div>
          <p>UID: {user.uid}</p>
          <button 
            onClick={testPayment}
            style={{ 
              padding: "12px 24px", 
              fontSize: 16, 
              cursor: "pointer",
              background: "#ffc500",
              border: "none",
              borderRadius: 8,
              marginTop: 20
            }}
          >
            Test Bayar 0.001 Pi
          </button>
        </div>
      )}
    </main>
  );
          }
