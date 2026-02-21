import VapiCall from "@/components/CallVapi";
import VapiWidget from "@/components/Vapi";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <VapiWidget
        apiKey={process.env.VAPI_PUBLIC_KEY || ""}
        assistantId="8e61ed12-0c45-4273-b670-d6986e5a7b7b"
      />

      {/* <VapiCall /> */}
    </div>
  );
}
