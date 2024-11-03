import express from "express"; // Import express framework
import mongoose from "mongoose"; // Import mongoose for MongoDB connection
import { configDotenv } from "dotenv"; // Import dotenv for environment variables
import User from "./models/user.js"; // Import the User model

// Load environment variables
configDotenv();

// Create an instance of the Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB using the connection string from the .env file
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB connected")) // Log success message
	.catch((err) => console.error(err)); // Log error message
