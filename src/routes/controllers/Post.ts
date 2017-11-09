import { httpMethod, path, before } from '../decorators'
import { Types } from 'mongoose'
import { IFastifyReply, IFastifyRequest } from 'interface/IFastify'
import { FastifyReply } from 'fastify'
import { reply200, replyErrors, IAjaxReturn } from 'lib/ajaxReturn'
import { Post } from 'models'
import BaseController from '../BaseController'


const pageCount = 20

export default class PostController extends BaseController {
    constructor() {
        super()
        this.baseUrl = '/post'
    }

    // 返回文章modal
    @httpMethod('get')
    @path('/:id')
    async getPost(param, req: IFastifyRequest, rep: IFastifyReply) {
        const { id = '' } = req
        let _id

        try {
            _id = Types.ObjectId(id)
        } catch (e) {
            rep.send(replyErrors.code400('wrong param id'))
        }

        if (!_id) {
            return rep.send(replyErrors.code400('param wrong'))
        }

        let post

        try {
            post = await Post.findOne({ _id })

            if (!post) {
                return rep.send(replyErrors.code400('can not find post'))
            }

            return rep.send(reply200({ data: post }))
        } catch (e) {
            console.log(e)
            rep.send(replyErrors.code500('internal error'))
            throw e
        }
    }


    @httpMethod('get')
    @path('/list')
    async getPostList(param, req: IFastifyRequest, rep: IFastifyReply) {
        const { page = 0 } = param
        const skipCount = page * 20
        let posts
        try {
            posts = await Post.find().sort({ createAt: -1 }).skip(skipCount).limit(pageCount)
            return rep.send(reply200({ data: posts }))
        } catch (e) {
            rep.send(replyErrors.code500('internal error'))
            throw e
        }
    }

}