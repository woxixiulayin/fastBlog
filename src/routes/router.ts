import * as controllers from './controllers'
import { symbolHttpMethod, symbolPathKey } from './helper'
import debug from 'lib/debug'
import { FastifyInstance } from 'fastify'

const log = debug('route')

const createRoutes = (app: FastifyInstance) => {
    Object.keys(controllers).forEach((key: string) => {
        const controller = new controllers[key]()
        log(`create controller ${key}`)
        Object.getOwnPropertyNames(controller).forEach(methodName => {
            log(`create controller method ${methodName}`)
            const method = controller[methodName]
            if (typeof method !== 'function') return
            const httpMethod = Reflect.getMetadata(symbolHttpMethod, controller, methodName)
            const path = Reflect.getMetadata(symbolPathKey, controller, method)

            app[httpMethod](path, method)
        })
    })
}

export {
    createRoutes
}
