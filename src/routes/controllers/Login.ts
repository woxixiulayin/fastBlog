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

    static async checkUserLogin(req: IFastifyRequest, res: IFastifyReply) {
        const sessionId = req.session.sessionId
        if (!sessionId) {
            res.send(replyErrors.code401('not verified'))
        }
    }

    @httpMethod('get')
    @path('/')
    async root(param, req: IFastifyRequest, res: IFastifyReply) {
        await Login.checkUserLogin(req, res)
        res.sendFile('html/login.html')
    }

    /**
     * 用户登录接口
     * @param param 登录参数
     * @param req 
     * @param res 
     */
    @httpMethod('post')
    @path('/')
    async login({
        name = '',
        password = '',
    } = {}, req: IFastifyRequest, res: IFastifyReply) {

        if (!name || !password) {
            res.send(replyErrors.code400('param error'))
        }

        const user = await User.findOne({
            name,
        })

        if (!user) {
            res.send(replyErrors.code404('name not find'))
        }

        if (user.password !== password) {
            res.send(replyErrors.code400('password wrong'))
        }

        res.send(reply200())
    }
}