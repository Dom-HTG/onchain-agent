import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';
import { createAssistant } from './openai/createAssistant';
import { createThread } from './openai/createThread';
import { createRun } from './openai/createRun';
import { manageRun } from './openai/manageRun';


(() => {
    // new OpenAI client.
    const client = new OpenAI();

    // Create new Assistant.
    const assistant = createAssistant(client);

    // Create new Thread.
    const slug = "Hello caddy";
    const thread = createThread(client, slug)

    // Create new  Run.
    const run = createRun(client, thread, assistant);

    // Perform run.
    const response = await manageRun(run, thread, client);
    console.log(response);
})();