import { BaseController } from './controllers'
import { symbolHttpMethod, symbolPathKey, symbolBefore } from './decorators'
import debug, { debugSwitcher } from 'lib/debug'
import { FastifyInstance, HTTPMethod } from 'fastify'

const log = debug(debugSwitcher.route)

const createRoutes = (app: FastifyInstance, controllers: BaseController) => {
    log.info(`controllers is`, controllers)
    Object.keys(controllers).forEach((controllerName: string) => {

        const controller = new controllers[controllerName]()
        // get all methodNames in controller property
        const methodNames = new Set(Object.getOwnPropertyNames(Object.getPrototypeOf(controller)))
        // delete method not created by us
        methodNames.delete('constructor')

        log.info(`begin to create controller ==${controllerName}== with method:`, JSON.stringify([...methodNames]))

        methodNames.forEach(methodName => {
            const method = controller[methodName]

            log.info(`create controller ==${controllerName}== method: *${methodName}*`)

            if (typeof method !== 'function') return

            const httpMethod: HTTPMethod = Reflect.getMetadata(symbolHttpMethod, controller, methodName)
            const path = Reflect.getMetadata(symbolPathKey, controller, methodName)
            const beforeHandler = Reflect.getMetadata(symbolBefore, controller, methodName) || null

            // if not define http method then return
            if (!httpMethod || !path) return

            log.info(`create route ${httpMethod} ${path}`)

            app.route({
                method: httpMethod,
                url: path,
                beforeHandler,
                handler: method
            })
        })
    })
}

export {
    createRoutes
}
