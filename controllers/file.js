const File = require("../models/File");
const cloudinary = require('cloudinary').v2

const localFileUpload = (req, res) => {

    const file = req.files.file;
    let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`


    file.mv(path, (error) => {
        if (error) {
            return res.json({
                "success": false,
                "message": "error during moving file to server",
                "data": {}
            })
        } else {
            res.json({
                "success": true,
                "message": "File Uploaded Successfully",
                "data": {}
            })
        }
    })
}

async function uploadToCloudinary(file, folder, quality) {
    const options = { folder }
    if (quality) {
        options.quality = quality
    }
    options.resource_type = "auto"

    console.log(options)

   return cloudinary.uploader.upload(file.tempFilePath, options)
}

const cloudinaryUpload = async (req, res) => {
    // getting file from req
    const file = req.files.imageFile
    const {name, tags} = req.body

    // validation
    const typeArray = ['jpeg', 'png', 'jpg']
    if (!typeArray.includes(file.name.split('.')[1])) {
        return res.send({
            "success": false,
            "message": "invalid file type",
            "data": {}
        })
    }


    // uploading to cloudinary
    const result = await uploadToCloudinary(file, "Kartik")

    // creating entry in db
    const fileInDB = await File.create({
        name, url: result.secure_url, tags
    })

    //sending response
    res.json({
        "success": true,
        "message": "file uploaded succesfully",
        "data": fileInDB
    })
}

module.exports = {
    localFileUpload,
    cloudinaryUpload
}
