const multer = require('multer');

// Set storage engine
const storage = multer.memoryStorage(); // Store files in memory. You can also use diskStorage for saving to disk.

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/; // Allowed file types
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(file.originalname.toLowerCase());

        if (mimetype && extname) {
            return cb(null, true); // Accept file
        }
        cb(new Error('Error: File type not allowed!')); // Reject file
    }
});

// Export the upload middleware
module.exports = upload;
