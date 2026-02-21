"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [callId, setCallId] = useState<string | null>(null);

  // START CALL
  const makeCall = async () => {
    try {
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

      console.log("SERVER RESPONSE:", data);

      if (data.statusCode === 400) {
        const errorMessage =
          data?.error || data?.message || "Something went wrong";
        toast.error(data?.message);
        setStatus(`❌ ${errorMessage}: ${data?.message}`);
        return;
      }

      setCallId(data.callId);
      toast.success("Call started successfully 📞");
      setStatus("✅ Call Started");
    } catch (err) {
      console.error(err);

      setStatus("❌ Network Error");
    } finally {
      setLoading(false);
    }
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
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        className="
					w-full
					max-w-md
					p-6 sm:p-8
					border border-zinc-200
					rounded-xl
					bg-white dark:bg-zinc-900
				"
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
    </div>
  );
}
