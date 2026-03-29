const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  phone: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: "demo@example.com" });
    
    if (existingUser) {
      console.log("Demo user already exists!");
      console.log("Email: demo@example.com");
      console.log("Password: demo123");
    } else {
      // Create demo user
      const hashedPassword = await bcrypt.hash("demo123", 10);
      const user = new User({
        name: "Demo User",
        email: "demo@example.com",
        password: hashedPassword,
        role: "user"
      });
      
      await user.save();
      console.log("Demo user created successfully!");
      console.log("Email: demo@example.com");
      console.log("Password: demo123");
    }
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

seedUser();
