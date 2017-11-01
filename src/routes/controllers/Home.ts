import { path, httpGet, httpPost } from '../helper'
import { User } from 'models'
import BaseController from './BaseController'

export default class Home extends BaseController {
    constructor() {
        super()
    }

    @httpGet
    @path('/')
    async root({}, req, reply) {
        const test = async() => {
    const admin = new User({
        name: 'admin',
        password: '123456'
    })
    console.log(admin)
    admin.save(err => {
        if (err) {
            console.log(err)
        }
        console.log('OK');
    })
    console.log('wait find')
    const u = await User.findOne({ name: 'admin'})
    console.log(u)
    console.log('done')
}

        await test()
        return reply.sendFile('html/index.html')
    }

    @httpGet
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
}