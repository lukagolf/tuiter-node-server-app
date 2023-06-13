import mongoose from 'mongoose';
const schema = mongoose.Schema({
    topic: String,
    username: String,
    handle: String,
    time: String,
    image: String,
    title: String,
    tuit: String,
    likes: Number,
    liked: Boolean,
    replies: Number,
    retuits: Number
}, { collection: 'tuits' });
export default schema;