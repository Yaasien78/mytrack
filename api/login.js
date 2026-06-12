import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { accessToken, username, uid } = req.body;
  
  try {
    const piRes = await fetch('https://api.minepi.com/v2/me', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    
    const piUser = await piRes.json();
    
    if (piUser.username !== username) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    await kv.set(`user:${uid}`, {
      username: piUser.username,
      uid: piUser.uid,
      lastLogin: new Date().toISOString()
    });
    
    res.status(200).json({ success: true, user: piUser });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
