import debug, { debugSwitcher } from 'lib/debug'

const log = debug(debugSwitcher.route)


export default class BaseController extends Object {

    baseUrl: string
    constructor() {
        super()
        this.baseUrl = '/'
        log.info(`created controller ${this.constructor.name}`)
    }
}