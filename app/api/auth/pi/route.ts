import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { accessToken, username, uid } = await req.json()
    
    if (!accessToken) {
      return NextResponse.json({ error: 'Missing accessToken' }, { status: 400 })
    }

    // 1. Validasi token ke server Pi
    const verifyRes = await fetch('https://api.minepi.com/v2/me', {
      headers: { 
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    if (!verifyRes.ok) {
      return NextResponse.json({ error: 'Invalid Pi access token' }, { status: 401 })
    }

    const piUser = await verifyRes.json()

    // 2. Simpan/update user ke database lu di sini
    // Contoh pake Prisma:
    // await prisma.user.upsert({
    //   where: { uid: piUser.uid },
    //   update: { username: piUser.username },
    //   create: { uid: piUser.uid, username: piUser.username }
    // })

    // 3. Balik response ke frontend
    return NextResponse.json({
      success: true,
      user: {
        uid: piUser.uid,
        username: piUser.username
      }
    })

  } catch (error: any) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
                                }
