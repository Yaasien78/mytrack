"use client"
import { useEffect, useState } from "react"

declare global {
  interface Window {
    Pi: any
  }
}

export default function Page() {
  const [piReady, setPiReady] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && window.Pi) {
      window.Pi.init({
        version: "2.0",
        sandbox: true,
        appId: process.env.NEXT_PUBLIC_PI_CLIENT_KEY || "paste_client_key_lu_disini",
        onIncompletePaymentFound: async (payment: any) => {
          console.log("Opsi 9 - Incomplete payment found:", payment.identifier)
          await fetch("/api/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId: payment.identifier, txid: payment.transaction?.txid })
          })
        }
      })
      setPiReady(true)
    }
  }, [])

  const handleMint = async () => {
    if (!piReady) return alert("Pi SDK belum ready")
    
    const paymentData = {
      amount: 0.01,
      memo: "Mint NFT 0.01 Pi",
      metadata: { product: "nft_mint", price: 0.01 }
    }

    window.Pi.createPayment(paymentData, {
      onReadyForServerApproval: async (paymentId: string) => {
        console.log("Opsi 10 - Approve:", paymentId)
        await fetch("/api/approve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId })
        })
      },
      onReadyForServerCompletion: async (paymentId: string, txid: string) => {
        console.log("Opsi 11 - Complete:", paymentId)
        await fetch("/api/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId, txid })
        })
      },
      onCancel: (paymentId: string) => console.log("Cancelled:", paymentId),
      onError: (error: any) => console.error("Error:", error)
    })
  }

  return (
    <div>
      <h1>Mint NFT - 0.01 Pi</h1>
      <button onClick={handleMint} disabled={!piReady}>
        {piReady ? "Mint Sekarang" : "Loading Pi SDK..."}
      </button>
    </div>
  )
                      }
