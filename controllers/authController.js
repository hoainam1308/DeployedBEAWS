const userServices = require('../services/userServices');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {CreateSuccessResponse, CreateErrorResponse} = require('../handlers/responseHandler');
const {OAuth2Client} = require('google-auth-library');

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return CreateErrorResponse(res, 400, 'Email and password are required');
        }

        const user = await userServices.getUserByEmail(email);

        if (!user) {
            return CreateErrorResponse(res, 401, 'Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return CreateErrorResponse(res, 401, 'Invalid email or password');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });
        const exp = (new Date(Date.now() + 30 * 60 * 1000)).getTime();
        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(exp),
            signed: true
        });
        return res.status(200).json({ message: 'Login successful', data: user, token });
    } catch (error) {
        console.error("Error during login:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
}

const Register = async (req, res) => {
    try {
        const userData = req.body;
        if (!userData || !userData.email || !userData.password) {
            return CreateErrorResponse(res, 400, 'Email and password are required');
        }
        const existingUser = await userServices.getUserByEmail(userData.email);
        if (existingUser) {
            return CreateErrorResponse(res, 400, 'User already exists with this email');
        }
        const newUser = await userServices.createUser(userData);
        CreateSuccessResponse(res, 201, newUser);
    } catch (error) {
        console.error("Error during registration:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
}

const client_id = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(client_id);

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: client_id, 
    });
    const payload = ticket.getPayload();
    return payload; 
}

const GgoogleLogin = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return CreateErrorResponse(res, 400, 'Google token is required');
    }
    const payload = await verify(token).catch(err => {
        console.error("Google token verification failed:", err);
        return CreateErrorResponse(res, 400, 'Invalid Google token');
    });
    const { email, name } = payload;
    if (!email) {
        return CreateErrorResponse(res, 400, 'Email not found in Google token');
    }
    try {
        let user = await userServices.getUserByEmail(email);
        if (!user) {
            const newUser = await userServices.createUser({
                email,
                name,
                password: bcrypt.hashSync(email + Date.now(), 8) // Temporary password
            });
            user = newUser;
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });
        const exp = (new Date(Date.now() + 30 * 60 * 1000)).getTime();
        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(exp),
            signed: true
        });
        return res.status(200).json({ message: 'Google login successful', data: user, token });
    } catch (error) {
        console.error("Error during Google login:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
}

const Logout = (req, res) => {
    try {
        res.clearCookie('token');
        return CreateSuccessResponse(res, 200, 'Logout successful');
    }
    catch (error) {
        console.error("Error during logout:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
}

module.exports = {
    Login,
    Register,
    GgoogleLogin,
    Logout,
    // Add more auth-related controller functions here as needed
};