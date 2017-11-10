import mongoose = require('mongoose')
import * as pino from 'pino'
import config from 'config'

const log = pino()

log.info('connecting...')

mongoose.connect(config.mongodb, { useMongoClient: true})
mongoose.Promise = global.Promise

// 一下这行会打开数据库连接
const db = mongoose.connection

db.on('error', e => {
    log.error('can not connect mongodb')
    throw e
})
db.on('open', () => log.info('mongodb has been successfully open'))

export default db
