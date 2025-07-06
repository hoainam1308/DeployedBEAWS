const jwt = require('jsonwebtoken');
const { getUserById } = require('../services/userServices');
const { getRoleById } = require('../services/roleServices');
const { CreateErrorResponse } = require('../handlers/responseHandler');

const authenticate = async (req, res, next) => {
    try {
        let token;
        if (!req.headers || !req.headers.authorization){
            token = req.signedCookies.token;
        } else {
            token = req.header('Authorization').replace('Bearer ', '');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await getUserById(decoded.id);
        if (!user) {
            throw new Error();
        }
        req.user = user;
        next();
    } catch (error) {
        return CreateErrorResponse(res, 401, 'Please authenticate.');
    }
};

const authorize = (roles) => {
    return async (req, res, next) => {
        try {
            const role = await getRoleById(req.user.role); 
            if (!roles.includes(role.roleName)) {
                return CreateErrorResponse(res, 403, 'Access denied: You do not have permission to perform this action.');
            }
            next();
        } catch (error) {
            return CreateErrorResponse(res, 500, 'Internal server error');
        }
    };
};

module.exports = {authenticate, authorize};

