import * as pino from 'pino'
import * as moment from 'moment'

const baseTime = moment()

const debugSwitcher = {
    // cancel log by comment that line
    mongodb: 'mongodb',
    route: 'route',
}

const pretty = pino.pretty({
    formatter: ({ name, msg }): string => `[${moment().diff(baseTime)}ms] ${name}: ${msg}`
})

export default pino({}, pretty)
