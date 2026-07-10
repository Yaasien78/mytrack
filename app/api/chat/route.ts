import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const API_KEY = process.env.GROQ_API_KEY; // <-- UDAH DIGANTI

    if (!API_KEY) return NextResponse.json({error: "GROQ_API_KEY kosong di Vercel"}, {status: 500});

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${API_KEY}` 
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // model groq gratis tercepat
        messages: [{ role: "user", content: message }],
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const err = await response.json();
      return NextResponse.json({error: err}, {status: response.status});
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
