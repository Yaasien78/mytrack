import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { paymentId, txid } = await req.json(); 
  
  if (!paymentId || !txid) {
    return NextResponse.json({ error: 'paymentId atau txid kosong' }, { status: 400 });
  }

  console.log("NEMBAK COMPLETE:", paymentId, "TX:", txid); // Biar keliatan di Logs Vercel

  const res = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.PI_NETWORK_API_KEY}`, // SAMA KAYA APPROVE
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ txid }), // INI YG BEDAIN SAMA APPROVE
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("Complete GAGAL:", data); 
    return NextResponse.json({ error: 'Complete gagal', detail: data }, { status: 500 });
  }

  console.log("Payment LUNAS:", paymentId);
  return NextResponse.json(data); // Kirim balik ke frontend
}
