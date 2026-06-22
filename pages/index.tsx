import { useEffect, useState, useRef } from 'react'

declare global {
  interface Window {
    Pi?: any
  }
}

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [sdkLoaded, setSdkLoaded] = useState(false)
  const [profilePic, setProfilePic] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.minepi.com/pi-sdk.js'
    script.onload = () => setSdkLoaded(true)
    document.body.appendChild(script)
  }, [])

  const handleLogin = async () => {
    // Opsi 2: Cek dulu ini Pi Browser apa bukan
    if (!window.Pi) {
      alert("⚠️ Download Pi Browser dulu bang!\n\nBuka app ini dari Pi Browser biar bisa login. Download di: minepi.com")
      return
    }
    if (!sdkLoaded) {
      alert("Pi SDK masih loading, tunggu 1 detik")
      return
    }

    try {
      await window.Pi.init({ version: "2.0", sandbox: true })
      const auth = await window.Pi.authenticate(['username', 'payments'])
      
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ accessToken: auth.accessToken })
      })
      
      if(res.ok) {
        const data = await res.json()
        setUser(data.user)
        // Opsi 1: Langsung muncul selamat datang + nama user
        alert(`Selamat Datang, ${data.user.username}! 🎉`)
      } else {
        alert("Login gagal: " + res.status)
      }
    } catch(e: any) {
      alert("ERROR: " + e.message)
    }
  }

  // Opsi 3: Handle upload foto dari kamera/galeri
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfilePic(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
      color: '#e0e0e0',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      padding: '40px 20px'
    }}>
      <div style={{textAlign: 'center', marginBottom: 60}}>
        <h1 style={{
          fontSize: 42, 
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #ffd700 0%, #ff8c00 50%, #a855f7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 10
        }}>
          MALL GENESIS
        </h1>
        <p style={{color: '#a0a0c0', fontSize: 16}}>Galeri NFT Premium • Pi Network</p>
      </div>

      <div style={{maxWidth: 500, margin: '0 auto', textAlign: 'center'}}>
        {!user ? (
          <>
            <div style={{fontSize: 80, marginBottom: 20}}>🎨</div>
            <p style={{color: '#bbb', marginBottom: 40}}>
              Buka dari Pi Browser ya bang. Kalo di Chrome bakal disuruh download.
            </p>
            <button 
              onClick={handleLogin} 
              style={{
                padding: '18px 50px', 
                fontSize: 18, 
                background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)',
                color: 'white',
                border: 'none',
                borderRadius: 15,
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)'
              }}
            >
              🔐 Login with Pi
            </button>
          </>
        ) : (
          <>
            {/* Opsi 3: Lingkaran Foto Profil */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: 120, 
                height: 120, 
                borderRadius: '50%', 
                background: profilePic ? `url(${profilePic}) center/cover` : 'linear-gradient(135deg, #ffd700, #ff8c00)',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 50,
                cursor: 'pointer',
                border: '4px solid #a855f7',
                boxShadow: '0 0 25px rgba(168, 85, 247, 0.5)',
                overflow: 'hidden'
              }}
            >
              {!profilePic && '📷'}
            </div>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              style={{display: 'none'}}
            />
            <p style={{color: '#888', fontSize: 12, marginTop: -10, marginBottom: 20}}>
              Klik foto buat ganti dari kamera/galeri
            </p>

            {/* Opsi 1: Selamat Datang + Nama User */}
            <h2 style={{color: '#ffd700', marginBottom: 5}}>Selamat Datang, {user.username}!</h2>
            <p style={{color: '#666', fontSize: 12, marginBottom: 40}}>
              ID: {user.uid?.slice(0,6)}...{user.uid?.slice(-6)}
            </p>
            
            <button 
              style={{
                padding: '16px 35px',
                background: 'linear-gradient(90deg, #00d4aa 0%, #00b894 100%)',
                color: '#0a0a0f',
                border: 'none',
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%',
                maxWidth: 300,
                marginBottom: 15
              }}
              onClick={() => alert("Fitur Mint NFT coming soon 🔥")}
            >
              + Mint NFT Baru
            </button>
          </>
        )}
      </div>
    </div>
  )
        }
