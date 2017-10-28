import * as mongoose from 'mongoose'
import debug from './debug'
import config from '../../config'

const log = debug('mongodb')

log('connecting...')

const db = mongoose.createConnection(config.mongodb)

export default db
