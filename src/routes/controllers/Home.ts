import { httpMethod, path, before } from '../decorators'
import { User } from 'models'
import BaseController from './BaseController'
const log = require('pino')({ level: 'info' })

export default class Home extends BaseController {
    constructor() {
        super()
    }

    @httpMethod('get')
    @path('/')
    @before(() => log.info('do something before get / '))
    async root({}, req, reply) {
       
        return reply.sendFile('html/index.html')
    }

    @httpMethod('get')
    @path('/user')
    async user(params) {
        console.log('wait find')
        const u = await User.findOne()
        console.log(u)
        console.log('done')
        return {
            params,
            data: 'hello'
        }
    }
}