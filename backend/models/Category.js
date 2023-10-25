const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isEighteenPlus: {
    type: Boolean,
    default: false, // Set to false by default
  },
  // Add other fields as needed, such as image, etc.
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
