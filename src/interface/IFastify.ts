import { FastifyReply, FastifyRequest} from 'fastify'

export interface IFastifyRequest extends FastifyRequest {
    cookies: {
        sessionId: string
    },
    session: string,
}

export interface IFastifyReply extends FastifyReply {
    setCookies: (name: string, value: string, option?: object) => any,
}