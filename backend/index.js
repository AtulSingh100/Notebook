const connecttoMongo = require("./db");
var cors = require('cors')
connecttoMongo()
const express = require("express");
const app = express()
const port = 5000

//This is middleware
app.use(cors())
app.use(express.json())

//Available Routes 
app.use('/api/auth',require("./routes/auth"))
app.use('/api/notes',require("./routes/notes"))

app.listen(port, () => {
    console.log(`iNotebook backend listening on port ${port}`)
})
