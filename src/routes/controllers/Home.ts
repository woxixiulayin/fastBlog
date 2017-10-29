import { path, httpGet, httpPost } from '../helper'
import BaseController from './BaseController'

export default class Home extends BaseController {
    constructor() {
        super()
    }

    @httpGet
    @path('/')
    root() {
        return {
            data: 'hello'
        }
    }

    @httpGet
    @path('/user')
    user(params) {
        return {
            params,
            data: 'hello'
        }
    }
}