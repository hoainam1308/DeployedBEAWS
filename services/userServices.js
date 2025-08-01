const User = require('../schemas/user');
const { getAllRoles, createRole, getRoleById, getRoleByName } = require('../services/roleServices');
const getAllUsers = async () => {
    try {
        const users = await User.find().populate('role', 'roleName');
        return users;
    } catch (error) {
        throw new Error('Lỗi khi lấy danh sách người dùng.');
    }
};

const createUser = async (userData) => {
    try {
        const role = await getRoleByName("USER");
        console.log('Role found:', role); // <--- Thêm dòng này để kiểm tra role
        const user = new User({username : userData.username, email: userData.email, password: userData.password, role: role._id});
        await user.save();
        return user;
    } catch (error) {
        console.error('MongoDB Error:', error.message); // <--- Thêm dòng này
        throw new Error('Lỗi khi tạo người dùng.');
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email : email }).populate('role', 'roleName');
        return user;
    } catch (error) {
        throw new Error('Lỗi khi lấy người dùng theo email.');
    }
};

const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw new Error('Lỗi khi lấy người dùng theo ID.');
    }
};

const updateUserRole = async (email, roleName) => {
    try {
        const role = await getRoleByName(roleName);
        if (!role) {
            throw new Error('Role not found');
        }
        const user = await User.findOneAndUpdate({email : email}, { role: role._id }, { new: true });
        return user;
    } catch (error) {
        throw new Error('Error updating user role.');
    }
};

const updateUser = async (id, userData) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        // Update user fields
        user.username = userData.username || user.username; 
        user.email = userData.email || user.email; 
        if (userData.password) {
            user.password = userData.password; 
        }
        await user.save();
        return user;
    } catch (error) {
        throw new Error('Error updating user.');
    }
};

module.exports = {
    getAllUsers,
    createUser,
    getUserByEmail,
    getUserById,
    updateUserRole,
    updateUser
    // Add more user-related functions here as needed
};