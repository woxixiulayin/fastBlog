import {
    prop,
    ModelType,
    Typegoose,
    InstanceType,
    pre
} from 'typegoose'

import * as mongoose from 'mongoose'
/**
 * UserSchema
 */


// remember class's name will be used as connection's name, don't waste time on it!!
// @pre<User> ('save', next => {
//     if (!this.createdAt) {
//         this.createdAt = new Date()
//     }
// })
class User extends Typegoose {
    @prop({
        required: true,
        unique: true,
    })
    name: string

    @prop()
    nickname ? : string

    @prop({
        required: true
    })
    password: string

    @prop()
    avatar ? : string

    @prop()
    createdAt ? : string
}

const UserModal = new User().getModelForClass(User);

(async() => {
    const admin = new UserModal({
        name: 'myfastblog',
        password: 'admin'
    })
    console.log(admin)
    await admin.save()

    console.log('wait find')
    const u = await UserModal.findOne()
    console.log(u)
    console.log('done')
})()

export default UserModal
