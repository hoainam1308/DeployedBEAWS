const path = require('path');

// const avatarDir = path.join(__dirname, '../uploads/avatars/');
// const movieTrailerDir = path.join(__dirname, '../uploads/movietrailers/');
// const moviePosterDir = path.join(__dirname, '../uploads/posters/');
const uploadDir = path.join(__dirname, '../uploads/');
const authURL = "http://localhost:3000/auth/avatars/";
// const cdnServerURL = 'http://localhost:4000/upload/avatar/';


module.exports = {
    uploadDir,
    authURL
};