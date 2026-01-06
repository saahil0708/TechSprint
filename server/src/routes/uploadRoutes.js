const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/uploadController');
const multer = require('multer');

// Configure multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.post('/', upload.single('image'), uploadImage);

module.exports = router;
