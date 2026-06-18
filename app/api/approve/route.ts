import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { paymentId, username } = await req.json()
    console.log("Opsi 10 - Approve:", paymentId, "user:", username)

    const API_KEY = process.env.PI_API_KEY
    if (!API_KEY) {
      console.error("PI_API_KEY kosong")
      return NextResponse.json({ error: "API key missing" }, { status: 500 })
    }

    const res = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: "POST",
      headers: {
        "Authorization": `Key ${API_KEY}`,
        "Content-Type": "application/json"
      }
    })

    if (!res.ok) {
      const err = await res.text()
      console.error("Pi API error:", err)
      return NextResponse.json({ error: "Approve failed" }, { status: 500 })
    }

    console.log("Approve sukses:", paymentId)
    return NextResponse.json({ success: true })
    
  } catch (e) {
    console.error("Approve crash:", e)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
      }
