import { httpMethod, path, before } from '../decorators'
import { FastifyReply } from 'fastify'
import { reply200, replyErrors, IAjaxReturn } from 'lib/ajaxReturn'
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
    async signup(this: Signup, param, res, rep: FastifyReply) {
        const reply = await this.register(param)
        rep.send(reply)
    }

    async register(
        {
            name = '',
            password = '',
            ...otherParam
        }: {
        name: string,
        password: string,
        [propName: string]: string,
    }) {
        if (!name || !password) {
            return replyErrors.code400('param is not right')
        }

        let user = await User.findOne({ name })
        if (user) {
            return replyErrors.code400('use has already exists')
        }
        user = new User({ name, password, ...otherParam})
        try {
            await user.save()
            return reply200()
        } catch (e) {
            log.error(e)
            return replyErrors.code500('internal error, can not save user')
        }
    }
}
