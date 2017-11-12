import createRoutesFromControllers from './createRoutesFromControllers'
import * as controllers from './controllers'
import { FastifyInstance } from 'fastify'

const createRoutes = (app: FastifyInstance) => createRoutesFromControllers(app, controllers)

export default createRoutes