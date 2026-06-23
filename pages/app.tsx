import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Pi: any;
  }
}

const AppPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.Pi) return;
    window.Pi.onIncompletePaymentFound(async (payment: any) => {
      await fetch('/api/payments/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          paymentId: payment.identifier, 
          txid: payment.transaction?.txid 
        })
      });
    });
  }, []);

  const handleBuy = async () => {
    if (typeof window === 'undefined') return;
    if (!window.Pi) {
      alert('Buka di Pi Browser ya bang! Chrome gak bisa');
      return;
    }
    
    setIsLoading(true);
    
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
        setIsLoading(false);
      },
      onCancel: () => setIsLoading(false),
      onError: (error: Error) => {
        alert("Error: " + error.message);
        setIsLoading(false);
      }
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
        onClick={handleBuy}
        disabled={isLoading}
        style={{
          background: isLoading ? '#666' : 'linear-gradient(90deg, #ff6b6b, #ff8e3c)',
          border: 'none',
          borderRadius: '12px',
          padding: '16px 32px',
          fontSize: '18px',
          fontWeight: 'bold',
          color: 'white',
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading ? 'Loading...' : 'Buy with Pi 0.01'}
      </button>
    </div>
  );
}

export default dynamic(() => Promise.resolve(AppPage), { ssr: false })
