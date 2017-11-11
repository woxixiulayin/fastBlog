import * as fs from 'fs'
import * as path from 'path'
import mongoose = require('mongoose')
import * as pino from 'pino'

const config = JSON.parse(fs.readFileSync(path.resolve('../config.json'), { encoding: 'utf-8'}))

const log = pino()

log.info('connecting...')

mongoose.Promise = require('bluebird')
mongoose.connect(config.mongodb, {
    useMongoClient: true,
})

// 一下这行会打开数据库连接
const db = mongoose.connection

db.on('error', e => {
    log.error('can not connect mongodb')
    throw e
})
db.on('open', () => log.info('mongodb has been successfully open'))

export default db
