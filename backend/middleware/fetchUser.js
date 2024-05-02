const jwt = require('jsonwebtoken');
const JWT_SECRET = 'P@U#N$I%T';

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please login first :)" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.usertoken;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: `Internal Server Error + ${error}` })
    }
}

module.exports = fetchuser;


// Get user from JWT Token
// Step 1: We send token in Req
// Step 2: get JWT token from Req Header
// Step 3: Verify token