export async function POST(req: Request) {
  try {
    const { paymentId, txid } = await req.json();
    
    const API_KEY = process.env.PI_NETWORK_API_KEY; // Ambil dari Vercel

    if (!API_KEY) {
      return Response.json({ error: "API Key tidak diset" }, { status: 500 });
    }

    if (!paymentId || !txid) {
      return Response.json({ error: "paymentId dan txid wajib" }, { status: 400 });
    }

    // Kirim ke server Pi buat complete
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ txid }) // txid wajib dikirim pas complete
    });

    const data = await response.json();
    
    return Response.json(data, { status: response.status });

  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
                                 }
