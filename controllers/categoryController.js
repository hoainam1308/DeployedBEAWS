const {getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory} = require('../services/categoryServices');
const { CreateSuccessResponse, CreateErrorResponse } = require('../handlers/responseHandler');
const GetAllCategories= async (req, res) => {
    try {
        const categories = await getAllCategories();
        return CreateSuccessResponse(res, 200, categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
};

const CreateCategory = async (req, res) => {
    try {
        if (!req.body.categoryName) {
            return CreateErrorResponse(res, 400, 'Category name is required');
        }
        const newCategory = await createCategory(req.body);
        return CreateSuccessResponse(res, 201, newCategory);
    } catch (error) {
        console.error("Error creating category:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
};
const GetCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryById(categoryId);
        if (!category) {
            return CreateErrorResponse(res, 404, 'Category not found');
        }
        return CreateSuccessResponse(res, 200, category);
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
};
const UpdateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { categoryName, description } = req.body;
        if (!categoryName) {
            return CreateErrorResponse(res, 400, 'Category name is required');
        }
        const updatedCategory = await updateCategory(categoryId, req.body);
        if (!updatedCategory) {
            return CreateErrorResponse(res, 404, 'Category not found');
        }
        return CreateSuccessResponse(res, 200, updatedCategory);
    } catch (error) {
        console.error("Error updating category:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
};
const DeleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const deletedCategory = await deleteCategory(categoryId);
        if (!deletedCategory) {
            return CreateErrorResponse(res, 404, 'Category not found');
        }
        return CreateSuccessResponse(res, 200, { message: 'Category deleted successfully' });
    } catch (error) {
        console.error("Error deleting category:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
};
module.exports = {
    GetAllCategories,
    CreateCategory,
    GetCategoryById,
    UpdateCategory,
    DeleteCategory
};