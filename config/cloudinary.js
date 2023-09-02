const cloudinary = require("cloudinary").v2;

const connectCloudinary = () => {
    cloudinary.config({
        cloud_name: 'dkc3qcuuk',
        api_key: '571618278649735',
        api_secret: '***************************'
    });
}

module.exports = connectCloudinary;