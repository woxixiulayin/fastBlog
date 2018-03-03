import { IFastifyReply, IFastifyRequest } from '../../interface/IFastify'
import { httpMethod, path, before } from '../decorators'
import { User, Session } from '../../models'
import { Login } from '.'
import BaseController from '../BaseController'
import { reply200, replyErrors } from '../../lib/ajaxReturn'
const log = require('pino')({ level: 'info' })

export default class Home extends BaseController {
    constructor() {
        super()
    }

    @httpMethod('get')
    @path('/')
    root({}, req, res) {
        console.log('home')
        return res.sendFile('dist/index.html')
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

        /**
     * 用户登出接口
     */
    @httpMethod('get')
    @path('/logout')
    async logout(param, req: IFastifyRequest, rep: IFastifyReply) {
        const isAuthoorized = await Login.checkAuthority(req, rep)

        if (!isAuthoorized) {
            return rep.send(replyErrors.code401('not authorized'))
        }

         const sessionId = req.session.sessionId
         try {
             await Session.findOneAndRemove({
                 sessionId
             })
            rep.send(reply200())
         } catch (e) {
             throw e
         }
     }
}