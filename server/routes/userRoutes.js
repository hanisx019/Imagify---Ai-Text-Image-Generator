const express = require('express'); // Import express to create the router

// Create a new router for user-related routes
const userRouter = express.Router();

// Import controller functions for user-related actions
const { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay } = require('./../controllers/userController');

// Import the authentication middleware
const { userAuth } = require('../middlewares/auth');

// Route to register a new user
userRouter.post('/register', registerUser);

// Route to log in a user
userRouter.post('/login', loginUser);

// Route to get the user's credits (requires authentication)
userRouter.get('/credits', userAuth, userCredits);

// Route to create a Razorpay order for buying credits (requires authentication)
userRouter.post('/pay-razor', userAuth, paymentRazorpay);

// Route to verify Razorpay payment (no authentication required)
userRouter.post('/verify-razor', verifyRazorpay);

// Export the router so it can be used in the main server file
module.exports = userRouter;