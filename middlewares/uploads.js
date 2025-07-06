const multer = require('multer');
const { uploadDir } = require('../config/uploadPath');


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null,
        (new Date(Date.now())).getTime() + "-" + file.originalname
    )
});

const upload =  multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }
})

module.exports = upload;
