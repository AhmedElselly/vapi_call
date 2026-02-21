"use client";

import { useState } from "react";
import VapiCall from "@/components/CallVapi";
import VapiWidget from "@/components/Vapi";

export default function HomeComponent() {
  const [activeTab, setActiveTab] = useState<"voice" | "call">("voice");

  console.log({ publicKey: process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY });
  console.log({ assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID });
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col items-center justify-center font-sans">
      {/* Tabs */}
      <div className="mb-8 flex gap-6 border-b border-zinc-300 dark:border-zinc-700">
        <button
          onClick={() => setActiveTab("voice")}
          className={`pb-2 transition ${
            activeTab === "voice"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-zinc-500"
          }`}
        >
          Voice Assistant
        </button>

        <button
          onClick={() => setActiveTab("call")}
          className={`pb-2 transition ${
            activeTab === "call"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-zinc-500"
          }`}
        >
          Phone Call
        </button>
      </div>

      {/* Content */}
      <div className="flex items-center justify-center">
        {activeTab === "voice" && (
          <VapiWidget
            apiKey={process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || ""}
            assistantId={process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || ""}
          />
        )}

        {activeTab === "call" && <VapiCall />}
      </div>
    </div>
  );
}
