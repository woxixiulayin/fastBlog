import debug, { debugSwitcher } from 'lib/debug'

const log = debug(debugSwitcher.route)

export default class BaseController extends Object {
    constructor() {
        super()
        log.info(`created controller ${this.constructor.name}`)
    }
}