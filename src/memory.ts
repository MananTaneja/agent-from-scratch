import { JSONFilePreset } from 'lowdb/node'
import { v4 as uuid } from 'uuid'
import type { AIMessage, DbData, MessageWithMetadata } from '../types'

export const addMetadata = (message: AIMessage): MessageWithMetadata => {
    return {
        ...message,
        id: uuid(),
        createdAt: new Date().toISOString()
    }
}

export const removeMetadata = (message: MessageWithMetadata): AIMessage => {
    const { id, createdAt, ...rest } = message
    return rest
}

const defaultData: DbData = {
    messages: []
}

export const getDb = async () => {
    const db = JSONFilePreset<DbData>('db.json', defaultData)
    return db
}

export const addMessage = async (messages: AIMessage[]) => {
    const db = await getDb();
    db.data.messages.push(...messages.map(addMetadata))
    await db.write()
}

export const getMessages = async () => {
    const db = await getDb()
    return db.data.messages.map(removeMetadata)
}