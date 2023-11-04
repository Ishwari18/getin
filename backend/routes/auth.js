const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const multer = require("multer");


const JWT_SECRET = 'Harryisagoodb$oy';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for uploaded files
    cb(null, "public/"); // Create an "uploads" folder in your project
  },
  filename: function (req, file, cb) {
    // Set the file name for the uploaded file
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// ROUTE 1: Create a User using: POST "/api/auth". No login required
router.post('/', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('number', 'Number is required').notEmpty(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry, a user with this email already exists" })
    }
    // Check whether the user with this number exists already
    user = await User.findOne({ number: req.body.number });
    if (user) {
      return res.status(400).json({ error: "Sorry, a user with this number already exists" })
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
      number: req.body.number,
    });

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);

    res.json({ authtoken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success, error: "User doesn't exist" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route to fetch the user profile (require authentication)
router.get("/user-profile", fetchuser, async (req, res) => {
  try {
    // Fetch the authenticated user's profile
    const user = await User.findById(req.user.id).select("-password"); // Exclude the password field

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to upload a profile picture
router.post("/upload-profile-picture", fetchuser, upload.single("profilePicture"), async (req, res) => {
  try {
    // Assuming you have a user model with the 'profilePicture' field
    const userId = req.user.id; // Get the user's ID from authentication (provided by fetchuser middleware)
    const profilePicturePath = req.file.path; // The path to the uploaded profile picture

    // Update the user's profile picture in the database
    await User.findByIdAndUpdate(userId, { profilePicture: profilePicturePath });

    res.status(200).json({ message: "Profile picture uploaded successfully" });
  } catch (error) {
    console.error(error);

    // Handle the error and send an appropriate error response to the client
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
