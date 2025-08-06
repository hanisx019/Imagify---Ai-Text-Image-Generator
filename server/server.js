const express = require('express'); // Import express to create the server

const cors = require('cors'); // Import cors to enable Cross-Origin Resource Sharing and connecting frontend with backend

// Load environment variables from .env file and it will be available for all files in the project
require('dotenv').config();

const db = require('./mongodb'); // Import the database connection

const userRouter = require('./routes/userRoutes'); // Import user-related routes
const imageRouter = require('./routes/imageRoutes'); // Import image-related routes

// Create an express app instance
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json()); 

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Mount user-related routes at /api/user
app.use('/api/user', userRouter);

// Mount image-related routes at /api/image
app.use('/api/image', imageRouter);

// Basic route to check if server is running
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Get the port from environment variables
const PORT = process.env.PORT || 4000

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});


