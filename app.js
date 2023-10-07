const express = require("express")
const app = express();
const fileupload = require("express-fileupload")
require('dotenv').config();

const connectDB = require("./config/database")
const connectCloudinary = require("./config/cloudinary")

const AuthRouter = require("./routes/auth");
const FileRouter = require("./routes/file")
const Home = require("./routes/home")

const AuthMiddlewere = require("./middleweres/auth")
const cookieParser = require("cookie-parser");
const connectCloudinary = require("./config/cloudinary")


// Use Cookie Parser, Body Parser and FileUpload Feature
app.use(cookieParser());
app.use(express.json());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

// routes
app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/home", AuthMiddlewere, Home);
app.use("/api/v1/file", FileRouter)

// connection with db --> connection with cloudinary --> listning on port 
async function runServer() {
    try {
        await connectDB(process.env.MONGO_URL)
        await connectCloudinary();
    } catch( error ) {
        console.log(error)
    }
    app.listen(process.env.port || 3000, () => {
        console.log(`Listing on port ${process.env.port || 5000}`)
    })
} 

runServer();