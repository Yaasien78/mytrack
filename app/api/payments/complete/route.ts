import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { paymentId, txid } = await req.json();

    if (!paymentId || !txid) {
      return NextResponse.json({ error: 'paymentId/txid kosong' }, { status: 400 });
    }

    const res = await fetch(`https://api.testnet.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `KEY ${process.env.PI_NETWORK_API_KEY}`, // Pastiin Bearer
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ txid })
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Complete Pi Error:', data);
      return NextResponse.json({ error: 'Complete gagal', detail: data }, { status: 500 });
    }
    
    // === DISINI LOGIKA LU BRO ===
    // Contoh: Simpen ke DB kalo udah lunas
    // await db.posts.create({ paymentId, txid, status: 'paid' })
    console.log('Payment LUNAS:', paymentId, txid);

    return NextResponse.json(data);

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error complete' }, { status: 500 });
  }
      }
