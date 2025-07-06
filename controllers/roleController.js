const {getAllRoles, createRole, getRoleById, getRoleByName} = require('../services/roleServices');
const {CreateErrorResponse, CreateSuccessResponse} = require('../handlers/responseHandler');

const GetAllRoles = async (req, res) => {
    try {
        const roles = await getAllRoles();
        return CreateSuccessResponse(res, 200, roles);
    } catch (error) {
        console.error("Error fetching roles:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
}

const CreateRole = async (req, res) => {
    try {
        const roleData = req.body; // Assuming role data is sent in the request body
        if (!roleData || !roleData.roleName) {
            return res.status(400).json({ message: 'Role name is required' });
        }
        const newRole = await createRole(roleData);
        return CreateSuccessResponse(res, 201, newRole);
    } catch (error) {
        console.error("Error creating role:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
}

module.exports = {
    GetAllRoles, CreateRole
    // Add more role-related controller functions here as needed
};