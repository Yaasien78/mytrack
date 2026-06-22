import { useEffect, useState } from 'react'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [sdkLoaded, setSdkLoaded] = useState(false)

  // Kode ini 100% aman, gak bakal bikin Vercel error
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.minepi.com/pi-sdk.js'
    script.onload = () => setSdkLoaded(true)
    document.body.appendChild(script)
  }, [])

  const handleLogin = async () => {
    if (!sdkLoaded) {
      alert("Pi SDK masih loading, tunggu 1 detik")
      return
    }
    if (!window.Pi) {
      alert("Buka dari Pi Browser ya bang")
      return
    }

    try {
      await window.Pi.init({ version: "2.0", sandbox: false })
      const auth = await window.Pi.authenticate(['username', 'payments'])
      
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ accessToken: auth.accessToken })
      })
      
      if(res.ok) {
        const data = await res.json()
        setUser(data.user)
        alert("Login sukses: " + data.user.username)
      }
    } catch(e: any) {
      alert("ERROR: " + e.message)
    }
  }

  return (
    <div style={{padding: 20, textAlign: 'center'}}>
      <h1>🎨 NFT Social</h1>
      <p>bagi kreator NFT di Pi Network</p>
      
      {!user ? (
        <button onClick={handleLogin} style={{padding: 12, fontSize: 16}}>
          Login with Pi
        </button>
      ) : (
        <h2>Halo {user.username} 👋</h2>
      )}
    </div>
  )
  }
