import OpenAI from "openai";
import { Assistant } from "openai/src/resources/beta/assistants.js";

export async function createAssistant (cl: OpenAI): Promise<Assistant> {
    const assistant = await cl.beta.assistants.create({
        model: "gpt-4o-mini",
        name: "caddy",
        instructions: `

        `,
        tools: []
    });

    return assistant;
};