import { model, Schema } from 'mongoose';

const authorSchema = new Schema({
    name: String,
    age: Number,
});

export default model('Author', authorSchema);
