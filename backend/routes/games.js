const express = require("express");
const router = express.Router();
const Category = require("../models/Category"); // Import your Category model

// Route to get all categories with subcategories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find()
      .populate("subcategories")
      .exec();

    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
