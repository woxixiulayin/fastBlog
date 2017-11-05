import { httpMethod, path, before } from '../decorators'
import { IFastifyReply, IFastifyRequest } from 'interface/IFastify'
import * as session from 'fastify-session'
import { reply200, replyErrors, IAjaxReturn } from 'lib/ajaxReturn'
import { User } from 'models'
import BaseController from './BaseController'

export default class Login extends BaseController {
    constructor() {
        super()
        this.baseUrl = '/login'
    }

    @httpMethod('get')
    @path('/')
    root(param, req: IFastifyRequest, res: IFastifyReply) {
        if (req.session) {
            res.send(`your session id is ${JSON.stringify(req.session)}`)
        }
        res.send('you have no session')
    }

}