const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique : true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type : Date, 
        default: Date.now 
    }
});
const User = mongoose.model('user', UserSchema);
module.exports = User
// Here to Import and export something we are not using import and export command instead we are using the require command to import or export we say require(Address)