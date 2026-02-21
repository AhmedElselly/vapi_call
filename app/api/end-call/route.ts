export async function POST(req: Request) {
  try {
    const { callId } = await req.json();

    if (!callId) {
      return Response.json({ error: "callId required" }, { status: 400 });
    }

    const response = await fetch(`https://api.vapi.ai/call/${callId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.VAPI_PRIVATE_KEY}`,
      },
    });

    const data = await response.json();

    return Response.json(data);
  } catch (err) {
    console.error(err);

    return Response.json({ error: "Failed to end call" }, { status: 500 });
  }
}
