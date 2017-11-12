import * as pino from 'pino'

const log = pino()

export default class BaseController extends Object {

    baseUrl: string
    constructor() {
        super()
        this.baseUrl = '/'
        log.info(`created controller with ${this.constructor.name}`)
    }
}