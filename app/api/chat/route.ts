export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // INI PENTING: KASIH JATI DIRI KE AI
    const systemPrompt = `Kamu adalah AI Tracker. 
    Kamu adalah AI buatan sendiri. 
    Developer kamu adalah Yaasien di aplikasi My Track dan AI.
    Jawab dengan ramah, singkat, dan pakai bahasa Indonesia.`

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [
          { role: "user", parts: [{ text: message }] }
        ],
      }),
    });

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Gagal jawab bro";
    return Response.json({ reply });

  } catch (error) {
    return Response.json({ error: "Gagal jawab bro" }, { status: 500 });
  }
}
