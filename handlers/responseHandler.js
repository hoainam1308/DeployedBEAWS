const CreateCookieResponse = (res, key, value, exp) => {
    res.cookie(key, value, {
        httpOnly: true,
        expires: new Date(exp),
        signed: true
    });
}

const CreateSuccessResponse = (res, status, data) => {
    return res.status(status).json({
        success: true,
        data: data
    });
}

const CreateErrorResponse = (res, status, message) => {
    return res.status(status).json({
        success: false,
        message: message
    });
}

module.exports = {
    CreateCookieResponse,
    CreateSuccessResponse,
    CreateErrorResponse
    // Add more response handling functions here as needed
};