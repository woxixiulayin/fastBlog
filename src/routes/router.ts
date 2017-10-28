import * as controllers from './controllers'
import { symbolHttpMethod, symbolPathKey } from './helper'
import debug from 'lib/debug'
import { FastifyInstance } from 'fastify'

const log = debug('route')

const createRoutes = (app: FastifyInstance) => {
    log(`controllers is`, controllers)
    Object.keys(controllers).forEach((controllerName: string) => {

        const controller = new controllers[controllerName]()
        // get all methodNames in controller property
        const methodNames = new Set(Object.getOwnPropertyNames(Object.getPrototypeOf(controller)))
        // delete method not created by us
        methodNames.delete('constructor')

        log(`begin to create controller ${controllerName} with method:`, JSON.stringify([...methodNames]))

        methodNames.forEach(methodName => {
            const method = controller[methodName]

            log(`create controller ${controllerName} method: ${methodName}`)

            if (typeof method !== 'function') return

            const httpMethod = Reflect.getMetadata(symbolHttpMethod, controller, methodName)
            const path = Reflect.getMetadata(symbolPathKey, controller, methodName)

            log(`create route ${httpMethod} ${path} to use method: ${method}`)

            app[httpMethod](path, method)
        })
    })
}

export {
    createRoutes
}
