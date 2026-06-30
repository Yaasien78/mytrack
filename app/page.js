'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const PiLoginButton = dynamic(() => import('./components/PiLoginButton'), { ssr: false });

export default function Home() {
  const [showApp, setShowApp] = useState(false); // false = Masih di Cover

  // INI HALAMAN 1: COVER
  if (showApp === false) {
    return (
      <main style={{ 
        height: '100vh', 
        background: 'linear-gradient(180deg, #1a1a2e, #0f0f1a)', 
        color: 'white', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        fontFamily: 'sans-serif',
        padding: '20px'
      }}>
        <div style={{position: 'absolute', top: 20, right: 20, fontSize: '28px', cursor: 'pointer'}} onClick={() => setShowApp(true)}>
          ≡ 
        </div>
        
        <img 
          src="/index.html" 
          alt="My Track Logo" 
          style={{width: '200px', height: '200px', borderRadius: '24px', marginBottom: '20px'}}
        />
        <h1 style={{fontSize: '32px', margin: 0}}>My Track</h1>
        <p style={{opacity: 0.7}}>App Track di Pi Network</p>
        <p style={{fontSize: '12px', marginTop: '40px', opacity: 0.5}}>Klik ≡ untuk masuk</p>
      </main>
    )
  }

  // INI HALAMAN 2: ADS + LOGIN
  return (
    <main style={{padding: '20px', background: '#0a0a0a', minHeight: '100vh', color: 'white'}}>
      <div style={{textAlign: 'center', marginBottom: '20px'}}>
        <button onClick={() => setShowApp(false)} style={{float: 'left', background: 'none', border: 'none', color: 'white', fontSize: '20px'}}>←</button>
        <h2>My Track Ads</h2>
      </div>

      <div style={{background: '#222', padding: '40px', borderRadius: '12px', textAlign: 'center', marginBottom: '20px'}}>
        [Tempat Iklan Banner 728x90]
      </div>

      <PiLoginButton />
    </main>
  )
  }
