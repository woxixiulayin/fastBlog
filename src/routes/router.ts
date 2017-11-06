import BaseController from 'routes/BaseController'
import { symbolHttpMethod, symbolPathKey, symbolBefore } from './decorators'
import { FastifyInstance, HTTPMethod } from 'fastify'
import * as pino from 'pino'

const log = pino()

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
            const baseUrl = controller.baseUrl || '/'
            if (!path.startsWith('/')) {
                throw new TypeError(`path should start width /`)
            }
            if (!baseUrl.startsWith('/')) {
                throw new TypeError(` baseUrl should start width /`)
            }
            const newPath = baseUrl.concat(path).replace('//', '/')
            log.info(`create route ${httpMethod} ${newPath}`)

            const widthUrl = (url: string): FastifyInstance => app.route({
                method: httpMethod,
                url,
                beforeHandler,
                handler: method
            })
            
            widthUrl(newPath)
            if (newPath.length === 1) return
            if (newPath.endsWith('/')) {
                log.info(newPath.slice(0, -1))
                widthUrl(newPath.slice(0, -1))
            } else {
                log.info(`${newPath}/`)
                widthUrl(`${newPath}/`)
            }
        })
    })
}

export {
    createRoutes
}
