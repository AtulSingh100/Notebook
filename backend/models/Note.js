const mongoose = require("mongoose")
const { Schema } = mongoose;

const NotesSchema = new Schema({
    // Here user:{} the Concept of Foreign Key in DBMS is Used.
    // Primary Key is unique and it is not null
    // We take help of Primary Key to Uniquely Identify 
    // Referenced Table= Notes || Reference Table = User 
    // Youtube Link for Better Understanding:- https://www.youtube.com/watch?v=UyqpQ3D2yCw OR https://www.youtube.com/results?search_query=foreign+key+in+dbms
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },

    title: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    tag: {
        type : String,
        default : "General"
    },

    date: {
        type : Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Notes',NotesSchema)