import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { paymentId, txid } = await req.json();
    const apiKey = process.env.PI_NETWORK_API_KEY;

    if (!apiKey) return NextResponse.json({ error: 'PI_NETWORK_API_KEY missing' }, { status: 500 });

    const res = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ txid })
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    return NextResponse.json({ error: 'Complete failed' }, { status: 500 });
  }
      }
