import * as mongoose from 'mongoose'
import debug, { debugSwitcher } from 'lib/debug'
import config from 'config'

const log = debug(debugSwitcher.mongodb)

log.info('connecting...')

const db = mongoose.createConnection(config.mongodb)

export default db
