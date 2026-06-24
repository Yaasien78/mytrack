import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { paymentId } = await req.json();
  
  const res = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
    method: 'POST',
    headers: {
      'Authorization': `Key ${process.env.PI_NETWORK_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) return NextResponse.json({ error: 'Approve gagal' }, { status: 500 });
  return NextResponse.json({ success: true });
                          }
