function homePage (req, res) {
    res.json({
        "success": true,
        "message": "Welcome to protected Route of Home",
        "data": {}
    })
}

module.exports = homePage;