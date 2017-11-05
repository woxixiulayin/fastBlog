import { httpMethod, path, before } from '../decorators'
import { IFastifyReply, IFastifyRequest } from 'interface/IFastify'
import { reply200, replyErrors, IAjaxReturn } from 'lib/ajaxReturn'
import { User, Session } from 'models'
import BaseController from './BaseController'
import * as pino from 'pino'

const log = pino()

export default class Login extends BaseController {
    constructor() {
        super()
        this.baseUrl = '/login'
    }

    static async checkAuthority(req: IFastifyRequest, rep: IFastifyReply) {

        const sessionId = req.session.sessionId

        if (!sessionId) {
            rep.send(replyErrors.code500('session is not set'))
        }

        let session
        try {
            session = await Session.findOne({ sessionId })
            if (session) {
                return true
            }
        } catch(e) {
            throw e
        }
        return false
    }

    static async needAuth(req: IFastifyRequest, res: IFastifyReply) {
        const isAuthorized = await Login.checkAuthority(req, res)
        if (!isAuthorized) {
            res.send(replyErrors.code400('not authorized'))
        }
    }

    @httpMethod('get')
    @path('/')
    async root(param, req: IFastifyRequest, res: IFastifyReply) {
        const isAuthorized = await Login.checkAuthority(req, res)

        if (res.sent) return

        if(isAuthorized) {
            return res.send(replyErrors.code405('has already login'))
        }

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

        const isAuthorized = await Login.checkAuthority(req, res)

        if (isAuthorized) {
           return res.send(replyErrors.code405('has login')) 
        }

        log.info('has login?: ', isAuthorized)
        if (!name || !password) {
            return res.send(replyErrors.code400('param error'))
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
            return res.send(replyErrors.code404('name not find'))
        }

        if (user.password !== password) {
            return res.send(replyErrors.code400('password wrong'))
        }

        log.info('user:', user)

        try {
            await Session.find({
                uuid: user._id
            }).remove()
        } catch (e) {
            log.info(e)
            throw e
        }

        const sessionId = req.session.sessionId
        log.info(sessionId)

        if (!sessionId) {
            return res.send(replyErrors.code500('can not create session'))
        }

        const session = new Session({
            sessionId,
            uuid: user._id
        })

        try {
            await session.save()
            log.info(user, 'login')
            return res.send(reply200())
        } catch (e) {
            throw e
        }

    }
}