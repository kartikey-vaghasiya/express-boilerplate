const File = require("../models/File")

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

module.exports = localFileUpload
