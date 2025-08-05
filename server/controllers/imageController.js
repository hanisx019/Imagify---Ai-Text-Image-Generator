const axios = require("axios"); // Axios is javascript library used to make HTTP Request on both frontend(browser) and backend(nodejs).

const User = require('../models/userSchema'); // Imports the User model to interact with the users collection in MongoDB.

const FormData = require('form-data') // Imports FormData to help send data in form-data way in HTTP requests rather than json-data way.


// Controller function to generate an image from a text prompt
const generateImage = async(req, res) => {
    try {

        const { prompt } = req.body; // Extracts the 'prompt' (text description) from the req.body which is sent from generate image page

        const user = await User.findById(req.body.userId); // It Extracts userId from req.body ,who have sent the prompt

        // Condition to check wether user or prompt is missing, if true returns an error message Missing Details
        if (!user || !prompt) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Condition to check wether user credit balance is equal to 0 or < 0, if true returns an error message No Credit Balance
        if (user.creditBalance === 0 || user.creditBalance < 0) {
            return res.json({ success: false, message: "No Credit Balance", creditBalance: user.creditBalance, noCredits: true });
        }

        // Create a new FormData object and append the prompt to it
        const formData = new FormData();
        formData.append('prompt', prompt);

        // Makes the POST request to the ClipDrop API to generate an image from the prompt which is stored in formData
        // The API key is read from environment variables
        // The responseType 'arraybuffer' is used to get the image as binary data
        const response = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer'
        });

        const base64Image = Buffer.from(response.data, 'binary').toString('base64'); // Convert the binary image data to a base64-encoded string.

        const resultImage = `data:image/png;base64,${base64Image}`; // Format the base64 string as a data URL so it can be displayed directly in the browser.

        await User.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 }); // Deduct 1 credit from the user's balance for generating an image.

        res.json({ success: true, resultImage, creditBalance: user.creditBalance - 1 }); // Send the generated image and the updated credit balance back to the client

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

module.exports = { generateImage }; // Export the generateImage function so it can be used in Routes