import { FastifyReply, FastifyRequest} from 'fastify'
import { User } from 'models'

export interface IFastifyRequest extends FastifyRequest {
    cookies: {
        sessionId: string
    },
    session: session,
}

export interface IFastifyReply extends FastifyReply {
    setCookie: (name: string, value: string, option?: object) => any,
    sendFile: (path: string) => void
}

export interface session {
    sessionId: string,
    encryptedSessionId: string,
    sessionData: object,
    expires: any,
    user: typeof User,
}