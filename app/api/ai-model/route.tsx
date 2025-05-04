import Constants from "@/data/Constants";
import { NextRequest } from "next/server";
import OpenAI from 'openai';
const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});
export async function POST(req: NextRequest) {

    const { model, imageUrl, description } = await req.json();
    const ModelObject = Constants.AiModelLists.find(item => item.name == model);
    const ModelName = ModelObject?.modelName;
    const response = await openai.chat.completions.create({
        model: ModelName ?? "google/gemini-2.5-pro-exp-03-25",
        stream: true,
        messages: [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": description
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": imageUrl
                        }
                    }
                ]
            }
        ],

    });

    // Create a readable stream to send data in real-time
    const stream = new ReadableStream({
        async start(controller) {
            for await (const chunk of response) {
                const text = chunk.choices?.[0]?.delta?.content || "";
                controller.enqueue(new TextEncoder().encode(text)); // Send data chunk
            }
            controller.close(); // End stream
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });



}
