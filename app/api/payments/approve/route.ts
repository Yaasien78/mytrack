export default async function handler(req, res) {
  const API_KEY = process.env.PI_NETWORK_API_KEY;
  const { paymentId } = req.body;
  
  console.log("Approve:", paymentId);

  const response = await fetch(`https://api.minepi.com/v1/payments/${paymentId}/approve`, { // INI GANTI v1
    method: 'POST',
    headers: { 
      'Authorization': `Key ${API_KEY}`, 
      'Content-Type': 'application/json' 
    }
  });
  const data = await response.json();
  res.status(200).json(data);
}
