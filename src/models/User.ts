import {
    prop,
    ModelType,
    Typegoose,
    InstanceType,
    pre
} from 'typegoose'

/**
 * UserSchema
 */

@pre<UserClass> ('save', next => {
    if (!this.createdAt) {
        this.createdAt = new Date()
    }
})
class UserClass extends Typegoose {
    @prop({
        required: true
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

// UserModal
const User = new UserClass().getModelForClass(UserClass);

(async() => {
    const admin = new User({
        name: 'admin',
        password: '123456'
    })
    console.log(admin)
    admin.save(err => {
        if (err) {
            console.log(err)
        }
        console.log('OK');
    })
    const u = await User.findOne()
    console.log(u)
    console.log('done');
})()

export default User
