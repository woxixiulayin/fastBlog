import 'reflect-metadata'
import { FastifyRequest, FastifyReply } from 'fastify'

export type HTTPMethod = 'get' | 'post' | 'delete' | 'put'

export const symbolPathKey = Symbol.for('router:path')
export const symbolHttpMethod =Symbol.for('router:httpMethod')


export const path = (path: string): Function => {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
        Reflect.defineMetadata(symbolPathKey, path, target, propertyKey)

        if (!descriptor.value) return
        
        const oldMethod = descriptor.value
        descriptor.value = function(req: FastifyRequest, res: FastifyReply) {
            const params = {...req.body, ...req.query}
            const methodResult = oldMethod.call(this, params)
            res.send(methodResult)
        }
    }
}

const httpMethod = (method: HTTPMethod): Function => {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
        Reflect.defineMetadata(symbolHttpMethod, method, target, propertyKey)
    }
}

export const httpGet = httpMethod('get')
export const httpPost = httpMethod('post')
