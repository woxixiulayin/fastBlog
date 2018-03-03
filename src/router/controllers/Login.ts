import { httpMethod, path, before } from '../decorators'
import { IFastifyReply, IFastifyRequest } from '../../interface/IFastify'
import { reply200, replyErrors, IAjaxReturn } from '../../lib/ajaxReturn'
import { User, Session } from '../../models'
import BaseController from '../BaseController'
import * as mongoose from 'mongoose'
import * as pino from 'pino'

const log = pino()

export default class Login extends BaseController {
    constructor() {
        super()
        this.baseUrl = '/login'
    }

    static async auth(req: IFastifyRequest, rep: IFastifyReply) {
        let session, sessionId, user

        if (req.session.user) return req.session.user

        sessionId = req.session.sessionId
        try {
            session = await Session.findOne({ sessionId })
        console.log(2)
            if (!session) return false

            user = await User.findOne({ _id: session.uuid })

            if (!user) return false

            req.session.user = user
        console.log(3)

            return user
        } catch (e) {
            console.log('auth error')
            throw e
        }
    }

    static async checkAuthority(req: IFastifyRequest, rep: IFastifyReply) {
        
        if (!req.session) {
            log.info('can font find session')
            return rep.send(replyErrors.code500('can font find session'))
        }

        const sessionId = req.session.sessionId

        if (!sessionId) {
            log.info('session is not set')
            return rep.send(replyErrors.code500('session is not set'))
        }

        let session
        try {
            session = await Session.findOne({ sessionId })
            if (session) {
                log.info('session has been find, already login')
                return true
            }
        } catch(e) {
            throw e
        }
        log.info('session cont not find')
        return false
    }

    static async needAuth(req: IFastifyRequest, res: IFastifyReply) {
        const isAuthorized = await Login.checkAuthority(req, res)
        if (!isAuthorized) {
            res.send(replyErrors.code400('not authorized'))
        }
    }

    static async needNoAuth(req: IFastifyRequest, res: IFastifyReply) {
        const isAuthorized = await Login.checkAuthority(req, res)
        if (isAuthorized) {
            res.send(replyErrors.code400('has been authorized'))
        }
    }

    @httpMethod('get')
    @path('/')
    async root(param, req: IFastifyRequest, res: IFastifyReply) {
        // const isAuthorized = await Login.checkAuthority(req, res)
        console.log('run get login')
        const user = await Login.auth(req, res)

        // if (res.sent) return

        if(user) {
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
            log.info('has login')
            return res.send(replyErrors.code405('has login')) 
        }

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
            await Session.findOneAndRemove({
                uuid: user._id
            })
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
            log.info('login', user)
            return res.send(reply200())
        } catch (e) {
            throw e
        }

    }

}