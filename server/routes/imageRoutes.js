const express = require('express'); // Import express to create the router

// Create a new router for image-related routes
const imageRouter = express.Router();

// Import the generateImage controller function
const { generateImage } = require('../controllers/imageController');

// Import the authentication middleware
const { userAuth } = require('../middlewares/auth');

// Route to generate an image from a prompt (requires authentication)
imageRouter.post('/generate-image', userAuth, generateImage);

// Export the router so it can be used in the main server file
module.exports = imageRouter;