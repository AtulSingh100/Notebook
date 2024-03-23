const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Atulisagoodb$oy'


const fetchuser = (req, res, next) => {
    //GET THE USER FROM THE JWT TOKEN AND ADD ID TO REQ OBJECT
    //Get the User from the Jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

    //We are doing here reverse that we are Finding data from Token
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}


module.exports = fetchuser;