# IMAGIFY

IMAGIFY is a full-stack web application that allows users to generate AI images from text prompts, manage their credits, and purchase more credits using Razorpay payments. The project is built with a React frontend and a Node.js/Express backend, using MongoDB for data storage.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Frontend Overview](#frontend-overview)
- [Backend Overview](#backend-overview)
- [Credits & License](#credits--license)

---

## Features
- User registration and login (JWT authentication)
- Generate AI images from text prompts (ClipDrop API)
- Credit system: users spend credits to generate images
- Buy credits with Razorpay payment gateway
- Responsive, modern UI with React and Tailwind CSS
- User authentication middleware and secure backend

---

## Tech Stack
- **Frontend:** React, Tailwind CSS, Axios, React Router, Framer Motion
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Razorpay, dotenv
- **Other:** ClipDrop API (for image generation)

---

## Project Structure
```
IMAGIFY/
├── client/                # Frontend (React)
│   ├── src/
│   │   ├── assets/        # Images and icons
│   │   ├── components/    # Reusable React components
│   │   ├── context/       # App context (global state)
│   │   ├── pages/         # Main pages (Home, BuyCredits, Result, etc.)
│   │   └── index.css      # Global styles
│   ├── public/
│   └── package.json
├── server/                # Backend (Node.js/Express)
│   ├── controllers/       # Route controllers (user, image)
│   ├── middlewares/       # Auth middleware
│   ├── models/            # Mongoose models (User, Transaction)
│   ├── routes/            # Express routes (user, image)
│   ├── mongodb.js         # MongoDB connection
│   ├── server.js          # Main server file
│   └── package.json
└── README.md              # Project documentation
```

---

## Setup & Installation

### Prerequisites
- Node.js and npm installed
- MongoDB instance (local or cloud)
- Razorpay account (for payment integration)
- ClipDrop API key

### 1. Clone the repository
```
git clone https://github.com/hanisx019/Imagify---Ai-Text-Image-Generator.git
cd Imagify---Ai-Text-Image-Generator
```

### 2. Backend Setup
```
cd server
npm install
```
- Create a `.env` file in the `server` folder with the following variables:
```
PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLIPDROP_API=your_clipdrop_api_key
CURRENCY=INR
```
- Start the backend server:
```
npm start
```

### 3. Frontend Setup
```
cd ../client
npm install
```
- Create a `.env` file in the `client` folder with the following variable:
```
VITE_RAAZOR_KEY_ID=your_razorpay_key_id
```
- Start the frontend:
```
npm run dev
```

---

## Environment Variables
- **Backend:**
  - `PORT`: Port for the backend server
  - `MONGODB_URL`: MongoDB connection string
  - `JWT_SECRET`: Secret for JWT authentication
  - `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`: Razorpay API keys
  - `CLIPDROP_API`: ClipDrop API key for image generation
  - `CURRENCY`: Currency code (e.g., INR)
- **Frontend:**
  - `VITE_RAAZOR_KEY_ID`: Razorpay key for frontend

---

## API Endpoints

### User Routes (`/api/user`)
- `POST /register` — Register a new user
- `POST /login` — Login and get JWT token
- `GET /credits` — Get current user's credit balance (auth required)
- `POST /pay-razor` — Create a Razorpay order for buying credits (auth required)
- `POST /verify-razor` — Verify Razorpay payment and add credits

### Image Routes (`/api/image`)
- `POST /generate-image` — Generate an image from a text prompt (auth required)

---

## Frontend Overview
- Built with React and Tailwind CSS for a modern, responsive UI
- Uses React Context for global state (user, credits, etc.)
- Handles authentication, payment, and image generation flows
- Components are organized for reusability and clarity

---

## Backend Overview
- Express server with modular route/controller structure
- MongoDB for storing users and transactions
- JWT authentication and middleware for protected routes
- Razorpay integration for secure payments
- ClipDrop API integration for AI image generation
- Well-commented code for easy understanding and maintenance

---

## Credits & License
- Developed by [Mohammed Hanis]
- For educational/demo purposes. Replace API keys and secrets before deploying.
- MIT License
