'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const PiLoginButton = dynamic(() => import('./components/PiLoginButton'), { ssr: false });

const DUMMY_POSTS = [
  {id: 1, user: '@yaasien', desc: 'Logo My Track V2', post: 'https://placehold.co/400x400/0f0f1a/FFD700?text=LOGO'},
  {id: 2, user: '@pioneer1', desc: 'Video Test 60s', post: 'https://placehold.co/400x600/0f0f1a/00FFFF?text=VIDEO'},
];

export default function Home() {
  const [showApp, setShowApp] = useState(false);
  const [page, setPage] = useState('feed');
  const [selectedPost, setSelectedPost] = useState(null);

  // STYLE BARU: LUAR ANGKASA
  const spaceBgStyle = {
    background: 'linear-gradient(180deg, #0a192f 0%, #1e3a5f 50%, #4a7bb7 100%)', // Biru muda ke bawah
    minHeight: '100vh',
    position: 'relative',
    overflowY: 'auto',
  };

  const starsStyle = {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
    backgroundSize: '50px 50px',
    animation: 'starsMove 10s linear infinite',
    zIndex: 0,
    opacity: 0.4
  };

  const tickerStyle = {
    width: '100%', height: '40px', background: '#001f3f', color: 'white',
    borderTop: '2px solid gold', borderBottom: '2px solid gold',
    overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', zIndex: 2, position: 'relative'
  };

  // INI HALAMAN 1: COVER
  if (showApp === false) {
    return ( <main style={{ ...spaceBgStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>
      <div style={starsStyle}></div>
      <div style={{position: 'absolute', top: 20, right: 20, fontSize: '28px', cursor: 'pointer', zIndex: 2}} onClick={() => setShowApp(true)}>≡</div>
      <div style={{zIndex: 2, textAlign: 'center'}}>
        <img src="/index.html" alt="Logo" style={{width: '200px', borderRadius: '24px', boxShadow: '0 0 30px #4a7bb7'}}/>
        <h1>My Track 2026</h1>
      </div>
    </main> )
  }

  // INI HALAMAN 2: FEED + ADS
  if (page === 'feed') {
    return (
      <main style={spaceBgStyle}>
        <style>{`
          @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); }
          @keyframes starsMove { 0% { background-position: 0 0; } 100% { background-position: 0 1000px; }
        `}</style>
        
        <div style={starsStyle}></div> {/* Lapisan Bintang */}

        {/* HEAD */}
        <header style={tickerStyle}>
          <div style={{...tickerStyle, animation: 'ticker 20s linear infinite', fontWeight: 'bold'}}>
            <span style={{color: 'yellow', padding: '0 20px'}}>My Track 2026</span> | 
            <span style={{color: 'red', padding: '0 20px'}}>Price Pi: $0.34</span> | 
            <span style={{color: 'lime', padding: '0 20px'}}>Rp5.100</span> | 
            <span style={{color: 'cyan', padding: '0 20px'}}>News: Pi Hackathon 2026 Open!</span>
          </div>
        </header>

        {/* BODY SCROLL */}
        <div style={{padding: '10px', position: 'relative', zIndex: 1}}>
          {DUMMY_POSTS.map(p => (
            <div key={p.id} onClick={() => {setSelectedPost(p); setPage('review');}} 
                 style={{background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(5px)', marginBottom: '15px', borderRadius: '12px', padding: '10px', cursor: 'pointer', border: '1px solid rgba(255,215,0,0.3)'}}>
              <b style={{color: '#FFD700'}}>{p.user}</b>
              <p>{p.desc}</p>
              <img src={p.post} style={{width: '100%', borderRadius: '8px'}}/>
            </div>
          ))}
        </div>

        {/* FOOT */}
        <footer style={{position: 'fixed', bottom: 0, width: '100%', height: '60px', background: '#001f3f', borderTop: '2px solid gold', display: 'flex', alignItems: 'center', justifyContent: 'space-around', zIndex: 2}}>
          <PiLoginButton />
          <button onClick={() => setPage('post')} style={{background: 'gold', color: 'black', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold'}}>
            Post + 0.1π
          </button>
        </footer>
      </main>
    )
  }
  
  // INI HALAMAN 3: REVIEW POSTINGAN
  if (page === 'review') {
    return ( <main style={spaceBgStyle}>
      <div style={starsStyle}></div>
      <div style={{position: 'relative', zIndex: 1, padding: '20px', color: 'white'}}>
        <button onClick={() => setPage('feed')} style={{background: 'none', border: 'none', color: 'white', fontSize: '20px', marginBottom: '10px'}}>← Back</button>
        <h2>{selectedPost.user}</h2>
        <p>{selectedPost.desc}</p>
        <img src={selectedPost.post} style={{width: '100%', borderRadius: '12px'}}/>
      </div>
    </main> )
  }

  // INI HALAMAN 4: POST
  if (page === 'post') {
    return ( <main style={spaceBgStyle}>
      <div style={starsStyle}></div>
      <div style={{position: 'relative', zIndex: 1, padding: '20px', color: 'white'}}>
        <button onClick={() => setPage('feed')}>← Back</button>
        <h2>Bayar 0.1 Pi Dulu Bro</h2>
      </div>
    </main> )
  }
    }
