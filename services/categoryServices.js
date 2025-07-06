const Category = require('../schemas/category');

const getAllCategories = async () => {
    try {
        const categories = await Category.find();
        return categories;
    } catch (error) {
        throw new Error('Error fetching categories.');
    }
}

const createCategory = async (categoryData) => {
    try {
        const category = new Category(categoryData);
        await category.save();
        return category;
    } catch (error) {
        console.error('MongoDB Error:', error.message);
        throw new Error('Error creating category.');
    }
};

const getCategoryById = async (id) => {
    try {
        const category = await Category.findById(id);
        return category;
    } catch (error) {
        throw new Error('Error fetching category by ID.');
    }
}

const getCategoryBySlug = async (slug) => {
    try {
        const category = await Category.findOne({ slug });
        return category;
    } catch (error) {
        throw new Error('Error fetching category by slug.');
    }
}

const updateCategory = async (id, categoryData) => {
    try {
        const category = await Category.findById(id);
        if (!category) {
            throw new Error('Category not found.');
        }
        category.categoryName = categoryData.categoryName || category.categoryName;
        category.description = categoryData.description || category.description;
        await category.save();
        return category;
    } catch (error) {
        throw new Error('Error updating category.');
    }
}

module.exports = {
    getAllCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    getCategoryBySlug
};