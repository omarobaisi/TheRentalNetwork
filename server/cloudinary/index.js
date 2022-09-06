const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: "disgiza9s",
    api_key: "582359875496263",
    api_secret: "u6ZYHiy_4kpDm6sG935oRBNrD_I"
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'TheRentalNetwork',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

module.exports = {
    cloudinary,
    storage
}