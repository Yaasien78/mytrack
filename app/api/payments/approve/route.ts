import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { paymentId } = await req.json();
  if (!paymentId) return NextResponse.json({ error: 'paymentId kosong' }, { status: 400 });

  console.log("NEMBAK APPROVE:", paymentId); // Biar keliatan di Logs

  const res = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, { // <- INI YG DIGANTI
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.PI_NETWORK_API_KEY}`, // <- PASTIIN SAMA DENGAN DI VERCEL ENV
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  const data = await res.json();
if (!res.ok) { // <- KASIH TANDA SERU ! 
  console.error("Approve GAGAL", data);
  return NextResponse.json({ error: 'Approve gagal', detail: data }, { status: 500 });
}
console.log("Payment APPROVED:", paymentId);
return NextResponse.json(data); // <- Kalau sukses, balikin data
  console.log("Payment APPROVED:", paymentId);
  return NextResponse.json(data);
}
