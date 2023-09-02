const express = require("express")
const app = express();
const fileupload = require("express-fileupload")
require('dotenv').config();

const connectDB = require("./config/database")

const AuthRouter = require("./routes/auth");
const FileRouter = require("./routes/file")
const Home = require("./routes/home")

const AuthMiddlewere = require("./middleweres/auth")
const cookieParser = require("cookie-parser");
// const connectCloudinary = require("./config/cloudinary")



app.use(cookieParser());
app.use(express.json());
app.use(fileupload())



app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/home", AuthMiddlewere, Home);
app.use("/api/v1/file", FileRouter)


async function runServer() {
    try {
        await connectDB(process.env.MONGO_URL)
        // await connectCloudinary();
    } catch( error ) {
        console.log(error)
    }
    app.listen(process.env.port || 3000, () => {
        console.log(`Listing on port ${process.env.port || 3000}`)
    })
} 

runServer();