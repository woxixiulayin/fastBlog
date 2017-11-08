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


// remember class's name will be used as connection's name, don't waste time on it!!
@pre<Post>('save', next => {
    if (!this.createAt) {
        this.createAt =  Date.now
    }
})
class Post extends Typegoose {

    @prop({
        required: true,
    })
    title: string

    @prop()
    author ? : string

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
