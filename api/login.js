import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Tambah 3 baris ini
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { accessToken, username, uid } = req.body;

  try {
    const piRes = await fetch('https://api.minepi.com/v2/me', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    const piUser = await piRes.json();

    if (piUser.username !== username) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Hapus yang baris 20 di screenshot lu, cukup 1 ini aja:
    res.status(200).json({ success: true, user: piUser });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
