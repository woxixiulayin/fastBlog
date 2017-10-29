import * as pino from 'pino'
import * as moment from 'moment'

const baseTime = moment()

const debugSwitcher = {
    // cancel log by comment that line
    mongodb: 'mongodb',
    route: 'route',
}

var pretty = pino.pretty({
    formatter: ({ name, msg }): string => `[${moment().diff(baseTime)}ms] ${name}: ${msg}`
})

pretty.pipe(process.stdout)

const debug = (name: string): pino.Logger => {
    if (debugSwitcher[name]) {
        return pino({ name, }, pretty)
    } else {
        return pino({ name, enabled: false})
    }
}

export default debug
export {
    debugSwitcher
}