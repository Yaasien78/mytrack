'use client'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Pi) {
      window.Pi.init({ version: "2.0", sandbox: true })
    }
  }, [])

  const handleLogin = async () => {
    try {
      const auth = await window.Pi.authenticate(['username', 'payments'], () => {})
      alert('Username Pi lu: ' + auth.user.username)
    } catch (e) {
      alert('Error: ' + e)
    }
  }

  return (
    <div style={{padding: '50px', textAlign: 'center'}}>
      <h1>NFT Social</h1>
      <button onClick={handleLogin} style={{padding: '10px 20px', fontSize: '16px'}}>
        Sign in with Pi
      </button>
    </div>
  )
                      }
