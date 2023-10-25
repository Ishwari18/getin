const mongoose = require('mongoose');
const Category = require('./models/Category');
const Subcategory = require('./models/Subcategory');
const Game = require('./models/Game');

mongoose.connect('mongodb://0.0.0.0:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function addSubcategory(name, description) {
  try {
    const subcategory = new Subcategory({
      name,
      description,
    });
    await subcategory.save();
    console.log(`Subcategory "${name}" added successfully.`);
    return subcategory._id;
  } catch (error) {
    console.error(`Error adding subcategory: ${error}`);
    return null;
  }
}

async function addCategoryWithSubcategories(categoryData) {
  try {
    const { categoryName, categoryDescription, subcategoryData } = categoryData;
    let category = await Category.findOne({ name: categoryName });

    if (!category) {
      const subcategoryIds = [];
      for (const subcategory of subcategoryData) {
        const subcategoryId = await addSubcategory(subcategory.name, subcategory.description);
        if (subcategoryId) {
          subcategoryIds.push(subcategoryId);
        }
      }

      category = new Category({
        name: categoryName,
        description: categoryDescription,
        subcategories: subcategoryIds,
      });
      await category.save();
      console.log(`Category "${categoryName}" added successfully with subcategories.`);
    }

    return category._id;
  } catch (error) {
    console.error(`Error adding category with subcategories: ${error}`);
    return null;
  }
}

async function addGameWithCategories(title, description, categoriesData) {
  try {
    const categoryIds = [];
    for (const categoryData of categoriesData) {
      const categoryId = await addCategoryWithSubcategories(categoryData);
      if (categoryId) {
        categoryIds.push(categoryId);
      }
    }

    if (categoryIds.length === 0) {
      console.error(`Unable to add the game "${title}" due to category creation error.`);
      return;
    }

    const game = new Game({
      title,
      description,
      categories: categoryIds,
    });
    await game.save();
    console.log(`Game "${title}" added successfully.`);
  } catch (error) {
    console.error(`Error adding game: ${error}`);
  }
}

// Example usage:
const categoriesData = [
  {
    categoryName: 'Coaching',
    categoryDescription: 'Category for coaching services',
    subcategoryData: [
      { name: 'Coach Elite', description: 'Live coaching with a highest ranked teammate' },
      { name: 'VOD Review', description: 'Learn through live, detailed analysis of your prerecorded games.' },
    ],
  },
  {
    categoryName: 'Compete',
    categoryDescription: 'Category for competitive services',
    subcategoryData: [
      { name: 'Tournaments', description: 'Compete in organized gaming tournaments' },
      { name: 'Ranked Matches', description: 'Play ranked matches with experienced players' },
    ],
  },
];

addGameWithCategories('Valorant', 'valo', categoriesData);
