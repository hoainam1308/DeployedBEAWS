const { CreateSuccessResponse, CreateErrorResponse } = require('../handlers/responseHandler');
const {getAllUsers, createUser, updateUserRole, updateUser} = require('../services/userServices');

const GetAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        return CreateSuccessResponse(res, 200, users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
}

const CreateUser = async (req, res) => {
    try {
        const userData = req.body; // Assuming user data is sent in the request body
        if (!userData || !userData.email || !userData.password) {
            return CreateErrorResponse(res, 400, 'Email and password are required');
        }
        const newUser = await createUser(userData);
        return CreateSuccessResponse(res, 201, newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
}

const UpdateUserRole = async (req, res) => {
    try {
        const { email, roleName } = req.body; // Assuming userId and roleName are sent in the request body
        if (!email || !roleName) {
            return CreateErrorResponse(res, 400, 'Email and role name are required');
        }
        const updatedUser = await updateUserRole(email, roleName);
        return CreateSuccessResponse(res, 200, updatedUser);
    } catch (error) {
        console.error("Error updating user role:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }   
}

const UpdateUser = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming user ID is passed as a URL parameter
        const userData = req.body; // Assuming updated user data is sent in the request body
        const updatedUser = await updateUser(userId, userData);
        if (!updatedUser) {
            return CreateErrorResponse(res, 404, 'User not found');
        }
        return CreateSuccessResponse(res, 200, updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
}

module.exports = {
    GetAllUsers, CreateUser, UpdateUserRole, UpdateUser
    // Add more user-related controller functions here as needed
};