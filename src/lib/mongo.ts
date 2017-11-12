import * as fs from 'fs'
import * as path from 'path'
import * as bluebird from 'bluebird'
import mongoose = require('mongoose')
import * as pino from 'pino'

global.Promise = bluebird
mongoose.Promise = global.Promise

const connect = (url: string) => {
    console.log('connecting...')
    mongoose.connect(url, {
        useMongoClient: true,
    })
    console.log("mongoose.Promise === bluebird: ", mongoose.Promise.ES6 === bluebird)
    const db = mongoose.connection
    db.on('error', e => {
        console.error('can not connect mongodb')
        throw e
    })
    db.on('open', () => console.log('mongodb has been successfully open'))
    return db
}

export default {
    connect
}
