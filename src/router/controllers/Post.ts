import { ArrayPropOptions } from './../../lib/typegoose/prop.d';
import { httpMethod, path, before } from '../decorators'
import { IFastifyReply, IFastifyRequest } from '../../interface/IFastify'
import { FastifyReply } from 'fastify'
import { reply200, replyErrors, IAjaxReturn } from '../../lib/ajaxReturn'
import { Login } from '.'
import { Post, User, Session } from '../../models'
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
    async createPost(param, req: IFastifyRequest, rep: IFastifyReply) {
        const { title = '', content = '' } = param
        let post,
            user

        user = await Login.auth(req, rep)

        if (!user) {
            return replyErrors.code401('not verified')
        }

        if (!title || !content) {
            return replyErrors.code400('wrong param')
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

    // 删除文章
    @httpMethod('delete')
    @path('/:id')
    async deletePost(param, req: IFastifyRequest, rep: IFastifyReply) {
        let user,
            post
        let { id = 0 } = param

        user = await Login.auth(req, rep)

        if (!id) {
            return replyErrors.code400('wrong param')
        }

        if (!user) {
            return replyErrors.code401('not verified')
        }

        try {
            post = await Post.findOne({ _id: id })
            console.log(post)
            if (!post) {
                return replyErrors.code404('can not find post')
            }

            if (!post.author.equals(user._id)) {
                return rep.send(replyErrors.code403(`can operate others' assets`))
            }

            await post.remove()

            return rep.send(reply200())
        } catch (e) {
            throw e
        }

    }

    // 获取某篇文章
    @httpMethod('get')
    @path('/:id')
    async getPost(param, req: IFastifyRequest, rep: IFastifyReply) {
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

    // 修改文章
    @httpMethod('put')
    @path('/:id')
    async updatePost(param, req: IFastifyRequest, rep: IFastifyReply) {
        const { id = '', ...otherParam } = param
        let post,
            user
        console.log(param)
        user = await Login.auth(req, rep)

        if (!user) {
            return replyErrors.code401('not verified')
        }


        try {
            post = await Post.findByIdAndUpdate({ _id: id }, otherParam)

            if (!post) {
                return replyErrors.code400('can not find post')
            }

            post.save()
        } catch (e) {
            rep.send(replyErrors.code500('internal error'))
            throw e
        }

        return reply200()
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