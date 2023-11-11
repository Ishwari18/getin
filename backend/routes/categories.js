const express = require("express");
const router = express.Router();
const Category = require("../models/Category"); // Import your Category model
const User = require("../models/User");
const fetchuser = require('../middleware/fetchuser');

// Route to get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to add a new category
router.post("/addcategory", async (req, res) => {
  try {
    const { name, description, isEighteenPlus } = req.body;

    // Create a new category
    const newCategory = new Category({ name, description, isEighteenPlus });

    // Save the new category to the database
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error adding a category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to fetch users selling services in a category
router.get("/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const users = await User.find({ sellingCategory: categoryId });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users in the category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put('/add-selling-category', fetchuser, async (req, res) => {
    try {
      const { categoryId } = req.body; // Assuming you pass the category ID in the request body
      const userId = req.user.id; // The user's ID is fetched from the authenticated user
  
      // Find the user by their ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update the user's sellingCategory
      user.sellingCategory = categoryId;
  
      // Save the updated user profile
      await user.save();
  
      res.status(200).json({ message: 'Selling category updated successfully' });
    } catch (error) {
      console.error('Error updating selling category:', error);
      res.status(500).send('Internal Server Error');
    }
  });

// Route to get details of a specific category by its ID
router.get("/category/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error("Error fetching category details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to fetch information about a user selling services in a specific category
router.get("/category/:categoryId/user/:userId", async (req, res) => {
  try {
    const { categoryId, userId } = req.params;

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user is selling services in the specified category
    if (user.sellingCategory.toString() === categoryId) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User does not sell services in this category' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
