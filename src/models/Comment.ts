import {
    prop,
    ModelType,
    Typegoose,
    InstanceType,
    pre,
    Ref
} from 'typegoose'

import { User, Post } from '.'

/**
 * UserSchema
 */


// remember class's name will be used as connection's name, don't waste time on it!!
class Comment extends Typegoose {

    @prop({ ref: User, required: true })
    author: Ref<User>

    @prop({
        required: true
    })
    content: string

    @prop({
        required: true,
        ref: Post
    })
    post: Ref<Post>

    @prop({ required: true, default: Date.now })
    createdAt ? : Date
}

const PostModal = new Comment().getModelForClass(Comment);

export default PostModal
