const Role = require('../schemas/role');

const getAllRoles = async () => {
    try {
        const roles = await Role.find();
        return roles;
    } catch (error) {
        throw new Error('Error fetching roles.');
    }
}

const createRole = async (roleData) => {
    try {
        const role = new Role(roleData);
        await role.save();
        return role;
    } catch (error) {
        console.error('MongoDB Error:', error.message);
        throw new Error('Error creating role.');
    }
};

const getRoleByName = async (roleName) => {
    try {
        const role = await Role.findOne({ roleName: roleName });
        return role;
    } catch (error) {
        throw new Error('Error fetching role by name.');
    }
};

const getRoleById = async (id) => {
    try {
        const role = await Role.findById(id);
        return role;
    } catch (error) {
        throw new Error('Error fetching role by ID.');
    }
};

module.exports = {
    getAllRoles,
    createRole,
    getRoleByName,
    getRoleById
    // Add more role-related functions here as needed
};