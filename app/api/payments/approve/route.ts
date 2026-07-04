export async function POST(req: Request) {
  const { paymentId } = await req.json();
  
  const API_KEY = process.env.PI_NETWORK_API_KEY; // <-- ini nama barunya

  const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
    method: 'POST',
    headers: {
      'Authorization': `Key ${API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  return Response.json(await response.json());
}
