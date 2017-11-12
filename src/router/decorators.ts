import 'reflect-metadata'
import BaseController from './BaseController'
import { FastifyRequest, FastifyReply, FastifyMiddleware } from 'fastify'
const log = require('pino')({ level: 'info' })

export type HTTPMethod = 'get' | 'post' | 'delete' | 'put' | 'GET' | 'POST' | 'DELETE' | 'PUT'

export const symbolPathKey = Symbol.for('router:path')
export const symbolHttpMethod = Symbol.for('router:httpMethod')
export const symbolBefore = Symbol.for('route:auth')

export const path = (path: string): Function => {
    return (target: BaseController, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {

        Reflect.defineMetadata(symbolPathKey, path, target, propertyKey)

        if (!descriptor.value) return
        
        const oldMethod = descriptor.value
        descriptor.value = function(req: FastifyRequest, res: FastifyReply) {
            const params = {...req.body, ...req.query, ...req.params}
            // oldMethod should be called in target not this - -!
            console.log(`visitor: ${req.req.method} ${req.req.url}`)
            return oldMethod.call(target, params, req, res)
        }
    }
}

export const httpMethod = (method: HTTPMethod): Function => {
    return (target: BaseController, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
        Reflect.defineMetadata(symbolHttpMethod, method.toUpperCase(), target, propertyKey)
    }
}

export const before = (handler: Function): Function => {
    return (target: BaseController, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
        if (!descriptor.value) return

        const beforeHandler = function(req: FastifyRequest, res: FastifyReply, done) {
            handler.call(target, req, res, done)
            done()
        }
        Reflect.defineMetadata(symbolBefore, beforeHandler, target, propertyKey)
    }
}
