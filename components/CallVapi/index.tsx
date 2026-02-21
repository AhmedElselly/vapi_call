"use client";

import { useState } from "react";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [callId, setCallId] = useState<string | null>(null);

  // START CALL
  const makeCall = async () => {
    setLoading(true);
    setStatus("Calling...");

    const res = await fetch("/api/call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone }),
    });

    const data = await res.json();

    console.log({ data: data.callId });

    if (res.ok) {
      setCallId(data.callId);
      setStatus("✅ Call Started");
    } else {
      setStatus("❌ Failed");
    }

    setLoading(false);
  };

  // END CALL
  const endCall = async () => {
    if (!callId) return;

    setLoading(true);
    setStatus("Ending call...");

    await fetch("/api/end-call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ callId }),
    });

    setCallId(null);
    setStatus("📞 Call Ended");
    setLoading(false);
  };

  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: 400,
          padding: 30,
          border: "1px solid #ddd",
          borderRadius: 10,
        }}
      >
        <h2>AI Calling Agent</h2>

        <input
          placeholder="+2010XXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={!!callId}
          style={{
            width: "100%",
            padding: 10,
            marginTop: 10,
          }}
        />

        {!callId ? (
          <button
            onClick={makeCall}
            disabled={loading}
            style={{
              width: "100%",
              marginTop: 20,
              padding: 12,
            }}
          >
            {loading ? "Calling..." : "Start Call"}
          </button>
        ) : (
          <button
            onClick={endCall}
            disabled={loading}
            style={{
              width: "100%",
              marginTop: 20,
              padding: 12,
              background: "red",
              color: "white",
            }}
          >
            End Call
          </button>
        )}

        <p style={{ marginTop: 20 }}>{status}</p>
      </div>
    </main>
  );
}
