import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { paymentId, txid } = req.body;
  if (!paymentId || !txid) return res.status(400).json({ error: 'paymentId + txid required' });

  try {
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.PI_NETWORK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ txid })
    });

    const data = await response.json();
    console.log('Complete result:', data);
    
    // TODO: Simpan ke DB: user udah bayar 0.01 Pi, kasih hak mint NFT
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Complete error:', error);
    return res.status(500).json({ error: 'Complete failed' });
  }
        }
