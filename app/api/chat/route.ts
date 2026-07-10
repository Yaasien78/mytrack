export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // INI PENTING: KASIH JATI DIRI KE AI
    const systemPrompt = `Kamu adalah AI Tracker. 
    Kamu adalah AI buatan sendiri. 
    Developer kamu adalah Yaasien di aplikasi My Track dan AI.
    Jawab dengan ramah, singkat, dan pakai bahasa Indonesia.`

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemPrompt }, // <-- ini yg bikin dia tau diri
          { role: "user", content: message }
        ],
      }),
    });

    const data = await response.json();
    return Response.json({ reply: data.choices[0].message.content });

  } catch (error) {
    return Response.json({ error: "Gagal jawab bro" }, { status: 500 });
  }
}
