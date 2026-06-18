"use client"
import { useEffect, useState } from "react"

declare global {
  interface Window {
    Pi: any
  }
}

export default function Page() {
  const [piReady, setPiReady] = useState(false)
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && window.Pi) {
      window.Pi.init({
        version: "2.0",
        sandbox: false,
        appId: "paste_client_key_lu_disini"
      })
      setPiReady(true)
    }
  }, [])

  const handleLogin = async () => {
    setLoading(true)
    try {
      const auth = await window.Pi.authenticate(["username", "payments"])
      setUsername(auth.user.username)
      console.log("Login sukses:", auth.user.username)
    } catch (err) {
      console.error("Login gagal:", err)
      alert("Login Pi dibatalkan")
    }
    setLoading(false)
  }

  const handleLogout = () => {
    setUsername("")
  }

  const handleMint = async () => {
    if (!piReady) return alert("Pi SDK belum ready")
    if (!username) return alert("Login Pi dulu bang")
    
    window.Pi.createPayment({
      amount: 0.01,
      memo: "Mint NFT=0.01Pi",
      metadata: { product: "nft_genesis", user: username }
    }, {
      onReadyForServerApproval: async (paymentId: string) => {
        console.log("Opsi 10 - Approve:", paymentId)
        await fetch("/api/approve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId, username })
        })
      },
      onReadyForServerCompletion: async (paymentId: string, txid: string) => {
        console.log("Opsi 11 - Complete:", paymentId, txid)
        await fetch("/api/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId, txid, username })
        })
      },
      onCancel: (paymentId: string) => console.log("Cancel:", paymentId),
      onError: (error: any) => console.error("Error:", error)
    })
  }

  return (
    <div style={{textAlign: "center", padding: "60px 20px", fontFamily: "sans-serif"}}>
      <h1>NFT Social</h1>
      <h2>Genesis</h2>
      
      {username ? (
        <>
          <p style={{marginBottom: "20px"}}>Halo, <b>{username}</b> 👋</p>
          <button onClick={handleLogout} style={{padding: "8px 16px", marginBottom: "20px", cursor: "pointer"}}>
            Logout
          </button>
        </>
      ) : (
        <button 
          onClick={handleLogin} 
          disabled={!piReady || loading}
          style={{padding: "12px 24px", marginBottom: "20px", cursor: "pointer"}}
        >
          {loading ? "Loading..." : "Login Pi"}
        </button>
      )}
      
      <p style={{marginBottom: "30px", fontWeight: "bold"}}>Mint NFT=0.01Pi</p>
      
      <button 
        onClick={handleMint} 
        disabled={!piReady || !username}
        style={{padding: "14px 28px", fontSize: "16px", cursor: "pointer"}}
      >
        {!piReady ? "Loading SDK..." : !username ? "Login Dulu" : "Mint Sekarang"}
      </button>
    </div>
  )
      }
