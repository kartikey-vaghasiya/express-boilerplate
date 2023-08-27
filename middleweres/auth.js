const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = (req, res, next) => {
    try {

        // Step 1: Check for token in cokkie or headers or body
        const token = req.headers["authorization"].split(" ")[1]
        if (!token) {
            return res.json({
                "success": false,
                "message": "token not found",
                data: {}
            })
        }

        try {
            // Step 2: Verify Token
            const user = jwt.verify(token, process.env.JWT_SECRET);

            
            // Step 3: Attach User in req
            req.user = user;
            console.log(user)
            
        } catch (error) {
            console.log(error)
            res.json({
                "success": false,
                "message": "error during verifing token",
                data: {}
            })
        }
        
        // Step 4: Next
        next();

    } catch (error) {
        console.log(error)
        res.json({
            "success": false,
            "message": "internal middleware error",
            "data": {}
        })
    }
}

module.exports = auth
