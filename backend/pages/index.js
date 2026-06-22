import { useState } from 'react'

export default function Home() {
  const [pesan, setPesan] = useState('')

  const tesBackend = async () => {
    setPesan('Loading...')
    try {
      const res = await fetch('/api/test')
      const data = await res.json()
      setPesan(data.pesan)
    } catch (err) {
      setPesan('Error: ' + err.message)
    }
  }

  return (
    <div style={{padding: 50, fontFamily: 'sans-serif'}}>
      <h1>NFT Social App</h1>
      <button onClick={tesBackend} style={{marginRight: 10}}>Tes Backend</button>
      <button>Login Pi</button>
      <p style={{marginTop: 20, fontWeight: 'bold'}}>{pesan}</p>
    </div>
  )
  }
