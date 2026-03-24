import { streamText, convertToModelMessages } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: google("gemini-2.5-flash"),
      // Required: await this function in SDK v6
      messages: await convertToModelMessages(messages), 
    });

    // Required: this replaces toDataStreamResponse in SDK v6
    return result.toUIMessageStreamResponse(); 
  } catch (error) {
    console.error("Gemini Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}