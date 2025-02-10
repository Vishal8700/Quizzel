require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const crypto = require('crypto');
const Quiz = require('./models/Quiz'); 


const app = express();
app.use(cors({ origin: 'http://localhost:3000', 
    credentials: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message }); //Include error message for debugging
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message }); //Include error message for debugging
  }
});

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
};


// Create Quiz route
app.post('/api/create-quiz', authenticateToken, async (req, res) => {
    const { title, imageUrl, questions } = req.body;
    
    const quizId = crypto.randomBytes(16).toString('hex'); // Generates a unique ID

    try {
        const newQuiz = new Quiz({
            title,
            imageUrl,
            questions,
            quizId
        });

        await newQuiz.save();
        res.status(201).json({ message: "Quiz created successfully.", quizId });
    } catch (error) {
        console.error("Error creating quiz:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// DELETE /api/quizzes/:id
app.delete('/api/quizzes/:id', authenticateToken, async (req, res) => {
    const { id } = req.params; 

    try {
        const quiz = await Quiz.findOne({ quizId: id });

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found." });
        }
        const result = await Quiz.deleteOne({ quizId: id });
        if (result.deletedCount === 0) {
            return res.status(500).json({ message: "Failed to delete quiz." }); //Unlikely to happen, but good to check
        }

        res.json({ message: "Quiz deleted successfully." });

    } catch (error) {
        console.error("Error deleting quiz:", error);
        res.status(500).json({ message: "Internal server error.", error: error.message }); //Include error message for debugging
    }
});




// Fetch all quizzes
app.get('/api/quizzes', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// Fetch Quiz by ID
app.get('/api/quizzes/:id', async (req, res) => {
  const { id } = req.params; 

  try {
    const quiz = await Quiz.findOne({ quizId: id });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json(quiz); 
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ message: "Internal server error", error: error.message }); 
  }
});


// Start the Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

