import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Pi: any;
  }
}

export default function Home() {
  const [sdkLoaded, setSdkLoaded] = useState(false);

  // Load Pi SDK + Init
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.minepi.com/pi-sdk.js';
    script.onload = () => {
      setSdkLoaded(true);
      window.Pi.init({ version: "2.0", sandbox: false }); // sandbox: true kalo testnet
    };
    document.body.appendChild(script);
  }, []);

  // Handle payment nyangkut
  useEffect(() => {
    if (window.Pi && sdkLoaded) {
      window.Pi.onIncompletePaymentFound(async (payment: any) => {
        await fetch('/api/payments/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId: payment.identifier, txid: payment.transaction?.txid })
        });
      });
    }
  }, [sdkLoaded]);

  const handleMintNFT = async () => {
    if (!sdkLoaded) return alert("Pi SDK masih loading, tunggu 1 detik");
    if (!window.Pi) return alert("Buka di Pi Browser jika bukan, silahkan download dulu");

    const paymentData = {
      amount: 0.01,
      memo: "Mint NFT Mall Genesis",
      metadata: { product: "nft_mint", price: 0.01 }
    };

    const callbacks = {
      onReadyForServerApproval: async (paymentId: string) => {
        await fetch('/api/payments/approve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId })
        });
      },
      onReadyForServerCompletion: async (paymentId: string, txid: string) => {
        await fetch('/api/payments/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId, txid })
        });
        alert("NFT berhasil di-mint! 🔥");
      },
      onCancel: (paymentId: string) => console.log("Cancel:", paymentId),
      onError: (error: Error) => alert("Error: " + error.message)
    };

    window.Pi.createPayment(paymentData, callbacks);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6a0daf 0%, #4a1a2e 50%, #1b1b3b 100%)',
      color: 'white',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Mall Genesis NFT</h1>
      <p style={{ marginBottom: '40px' }}>Mint NFT kamu dengan 0.01 Pi</p>

      <button
        onClick={handleMintNFT}
        style={{
          background: 'linear-gradient(90deg, #ff6b6b, #ff8e3c)',
          border: 'none',
          borderRadius: '12px',
          padding: '16px 32px',
          fontSize: '18px',
          fontWeight: 'bold',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(255,107,107,0.4)'
        }}
      >
        Mint NFT - 0.01 Pi
      </button>
    </div>
  );
}
