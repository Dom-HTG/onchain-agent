import OpenAI from "openai";
import { Run, Thread } from "openai/src/resources/beta/threads/index.js";

export async function manageRun(run: Run, thread: Thread, client: OpenAI) {
    while (run.status === "requires_action") {
        run = await handleTools();
    };

    // Handle failed state.
    if (run.status === "failed") {
        const errMessage = `Unexpected error while running: ${run.last_error?.message}/ code: ${run.last_error?.code}`;
        console.error(errMessage);

        // notify user of error.
        await client.beta.threads.messages.create(thread.id, {
            role: "assistant",
            content: errMessage
        });
    };

    // Retrieve all messages.
    const messages = await client.beta.threads.messages.list(thread.id);
    const latestAsssistantMessage = messages.data.find(message => message.role === "assistant")

    return latestAsssistantMessage?.content[0] || {  type: "text", text: {
        value: "No Response from assistant", annotations: []
    }};
};