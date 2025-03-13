import OpenAI from "openai";
import { Thread } from "openai/src/resources/beta/index.js";

export async function createThread(cl: OpenAI, slug: string): Promise<Thread> {
    const thread = await cl.beta.threads.create();

    await cl.beta.threads.messages.create(thread.id, {
        role: "user",
        content: slug
    });

    return thread;
};