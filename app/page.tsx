'use client'

export default function Home() {
  const handleLogin = () => {
    alert('Tombol jalan!')
  }

  return (
    <div style={{padding: '50px', textAlign: 'center'}}>
      <h1>Pi App is running</h1>
      <button onClick={handleLogin} style={{padding: '10px 20px', fontSize: '16px'}}>
        Sign in with Pi
      </button>
    </div>
  )
}
