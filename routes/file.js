const express = require("express")
const router = express.Router();
const {localFileUpload, cloudinaryUpload } = require("../controllers/file")

router.post("/localFileUpload", localFileUpload)
router.post("/cloudinaryUpload", cloudinaryUpload)

module.exports = router