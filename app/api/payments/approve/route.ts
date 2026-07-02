import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { paymentId } = await req.json();

    if (!paymentId) {
      return NextResponse.json({ error: 'paymentId kosong' }, { status: 400 });
    }

    const res = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `key ${process.env.PI_NETWORK_API_KEY}`, // <-- PASTIIN SAMA
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();

    if (!res.ok) { // <-- INGET PAKE !
      console.error('Approve Pi Error:', data);
      return NextResponse.json({ error: 'Approve gagal', detail: data }, { status: 500 });
    }

    console.log('Payment APPROVED:', paymentId);
    return NextResponse.json(data); // <-- Kirim balik ke Pi

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error approve' }, { status: 500 });
  }
      }
