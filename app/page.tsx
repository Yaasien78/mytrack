"use client"
import { useEffect, useState } from "react"

declare global {
  interface Window {
    Pi: any
  }
}

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [isPiBrowser, setIsPiBrowser] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    useEffect(() => {
  let tries = 0
  const checkPi = setInterval(() => {
    tries++
    if (window.Pi) {
      setIsPiBrowser(true)
      alert("✅ SDK Pi ketemu! App ID: nft-social-testnet")
      window.Pi.init({ 
        version: "2.0", 
        sandbox: true,
        appId: "nft-social-testnet"
      })
      clearInterval(checkPi)
    }
    if (tries > 30) {
      alert("❌ SDK Pi GAGAL ke-load. Cek layout.tsx + refresh Pi Browser")
      clearInterval(checkPi)
    }
  }, 100)
  return () => clearInterval(checkPi)
}, [])
const handleLogin = async () => {
  if (!isPiBrowser) {
    alert("❌ Buka app ini di Pi Browser, jangan Chrome!")
    return
  }

  setLoading(true)
  try {
    alert("⏳ Mencoba login...")
    const auth = await window.Pi.authenticate(
      ['username', 'payments'], 
      (payment) => alert('Ada payment pending: ' + payment.identifier)
    )
    alert("✅ Login berhasil! Halo " + auth.user.username)
    setUser(auth.user)
  } catch (err) {
    alert("❌ Login error: " + err)
  }
  setLoading(false)
              }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 text-center text-white max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4">🎨 NFT Social</h1>
        <p className="mb-8">bagi kreator NFT di jaringan Pi Network</p>
        
        {!user ? (
          <button 
            onClick={handleLogin}
            disabled={loading}
            className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full w-full text-lg"
          >
            {loading ? "Loading..." : "Login with Pi"}
          </button>
        ) : (
          <div>
            <p className="text-2xl font-bold">Halo {user.username}! 👋</p>
            <p className="text-sm">UID: {user.uid}</p>
          </div>
        )}
      </div>
    </main>
  )
        }
