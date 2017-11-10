import { httpMethod, path, before } from '../decorators'
import { Types } from 'mongoose'
import { IFastifyReply, IFastifyRequest } from 'interface/IFastify'
import { FastifyReply } from 'fastify'
import { reply200, replyErrors, IAjaxReturn } from 'lib/ajaxReturn'
import { Login } from '.'
import { Post, User, Session } from 'models'
import BaseController from '../BaseController'


const pageCount = 15

export default class PostController extends BaseController {
    constructor() {
        super()
        this.baseUrl = '/post'
    }

    // 创建文章
    @httpMethod('post')
    @path('/')
    async createPost({
            title = '',
            content = '',
        } : {
            title: string,
            content: string
        }, req: IFastifyRequest, rep: IFastifyReply) {
        let post,
            user

        user = await Login.auth(req, rep)

        if (!user) {
            return rep.send(replyErrors.code401('not verified'))
        }

        if (!title || !content) {
            return rep.send(replyErrors.code400('wrong param'))
        }

        try {
            post = new Post({
                title,
                content,
                author: user
            })

            post.save()
            console.log(post
            )
        } catch (e) {
             rep.send(replyErrors.code500('save fail'))
            throw e
        }

        return rep.send(reply200({
            id: post._id
        }))
    }

    // 返回文章modal
    @httpMethod('get')
    @path('/:id')
    async getPost(param, req: IFastifyRequest, rep: IFastifyReply) {
        let _id
        const { id = '' } = param

        let post

        try {
            post = await Post.findOne({ _id: id })

            if (!post) {
                return rep.send(replyErrors.code400('can not find post'))
            }

            return rep.send(reply200(post))
        } catch (e) {
            console.log(e)
            rep.send(replyErrors.code500('internal error'))
            throw e
        }
    }


    /**
     * /post/list?page=10
     * @param param 
     * @param req 
     * @param rep 
     */
    @httpMethod('get')
    @path('/list')
    async getPostList(param, req: IFastifyRequest, rep: IFastifyReply) {
        const { page = 0 } = param
        const skipCount = page * pageCount
        let posts
        try {
            posts = await Post.find().sort({ createAt: +1 }).skip(skipCount).limit(pageCount)
            return rep.send(reply200(posts))
        } catch (e) {
            rep.send(replyErrors.code500('internal error'))
            throw e
        }
    }

}