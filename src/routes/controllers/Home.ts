import { path, httpGet, httpPost } from '../helper'

export default class Home extends Object {
    constructor() {
        super()
    }

    @httpGet
    @path('/')
    root(params) {
        return {
            params,
            data: 'hello'
        }
    }
}