const mongoose = require('mongoose'); // Import mongoose to define the schema and model

// Define the schema for a user
const userSchema = new mongoose.Schema({
    name: {
        type: String,      // The user's name
        required: true     // Name is required
    },
    email: {
        type: String,      // The user's email address
        required: true,    // Email is required
        unique: true       // Email must be unique (no duplicates)
    },
    password: {
        type: String,      // The user's hashed password
        required: true     // Password is required
    },
    creditBalance: {
        type: Number,      // The user's available credits
        default: 5         // Default credits for a new user
    }
});

// Create the model for the user collection
const User = mongoose.model('User', userSchema);

// Export the model so it can be used in controllers
module.exports = User;