import OpenAI from "openai";
import { Run } from "openai/resources/beta/threads/index.mjs";
import { Thread } from "openai/src/resources/beta/threads/index.js";
import { Assistant } from "openai/src/resources/beta/assistants.js";

export async function createRun(cl: OpenAI, thread: Thread, assistant: Assistant): Promise<Run> {
    let run = await cl.beta.threads.runs.create(thread.id, {
        assistant_id: assistant.id,
    });

    // poll run status.
    while (run.status === "in_progress" || run.status === "queued") {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // wait for two seconds.
        run = await cl.beta.threads.runs.retrieve(thread.id, run.id); // retrieve run.
    }
    return run;
};