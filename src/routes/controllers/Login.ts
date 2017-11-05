import { session } from './../../interface/IFastify';
import { httpMethod, path, before } from '../decorators'
import { IFastifyReply, IFastifyRequest } from 'interface/IFastify'
import { reply200, replyErrors, IAjaxReturn } from 'lib/ajaxReturn'
import { User, Session } from 'models'
import BaseController from './BaseController'

export default class Login extends BaseController {
    constructor() {
        super()
        this.baseUrl = '/login'
    }

    static async checkUserNotLogin(req: IFastifyRequest, res: IFastifyReply) {
        const sessionId = req.session.sessionId
        if (!sessionId) {
            res.send(replyErrors.code500('can not get session id'))
        }

        let session = await Session.findOne({ sessionId })

        if (session) {
            res.redirect(200, '/')
        }

    }

    @httpMethod('get')
    @path('/')
    async root(param, req: IFastifyRequest, res: IFastifyReply) {
        await Login.checkUserNotLogin(req, res)
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

        let user
        try {
             user = await User.findOne({
                name,
            })
        } catch (e) {
            throw e
        }

        if (!user) {
            res.send(replyErrors.code404('name not find'))
        }

        if (user.password !== password) {
            res.send(replyErrors.code400('password wrong'))
        }

        if (!user._id) {
            res.send(replyErrors.code404('not find user'))
        }

        const sessionId = req.session.sessionId

        if (!sessionId) {
            res.send(replyErrors.code500('can not create session'))
        }

        const session = new Session({
            sessionId,
            uuid: user._id
        })

        try {
            await session.save()
            res.redirect(200, '200')
        } catch (e) {
            throw e
        }

    }
}