export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log({ body });
    console.log({ assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID });
    console.log({ phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID });

    const { phone } = body;

    if (!phone) {
      return Response.json({ error: "Phone number required" }, { status: 400 });
    }

    const response = await fetch("https://api.vapi.ai/call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VAPI_PRIVATE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID,
        phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID,
        customer: {
          number: phone,
        },
      }),
    });

    const data = await response.json();

    console.log({ data });

    return Response.json(data);
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Failed to create call" }, { status: 500 });
  }
}
