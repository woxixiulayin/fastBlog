import {
    prop,
    ModelType,
    Typegoose,
    InstanceType,
    pre
} from 'typegoose'

class Session extends Typegoose {
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