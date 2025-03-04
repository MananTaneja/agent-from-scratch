import 'dotenv/config'
import { z } from 'zod'
import { runAgent } from './src/agent'
import { addMessage } from './src/memory'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const weatherTools = {
  name: 'get_weather',
  parameters: z.object({})
}

const response = await runAgent({ messages: [{ role: 'user', content: userMessage }], tools: [weatherTools] })
console.log(response)
await addMessage(response)
