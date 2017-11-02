import 'reflect-metadata'
import { FastifyRequest, FastifyReply, FastifyMiddleware } from 'fastify'

export type HTTPMethod = 'get' | 'post' | 'delete' | 'put' | 'GET' | 'POST' | 'DELETE' | 'PUT'

export const symbolPathKey = Symbol.for('router:path')
export const symbolHttpMethod = Symbol.for('router:httpMethod')
export const symbolBefore = Symbol.for('route:auth')

export const path = (path: string): Function => {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
        Reflect.defineMetadata(symbolPathKey, path, target, propertyKey)

        if (!descriptor.value) return
        
        const oldMethod = descriptor.value
        descriptor.value = function(req: FastifyRequest, res: FastifyReply) {
            const params = {...req.body, ...req.query}
            return oldMethod.call(this, params, req, res)
        }
    }
}

export const httpMethod = (method: HTTPMethod): Function => {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
        Reflect.defineMetadata(symbolHttpMethod, method.toUpperCase(), target, propertyKey)
    }
}

export const before = (handler: Function): Function => {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
        if (!descriptor.value) return

        const beforeHandler = function(req: FastifyRequest, res: FastifyReply, done) {
            const params = {...req.body, ...req.params}
            handler.call(this, params, req, res)
            done()
        }
        Reflect.defineMetadata(symbolBefore, beforeHandler, target, propertyKey)
        
    }
}

