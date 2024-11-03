import mongoose from "mongoose"; // Import mongoose

// Define the User schema
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	age: {
		type: Number,
		required: true,
	},
});

// Export the User model
const User = mongoose.model("User", userSchema);
export default User;
