import mongoose, { Document, Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

export interface IUser {
    email: string;
}

export interface IUserSchema extends IUser, Document {}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// adds a unique value for the username and password
UserSchema.plugin(passportLocalMongoose);

export default mongoose.model<IUserSchema>('User', UserSchema);
