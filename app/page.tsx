'use client'//
import { useEffect } from 'react'

export default function LoginButton() {
  useEffect(() => {
    // Load Pi SDK
    const script = document.createElement('script')
    script.src = 'https://sdk.minepi.com/pi-sdk.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      window.Pi.init({ version: "2.0", sandbox: false })
    }
  }, [])

  const handleLogin = async () => {
    try {
      // INI KUNCINYA BANG
      const auth = await window.Pi.authenticate(
        ['username', 'payments'], // scope
        (payment) => { console.log('Incomplete payment', payment) } // callback
      )
      
      console.log('Login berhasil:', auth)
      // Kirim auth.user ke backend lu di /api/auth/callback/pi
      
    } catch (err) {
      console.error('Login gagal:', err)
    }
  }

  return (
    <button onClick={handleLogin}>
      Sign in with Pi
    </button>
  )
}
