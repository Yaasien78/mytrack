import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const API_KEY = process.env.GROQ_API_KEY;

    if (!API_KEY) return NextResponse.json({ error: "GROQ_API_KEY kosong di Vercel" }, { status: 500 });

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}` },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: message }],
      })
    });

    if(!response.ok) throw new Error("Gagal konek ke Groq");
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Maaf gagal jawab";
    
    return NextResponse.json({ reply });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
                    }
