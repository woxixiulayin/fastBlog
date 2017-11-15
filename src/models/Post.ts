import {
    prop,
    ModelType,
    Typegoose,
    InstanceType,
    pre,
    Ref
} from '../lib/typegoose'

import { User } from './User'

/**
 * UserSchema
 */


// remember class's name will be used as connection's name, don't waste time on it!!
class Post extends Typegoose {

    @prop({
        required: true,
    })
    title: string

    @prop({ ref: User, required: true })
    author: Ref<User>

    @prop({
        required: true
    })
    content: string

    @prop()
    pv ? : number

    @prop({ required: true, default: Date.now })
    createdAt ? : Date
}

const PostModal = new Post().getModelForClass(Post);

export default PostModal
export {
    Post
}