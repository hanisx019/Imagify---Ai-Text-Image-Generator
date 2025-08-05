
const mongoose = require('mongoose'); // Import mongoose to define the schema and model

// Define the schema for a transaction (buying credits/payment)
const transactionSchema = new mongoose.Schema({
    userId: {
        type: String, // The ID of the user who made the transaction 
        required: true,
    },
    plan: {
        type: String, // The plan name (e.g., Basic, Advanced, Business)
        required: true,
    },
    amount: {
        type: Number, // The amount paid for the plan
        required: true,
    },
    credits: {
        type: Number, // The number of credits bought in this transaction
        required: true,
    },
    payment: {
        type: Boolean, // Whether the payment was successful
        default: false,
    },
    orderId: {
        type: String, // The Razorpay order ID for this transaction
    },
    date: {
        type: Number, // The date/time of the transaction (timestamp)
    }
});

// Create the model for the transaction collection 
const transactionModel = mongoose.model('transaction', transactionSchema);

// Export the model so it can be used in controllers
module.exports = transactionModel;