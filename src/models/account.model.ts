import mongoose from 'mongoose';

const collectionName = "accounts";

const accountSchema = new mongoose.Schema({
    username: String,
    password: String
});

const AccountModel = mongoose.model('Account', accountSchema, collectionName);
export {
    AccountModel
};