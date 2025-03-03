import OpenAI from 'openai'

const token = process.env["OPENAI_API_KEY"];
const endpoint = process.env["OPENAI_API_ENDPOINT"]
export const openai = new OpenAI({ baseURL: endpoint, apiKey: token })
