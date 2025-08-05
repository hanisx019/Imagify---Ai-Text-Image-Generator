const jwt = require('jsonwebtoken'); // Import jsonwebtoken for verifying JWT tokens

// Middleware to authenticate user using JWT token 

const userAuth = async (req, res, next) => {

    const { token } = req.headers; // Extract token from request headers

    // If token is missing, return not authorized
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized, Login Again' });
    }

    // If token is present, verify it
    try {
        
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key and decode the token to get user information

        // If token contains a user id, attach it to the request body
        // check if tokenDecode.id exists to ensure the token is valid
        if (tokenDecode.id) {

            if (!req.body) req.body = {}; // if token does not exist in request body exists, create an empty object
            req.body.userId = tokenDecode.id; // if token is valid, attach userId to the request body

        } else {
            // If token is invalid, return not authorized
            return res.json({ success: false, message: 'Not Authorized, Login Again' });
        }

        // Calls the next middleware or route handler
        next();
        
    } catch (error) {
        // If token is invalid or expired, return error
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Export the userAuth middleware so it can be used in routes
module.exports = { userAuth };