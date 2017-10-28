import { path, httpGet, httpPost } from '../helper'

export default class Home {
    @httpGet
    @path('/')
    root(params) {
        return {
            params,
            data: 'hello'
        }
    }
}