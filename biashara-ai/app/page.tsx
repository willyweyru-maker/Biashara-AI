"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    setReply("");

    const res = await fetch("/api/test-openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setReply(data.reply);
    setLoading(false);
  };

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>WhatsApp AI Assistant</h1>

      <textarea
        placeholder="Paste customer WhatsApp message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Generating..." : "Generate Reply"}
      </button>

      {reply && (
        <div style={{ marginTop: 20 }}>
          <h3>Suggested Reply:</h3>
          <p>{reply}</p>
        </div>
      )}
    </main>
  );
}
