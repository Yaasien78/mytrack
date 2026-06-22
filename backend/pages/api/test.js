export default function handler(req, res) {
  res.status(200).json({ 
    pesan: "Backend nyala bang! Monorepo sukses 🔥",
    waktu: new Date().toISOString()
  })
}
