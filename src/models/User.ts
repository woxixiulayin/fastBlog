import {
    prop,
    ModelType,
    Typegoose,
    InstanceType,
    pre,
    Ref
} from 'typegoose'

/**
 * UserSchema
 */


// remember class's name will be used as connection's name, don't waste time on it!!
class User extends Typegoose {

    @prop({
        required: true,
        unique: true,
    })
    name: string

    @prop({ ref: User })
    _id: Ref<User>

    @prop()
    nickname ? : string

    @prop({
        required: true
    })
    password: string

    @prop()
    avatar ? : string

    @prop({ required: true, default: Date.now })
    createdAt ? : Date
}

const UserModal = new User().getModelForClass(User);

// test code
// (async() => {
//     await UserModal.findOneAndRemove({ name: 'test' })
//     const admin = new UserModal({
//         name: 'test',
//         password: 'admin'
//     })
//     console.log(admin)
//     await admin.save()

//     console.log('wait find')
//     const u = await UserModal.findOne({ name: 'test' })
//     // console.log(u)
//     console.log(u)
//     console.log('done')
// })()

export default UserModal
export {
    User
}
