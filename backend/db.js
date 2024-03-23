const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook"

// mongosse.connect is always defined inside a Function . It cannot be defined without the Function otherwise it will give the Error
// mongoose.connect takes twor variables such as 1.mongoURI 2.console.log
const connecttoMongo = ()=>{
    mongoose.connect(mongoURI, console.log("Connected Successfuly"));
}

//Make Sure you end every Program line with module.export just like we end every sentence with Full Stop
module.exports = connecttoMongo;