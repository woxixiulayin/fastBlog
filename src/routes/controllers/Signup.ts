import { httpMethod, path, before } from '../decorators'
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
}
