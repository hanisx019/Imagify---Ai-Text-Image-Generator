const User = require('../models/userSchema'); // Imports the User model to interact with the users collection in MongoDB.

const bcrypt = require('bcrypt'); // Import bcrypt for hashing and comparing passwords.

const jwt = require('jsonwebtoken'); // Import jsonwebtoken for creating and verifying JWT tokens.

const razorpay = require('razorpay'); // Import Razorpay SDK for payment integration.

const transactionModel = require('../models/transaction'); // Imports the transaction model to store payment/credit transactions


// Controller to register a new user
const registerUser = async (req, res) => {
    try {
        
        const { name, email, password } = req.body; // Extracts name, email, and password from the request body.

        // Condition to check if any field is missing ,if true returns an error message Missing Details
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' });
        }

        // Code for Salting and hashing the password for security
        const salt = await bcrypt.genSalt(10); // Generates a salt for hashing
        const hashedPassword = await bcrypt.hash(password, salt); // Hashes the password using the generated salt

        // Prepare user data to save
        const userData = {
            name,
            email,
            password: hashedPassword
        };
     
        const newUser = new User(userData); // Creates a new instance of the User model with the provided user data

        const user = await newUser.save(); // Save the new user document to the database

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // Creates a JWT token for the new user

        res.json({ success: true, token, user: { name: user.name, creditBalance: user.creditBalance } }); // Respond with success, token, and user info

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Controller to login a user
const loginUser = async (req, res) => {
    try {
        
        const { email, password } = req.body; // Extract email and password from the request body.

        const user = await User.findOne({ email }); // Find the user by email

        // If user not found, return Error Message User Does Not Exist
        if (!user) {
            return res.json({ success: false, message: 'User Does Not Exist' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password); // Compare passwords
        
        // If password matches, create a JWT token else, if password does not match, return error
        if (isMatch) {
            
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // If password matches, create a JWT token

            return res.json({ success: true, token, user: { name: user.name, creditBalance: user.creditBalance } }); // Return success, token, and user info

        } else {
            
            return res.json({ success: false, message: 'Incorrect Password' }); // If password does not match, return error message incorrect password
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Controller to get the user's current credit balance 
const userCredits = async (req, res) => {
    try {

        const userId = req.body.userId || req.userId; // Extract userId from request (either from body or set by auth middleware)

        const user = await User.findById(userId); // Find the user by ID in the database

        // If user not found, return error
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        // If user exists Return the user's credit balance 
        res.json({ success: true, credits: user.creditBalance, user: { name: user.name, creditBalance: user.creditBalance } });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

/// Razorpay integration Controller Code :

// Create a Razorpay instance using API keys from environment variables ,
// This is used to interact with the Razorpay payment gateway for creating orders and verifying payments.
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || process.env.RAAZOR_KEY_ID, // If the keys are not set, it will use the fallback keys
    key_secret: process.env.RAZORPAY_KEY_SECRET || process.env.RAAZOR_KEY_SECRET // If the keys are not set, it will use the fallback keys
});


// Controller to create a Razorpay order for buying credits
const paymentRazorpay = async (req, res) => {
    try {
        const { userId, planId } = req.body;  // Extracts userId and planId from request body

        const userData = await User.findById(userId); // Find the user by ID

        // If userId or planId is missing, return error
        if (!userId || !planId) {
            return res.json({ success: false, message: 'Missing Details' });
        }

        // Set Different Subscription Plan details based on planId
        let plan, credits, amount, date;

        // switch case for different Subscription Plan
        switch (planId) {
            case "Basic":
                plan = 'Basic';
                credits = 100;
                amount = 10;
                break;
            case "Advanced":
                plan = 'Advanced';
                credits = 500;
                amount = 50;
                break;
            case "Business":
                plan = 'Business';
                credits = 5000;
                amount = 250;
                break;
            default:
                return res.json({ success: false, message: 'Plan Not Found' });
        }

        // Get the current date/time to store it in database
        date = Date.now();

        // Prepare transaction data to save in the database
        const transactionData = {
            userId, plan, amount, credits, date 
        };

        const newTransaction = await transactionModel.create(transactionData); // Create a new transaction document in the database using the transaction data with transaction Model

        // Prepare Razorpay order options (amount in paise)
        const options = {
            amount: amount * 1000, // Converts amount to paise (Razorpay expects amount in paise)
            currency: process.env.CURRENCY // Currency for the transaction, e.g., 'INR'
        };

        // Create a new Razorpay order using the Razorpay instance
        // This will create an order in Razorpay and return an order ID
        // The order ID will be used later to verify the payment
        razorpayInstance.orders.create(options, async (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error });
            }
            
            await transactionModel.findByIdAndUpdate(newTransaction._id, { orderId: order.id }); // Save the Razorpay orderId in the transaction for later verification
            
            res.json({ success: true, order }); // Return the order details to the frontend
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Controller to verify Razorpay payment and add credits to user  after successful payment
// This function checks the payment status and updates the user's credit balance accordingly.
// It is called after the payment is completed on the frontend.
const verifyRazorpay = async (req, res) => {
    try {
        
        const { razorpay_order_id } = req.body; // Extract the Razorpay order ID from the request body
        
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id); // Fetch the order details from Razorpay using the order ID

        
        const transactionData = await transactionModel.findOne({ orderId: razorpay_order_id }); // Find the transaction in the database by orderId

        // If transaction not found, return error
        if (!transactionData) {
            return res.json({ success: false, message: 'Transaction not found for this order.' });
        }

        // If payment is successful (paid or authorized)
        if (orderInfo.status === 'paid' || orderInfo.status === 'authorized') {

            // If payment already processed, return error
            if (transactionData.payment) {
                return res.json({ success: false, message: 'Payment already processed.' });
            }

            // Add credits to the user's balance
            const userData = await User.findById(transactionData.userId); // Find the user by ID from the transaction data

            const creditBalance = userData.creditBalance + transactionData.credits; // Calculate the new credit balance by adding the credits from the transaction to the user's current balance

            await User.findByIdAndUpdate(userData._id, { creditBalance }); // Update the user's credit balance in the database

            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true }); // Update the transaction document to mark it as paid

            res.json({ success: true, message: 'Credits Added' }); // Return success message indicating credits have been added

        } else {
            // If payment failed, return error
            res.json({ success: false, message: 'Payment Failed' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Export all controller functions so they can be used in Routes
module.exports = { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay };