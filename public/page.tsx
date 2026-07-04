"use client"

export default function Home() {
  return (
    <div style={{padding: 20, fontFamily: 'sans-serif'}}>
      <h1>My Track ⚡</h1>
      <p id="user">Belum Login</p>
      
      <button onClick={() => (window as any).login()} style={{padding:10, margin:5}}>
        Login Pi
      </button>
      
      <button onClick={() => (window as any).bayar()} style={{padding:10, margin:5, background:'#FFD700'}}>
        Bayar Test 1 Pi
      </button>
      
      <p id="status">Status: Menunggu...</p>

      <script src="https://sdk.minepi.com/pi-sdk.js"></script>
      <script src="/app.js"></script>
    </div>
  )
}
