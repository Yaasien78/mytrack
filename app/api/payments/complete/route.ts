import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { paymentId, txid } = await req.json()
  console.log("Complete:", paymentId, txid)
  return NextResponse.json({ status: 'completed' }, { status: 200 })
}
