import { FastifyReply, FastifyRequest} from 'fastify'

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
    expires: any
}