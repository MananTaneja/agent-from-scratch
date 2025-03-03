import 'dotenv/config'
import { runLlm } from './src/llm'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const response = await runLlm({ userMessage })
console.log(response)