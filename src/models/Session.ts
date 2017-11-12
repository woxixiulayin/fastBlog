import {
    prop,
    ModelType,
    Typegoose,
    InstanceType,
    pre
} from 'typegoose'
import * as mongoose from 'mongoose'

console.log('create session class')
console.log(mongoose.Promise.ES6 === global.Promise)

class Session extends Typegoose {
    constructor() {
        super()
        console.log('create')
        console.log(mongoose.Promise.ES6 === global.Promise)
    }
    @prop({
        required: true,
        unique: true
    })
    sessionId: string

    @prop({
        required: true,
        unique: true,
    })
    uuid: string
}

const sessionModal = new Session().getModelForClass('Session')

export default sessionModal