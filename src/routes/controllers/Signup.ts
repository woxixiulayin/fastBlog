import { httpMethod, path, before } from '../decorators'
import { FastifyReply } from 'fastify'
import { User } from 'models'
import BaseController from './BaseController'

const log = require('pino')({ level: 'info' })

export default class Signup extends BaseController {
    constructor() {
        super()
        this.baseUrl = '/signup'
    }

    @httpMethod('get')
    @path('/')
    root(param, res, rep) {
        rep.sendFile('html/signup.html')
    }

    @httpMethod('post')
    @path('/')
    signup(param, res, rep: FastifyReply) {
        log.info('signup:', param)
        rep.send('yes')
    }
}
