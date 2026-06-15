'use client'
import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Pi: any
  }
}

export default function Home() {
  const [piReady, setPiReady] = useState(false)

  useEffect(() => {
    const checkPi = setInterval(() => {
      if (window.Pi) {
        window.Pi.init({ version: "2.0", sandbox: true })
        setPiReady(true)
        clearInterval(checkPi)
      }
    }, 100)
    return () => clearInterval(checkPi)
  }, [])

  const handleLogin = async () => {
    try {
      const scopes = ['username', 'payments']
      const auth = await window.Pi.authenticate(scopes, () => {})
      alert('Login berhasil! Username: ' + auth.user.username)
    } catch (e) {
      alert('Error login: ' + JSON.stringify(e))
    }
  }

  return (
    <div style={{padding: '50px', textAlign: 'center'}}>
      <h1>Pi App is running</h1>
      <p>Click button to sign in</p>
      <button 
        onClick={handleLogin} 
        disabled={!piReady}
        style={{padding: '10px 20px', fontSize: '16px'}}
      >
        {piReady ? 'Sign in with Pi' : 'Loading Pi SDK...'}
      </button>
    </div>
  )
}
