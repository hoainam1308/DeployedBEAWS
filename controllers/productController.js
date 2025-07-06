const {getAllProducts, createProduct, getProductById, updateProduct, getProductBySlug, getProductByCategory, updatedProductImage, deleteProduct} = require('../services/productServices');
const {getCategoryBySlug} = require('../services/categoryServices');
const { CreateSuccessResponse, CreateErrorResponse } = require('../handlers/responseHandler');
const slugify = require('slugify');
const GetAllProducts = async (req, res) => {
    try {
        const { category, keyword } = req.query;
        const filter = {};

        if (category) filter.category = category;
        if (keyword) filter.productName = { $regex: keyword, $options: "i" };
        const products = await getAllProducts(filter);
        return CreateSuccessResponse(res, 200, products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
};
const CreateProduct = async (req, res) => {
    try {
        const body = req.body;
        if (!body.productName || !body.price || !body.categorySlug) {
            return CreateErrorResponse(res, 400, 'Product name, price, and category are required');
        }
        const category = await getCategoryBySlug(body.categorySlug);
        if (!category) {
            return CreateErrorResponse(res, 404, 'Category not found');
        }
        body.category = category._id; // Set the category ID
        body.images = req.file ? `/uploads/${req.file.filename}` : '';
        const newProduct = await createProduct(body);
        return CreateSuccessResponse(res, 201, newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
};
const GetProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await getProductById(productId);
        if (!product) {
            return CreateErrorResponse(res, 404, 'Product not found');
        }
        return CreateSuccessResponse(res, 200, product);
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
};
const UpdateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { productName, price, category, description } = req.body;
        if (!productName || !price || !category) {
            return CreateErrorResponse(res, 400, 'Product name, price, and category are required');
        }
        const slug = slugify(productName, { lower: true });
        const updatedProduct = await updateProduct(productId, { productName, price, category, description, slug });
        if (!updatedProduct) {
            return CreateErrorResponse(res, 404, 'Product not found');
        }
        return CreateSuccessResponse(res, 200, updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
};

const UpdatedProductImage = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!req.file) {
            return CreateErrorResponse(res, 400, 'Image file is required');
        }
        const imagePath = `/uploads/${req.file.filename}`;
        const updatedProduct = await updatedProductImage(productId, imagePath);
        if (!updatedProduct) {
            return CreateErrorResponse(res, 404, 'Product not found');
        }
        return CreateSuccessResponse(res, 200, updatedProduct);
    } catch (error) {
        console.error("Error updating product image:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
}

const GetProductBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        const product = await getProductBySlug(slug);
        if (!product) {
            return CreateErrorResponse(res, 404, 'Product not found');
        }
        return CreateSuccessResponse(res, 200, product);
    } catch (error) {
        console.error("Error fetching product by slug:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
};
const GetProductByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const products = await getProductByCategory(categoryId);
        if (!products || products.length === 0) {
            return CreateErrorResponse(res, 404, 'No products found for this category');
        }
        return CreateSuccessResponse(res, 200, products);
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
};
const DeleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await deleteProduct(productId);
        if (!deletedProduct) {
            return CreateErrorResponse(res, 404, 'Product not found');
        }
        return CreateSuccessResponse(res, 200, { message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error deleting product:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
};
module.exports = {
    GetAllProducts,
    CreateProduct,
    GetProductById,
    UpdateProduct,
    GetProductBySlug,
    GetProductByCategory,
    UpdatedProductImage,
    DeleteProduct
};