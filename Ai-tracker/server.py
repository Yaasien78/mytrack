from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from groq import Groq

app = Flask(__name__)
CORS(app) # biar ai.html bisa akses

# KEY DIAMBIL DARI RENDER, BUKAN DARI KODE
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_msg = data.get("message")
    username = data.get("username", "Pioneer")

    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": f"Kamu AI Tracker Pi Network. Sapa: {username}. Jawab singkat bahasa Indonesia. Fokus Pi, GCV, Mainnet."},
            {"role": "user", "content": user_msg}
        ],
        model="llama-3.1-70b-versatile",
    )
    return jsonify({"reply": chat_completion.choices[0].message.content})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
