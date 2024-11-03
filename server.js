import express from "express"; // Import express framework
import mongoose from "mongoose"; // Import mongoose for MongoDB connection
import { configDotenv } from "dotenv"; // Import dotenv for environment variables
import User from "./models/user.js"; // Import the User model

// Load environment variables
configDotenv();

// Create an instance of the Express app
const app = express();
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB using the connection string from the .env file
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB connected")) // Log success message
	.catch((err) => console.error(err)); // Log error message

// Route: GET - Return all users
app.get("/users", async (req, res) => {
	try {
		const users = await User.find(); // Find all users
		res.json(users); // Return users as JSON response
	} catch (error) {
		// Return error message
		res.status(500).json({ message: error.message });
	}
});

// Route: POST - Add a new user
app.post("/users", async (req, res) => {
	// Create a new user instance with request body details
	const user = new User(req.body);
	try {
		const savedUser = await user.save(); // Save the user to the database
		res.status(201).json(savedUser); // Return saved user as JSON response
	} catch (error) {
		// Return error message
		res.status(400).json({ message: error.message });
	}
});

// Route: PUT - Edit a user by ID
app.put("/users/:id", async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			req.body
		); // Update user
		res.json(updatedUser); // Return updated user as JSON response
	} catch (error) {
		// Return error message
		res.status(400).json({ message: error.message });
	}
});

// Start the server
app.listen(PORT, () => {
	// Log server start message
	console.log(`Server is running on port ${PORT}`);
});
