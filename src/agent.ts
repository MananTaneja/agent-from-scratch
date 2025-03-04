import { runLLM } from './llm';
import type { AIMessage } from '../types';
import { addMessage, getMessages } from './memory';
import { logMessage, showLoader } from './ui';

type RunAgentParams = {
    messages: AIMessage[],
    tools: any[]
}

export const runAgent = async ({ messages, tools }: RunAgentParams) => {
    await addMessage(messages)
    const loader = showLoader('Thinking...')
    const history = await getMessages()
    const response = await runLLM({
        messages: history,
        tools
    })
    await addMessage([response])
    logMessage(response)
    loader.stop()
    return getMessages()
}